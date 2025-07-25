'use client'

import React from 'react'
import NewsletterSubscribersTable from '@/components/admin/NewsletterSubscribersTable'

export default function NewsletterSubscribersPage() {
  return (
    <div className="flex h-screen">
      

      <div className="flex flex-col flex-1">
        

        <main className="p-6 bg-gray-50 overflow-auto">
          <h1 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h1>

          {/* Overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Subscribers', value: 1250, change: '+10%' },
              { label: 'New Subscribers (30d)', value: 45, change: '+5%' },
              { label: 'Unsubscribed (30d)', value: 8, change: '-2%' },
              { label: 'Active Subscribers', value: 1197, change: '+98%' },
            ].map((card, i) => (
              <div key={i} className="bg-white p-4 shadow rounded-lg">
                <div className="text-sm text-gray-500">{card.label}</div>
                <div className="text-xl font-bold">{card.value}</div>
                <div className="text-xs text-green-600">{card.change} this month</div>
              </div>
            ))}
          </div>

          {/* Search + Filters + Bulk Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by email..."
              className="px-4 py-2 border rounded w-full md:w-auto"
            />

            <select className="px-3 py-2 border rounded text-sm">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Unsubscribed</option>
            </select>

            <div className="space-x-2">
              <button className="px-3 py-2 bg-blue-600 text-white rounded">Apply Filters</button>
              <button className="px-3 py-2 border rounded">Reset Filters</button>
              <button className="px-3 py-2 border rounded">Bulk Actions</button>
            </div>
          </div>

          {/* Subscriber Table */}
          <NewsletterSubscribersTable/>
          {/* <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-100 text-left text-sm">
                <tr>
                  <th className="p-3">Email</th>
                  <th className="p-3">Subscription Date</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {[
                  {
                    email: 'john.doe@example.com',
                    date: '2023-06-15',
                    source: 'Website',
                    status: 'Active',
                  },
                  {
                    email: 'peter.jones@example.com',
                    date: '2023-08-01',
                    source: 'Event Signup',
                    status: 'Unsubscribed',
                  },
                  {
                    email: 'grace.wilson@example.com',
                    date: '2023-09-01',
                    source: 'Event Signup',
                    status: 'Active',
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">{row.email}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.source}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Active'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button className="text-sm text-red-600 hover:underline">Unsubscribe</button>
                      <button className="text-sm text-gray-600 hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <p className="text-gray-600">Page 1 of 2</p>
            <div className="space-x-2">
              <button className="px-3 py-1 border rounded">Previous</button>
              <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
