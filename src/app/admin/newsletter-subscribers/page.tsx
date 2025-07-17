// src/pages/NewsletterSubscribers.tsx
'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Subscriber {
  id: string;
  email: string;
  created_at?: { toDate: () => Date };
}

const NewsletterSubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newsletter_subscriptions"));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            email: docData.email || "",
            created_at: docData.created_at,
          };
        });
        setSubscribers(data);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Newsletter Subscribers</h2>
      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{sub.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{sub.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {sub.created_at?.toDate
                    ? sub.created_at.toDate().toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterSubscribersPage;
