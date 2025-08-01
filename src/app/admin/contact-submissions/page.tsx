'use client';

import { useState, useEffect, useMemo } from 'react';
import ContactSubmissionsTable from '@/components/admin/ContactSubmissionsTable';
import useDebounce from '@/hooks/useDebounce'; 

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(''); // could be expanded to { from: '', to: '' } for ranges
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search to avoid over-updating
  const debouncedSearch = useDebounce(search, 300);

  // Handler to reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, status, date]);

  // Callback props to receive metadata from the table
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Derived display text
  const resultSummary = useMemo(() => {
    const start = (currentPage - 1) * 8 + 1;
    const end = Math.min(currentPage * 8, totalResults);
    if (totalResults === 0) return 'No results found';
    return `Showing ${start} to ${end} of ${totalResults} result${totalResults > 1 ? 's' : ''}`;
  }, [currentPage, totalResults]);

  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
    setDate('');
  };

  return (
    <div className="flex h-full w-full overflow-hidden justify-center bg-slate-50 p-4">
      <div className="flex flex-col flex-1 overflow-y-auto max-w-[1200px] w-full">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold">Contact Inquiries</h1>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search by name or keyword
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search contacts"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex-shrink-0">
            <label htmlFor="status" className="sr-only">
              Filter by status
            </label>
            <select
              id="status"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">Filter by Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex-shrink-0">
            <label htmlFor="date" className="sr-only">
              Filter by date
            </label>
            <input
              id="date"
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Filter by date"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <ContactSubmissionsTable
            filters={{ search: debouncedSearch, status, date, page: currentPage }}
            onMetaChange={({ totalCount, loading }) => {
              setTotalResults(totalCount);
              setIsLoading(loading);
            }}
          />
        </div>

        {/* Pagination & summary */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-gray-600">{isLoading ? 'Loading...' : resultSummary}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
              className={`px-3 py-1 rounded-md text-sm border ${
                currentPage === 1 || isLoading
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>

            {/* Simple numeric pagination; could be enhanced to show ranges */}
            <button
              type="button"
              aria-current={currentPage === 1 ? 'page' : undefined}
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isLoading}
            >
              1
            </button>

            <button
              type="button"
              aria-current={currentPage === 2 ? 'page' : undefined}
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === 2
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isLoading}
            >
              2
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={isLoading || (totalResults > 0 && currentPage * 8 >= totalResults)}
              className={`px-3 py-1 rounded-md text-sm border ${
                isLoading || (totalResults > 0 && currentPage * 8 >= totalResults)
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
