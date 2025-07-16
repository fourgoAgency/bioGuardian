// src/pages/JobApplications.tsx
'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface JobApplication {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  education?: string;
  experience?: string;
  position?: string;
  cover_letter?: string;
  resume_url?: string;
  created_at?: any;
}

const JobApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "job_applications"));
        const data: JobApplication[] = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            created_at: d.created_at || null
          };
        });
        setApplications(data);
      } catch (err) {
        console.error("Error fetching job applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const formatDate = (created_at: any) => {
    if (created_at && created_at.seconds) {
      return new Date(created_at.seconds * 1000).toLocaleString();
    }
    return "N/A";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Applications</h2>
      {loading ? (
        <p>Loading job applications...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Education</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Position</th>
              <th style={thStyle}>Cover Letter</th>
              <th style={thStyle}>Resume</th>
              <th style={thStyle}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td style={tdStyle}>{app.id}</td>
                <td style={tdStyle}>{String(app.name || "N/A")}</td>
                <td style={tdStyle}>{String(app.email || "N/A")}</td>
                <td style={tdStyle}>{String(app.phone || "N/A")}</td>
                <td style={tdStyle}>{String(app.education || "N/A")}</td>
                <td style={tdStyle}>{String(app.experience || "N/A")}</td>
                <td style={tdStyle}>{String(app.position || "N/A")}</td>
                <td style={tdStyle}>{String(app.cover_letter || "N/A")}</td>
                <td style={tdStyle}>
                  {app.resume_url ? (
                    <a href={String(app.resume_url)} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td style={tdStyle}>{formatDate(app.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { border: "1px solid #ccc", padding: "8px", background: "#f9f9f9" };
const tdStyle = { border: "1px solid #ccc", padding: "8px" };

export default JobApplicationsPage;
