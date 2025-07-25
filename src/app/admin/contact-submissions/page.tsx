'use client';

import ContactSubmissionsTable from '@/components/admin/ContactSubmissionsTable';
import { useState } from 'react';

const contactData = [
  {
    id: 'C0001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    subject: 'Product Inquiry: BioGlyph 5000',
    status: 'New',
    date: '2024-07-26',
  },
  {
    id: 'C0002',
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    subject: 'Technical Support: PlantMatrix Diagnostics',
    status: 'In Progress',
    date: '2024-07-27',
  },
  {
    id: 'C0003',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    subject: 'Partnership Opportunity',
    status: 'New',
    date: '2024-07-25',
  },
  {
    id: 'C0004',
    name: 'David Lee',
    email: 'david.lee@example.com',
    subject: 'Feedback on BioPulse Monitor',
    status: 'Resolved',
    date: '2024-07-25',
  },
  // ...add more
];


export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');

  const filteredContacts = contactData.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden justify-center ">
      
      <div className="flex flex-col flex-1 overflow-y-auto">
       
      <h1 className="text-2xl font-semibold mb-6">Contact Inquiries</h1>

      <div className="flex flex-wrap gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
        />

        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        />
      </div>

      {/* <div className="overflow-x-auto mr-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Subject</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Received Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="p-4">{contact.id}</td>
                <td className="p-4">{contact.name}</td>
                <td className="p-4">{contact.email}</td>
                <td className="p-4">{contact.subject}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full text-center ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="p-4">{contact.date}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <ContactSubmissionsTable/>

      {/* Pagination (UI only) */}
      <div className="mt-6 flex justify-between items-center mr-6">
        <p className="text-sm text-gray-500">Showing 1 to 8 of {filteredContacts.length} results</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded bg-gray-200 text-sm">Previous</button>
          <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm">1</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-sm">2</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-sm">Next</button>
        </div>
      </div>
    </div>
    </div>
  );
}
