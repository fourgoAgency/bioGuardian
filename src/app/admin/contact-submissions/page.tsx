'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Submission {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
  created_at?: { seconds: number };
}

const ContactSubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const q = query(collection(db, "contact_submissions"), orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Submission[];
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching contact submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Form Submissions</h1>
      {loading ? (
        <div className="text-gray-600">Loading submissions...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead className="bg-gray-100 border-b text-xs uppercase">
              <tr>
                <th className="px-6 py-3 border-r">Full Name</th>
                <th className="px-6 py-3 border-r">Phone</th>
                <th className="px-6 py-3 border-r">Email</th>
                <th className="px-6 py-3 border-r">Subject</th>
                <th className="px-6 py-3 border-r">Message</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 border-r">{sub.full_name}</td>
                  <td className="px-6 py-4 border-r">{sub.phone}</td>
                  <td className="px-6 py-4 border-r">{sub.email || "—"}</td>
                  <td className="px-6 py-4 border-r">{sub.subject}</td>
                  <td className="px-6 py-4 border-r">{sub.message}</td>
                  <td className="px-6 py-4">
                    {sub.created_at?.seconds
                      ? new Date(sub.created_at.seconds * 1000).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissionsPage;
