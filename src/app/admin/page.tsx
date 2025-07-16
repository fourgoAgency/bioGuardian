import React from "react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/orders"
          className="block p-6 bg-white rounded-lg shadow hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Orders</h2>
          <p className="text-gray-600">Manage customer orders and view order details.</p>
        </Link>
        <Link
          href="/admin/contact-submissions"
          className="block p-6 bg-white rounded-lg shadow hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Contact Submissions</h2>
          <p className="text-gray-600">View messages sent through the contact form.</p>
        </Link>
        <Link
          href="/admin/job-applications"
          className="block p-6 bg-white rounded-lg shadow hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Job Applications</h2>
          <p className="text-gray-600">Manage applications submitted for job openings.</p>
        </Link>
        <Link
          href="/admin/newsletter-subscribers"
          className="block p-6 bg-white rounded-lg shadow hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Newsletter Subscribers</h2>
          <p className="text-gray-600">Manage subscribers to the newsletter list.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
