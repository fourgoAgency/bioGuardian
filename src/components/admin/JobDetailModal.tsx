import React, { useState } from 'react';
import { Application, statusColor } from './JobApplicationsTable'; 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Timestamp } from 'firebase/firestore';
import { X, Download, Clipboard } from 'lucide-react';

interface Props {
  application: Application;
  open: boolean;
  onClose: () => void;
  onStatusUpdated?: (newStatus: string) => void; // callback to parent to invalidate/refetch if needed
}

const formatDate = (created_at: Timestamp | undefined) => {
  if (created_at?.seconds) {
    return new Date(created_at.seconds * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return 'N/A';
};

const statuses = [
  'Pending Review',
  'Shortlisted',
  'Interview Scheduled',
  'Rejected',
  'Hired',
];

const updateApplicationStatus = async (id: string, status: string) => {
  const ref = doc(db, 'job_applications', id);
  await updateDoc(ref, { application_status: status });
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // optionally show a toast
  } catch {}
};

const JobApplicationDetailModal: React.FC<Props> = ({
  application,
  open,
  onClose,
  onStatusUpdated,
}) => {
  const [localStatus, setLocalStatus] = useState(application.application_status || 'Pending Review');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    setSaving(true);
    setError(null);
    try {
      await updateApplicationStatus(application.id, newStatus);
      onStatusUpdated?.(newStatus);
    } catch (err) {
      console.error(err);
      setError('Failed to save status.');
      // revert if needed
      setLocalStatus(application.application_status || 'Pending Review');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 p-4"
      aria-label="Application detail modal"
    >
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">{application.name || 'N/A'}</h2>
            <p className="text-sm text-gray-500">Applied for: {application.position || 'N/A'}</p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and applied date */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <span className={statusColor(localStatus)}>{localStatus}</span>
              </div>
              <div>
                <select
                  aria-label="Change status"
                  value={localStatus}
                  onChange={handleStatusChange}
                  disabled={saving}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {saving && <span className="ml-2 text-xs text-gray-500">Saving...</span>}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Applied on: <span className="font-medium">{formatDate(application.created_at)}</span>
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Email</h3>
              <div className="flex items-center gap-2">
                <span className="break-all">{application.email || 'N/A'}</span>
                {application.email && (
                  <button
                    onClick={() => copyToClipboard(application.email)}
                    className="p-1 rounded hover:bg-gray-100"
                    aria-label="Copy email"
                  >
                    <Clipboard size={14} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Phone</h3>
              <div className="flex items-center gap-2">
                <span>{application.phone || 'N/A'}</span>
                {application.phone && (
                  <button
                    onClick={() => copyToClipboard(application.phone)}
                    className="p-1 rounded hover:bg-gray-100"
                    aria-label="Copy phone"
                  >
                    <Clipboard size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Education / Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-1">Education</h3>
              <p className="text-sm whitespace-pre-line">{application.education || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Experience</h3>
              <p className="text-sm whitespace-pre-line">{application.experience || 'N/A'}</p>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Cover Letter</h3>
            <div className="bg-gray-50 border rounded p-3 text-sm whitespace-pre-line">
              {application.cover_letter || 'N/A'}
            </div>
          </div>

          {/* Resume */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Resume</h3>
              {application.resume_url ? (
                <div className="flex items-center gap-3">
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-600 flex items-center gap-1"
                  >
                    <Download size={16} /> View / Download
                  </a>
                </div>
              ) : (
                <span className="text-sm text-gray-500">No resume provided.</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <div>Application ID: <code className="bg-gray-100 px-1 rounded">{application.id}</code></div>
            </div>
          </div>

          {/* Actions area could go here (e.g., send email, schedule interview) */}
        </div>

        <div className="flex justify-end border-t p-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDetailModal;
