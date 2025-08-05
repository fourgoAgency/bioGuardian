import { Job } from "@/app/admin/job-listing/page";
import { Dialog } from "@headlessui/react";

const JobDetailsModal: React.FC<{
  job: Job | null;
  open: boolean;
  onClose: () => void;
}> = ({ job, open, onClose }) => {
  if (!job) return null;
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative z-10 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
              {job.type && <div>Type: {job.type}</div>}
              {job.location && <div>Location: {job.location}</div>}
              {job.experience && <div>Experience: {job.experience}</div>}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>
        <div className="mt-6 space-y-6 text-sm">
          {job.description && (
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p>{job.description}</p>
            </div>
          )}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Requirements</h3>
              <ul className="list-disc list-inside space-y-1">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50 text-sm"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            Publish / Action
          </button>
        </div>
      </div>
    </Dialog>
  );
};
export default JobDetailsModal;