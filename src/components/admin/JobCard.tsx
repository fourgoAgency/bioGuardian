import { Job, JobStatus } from "@/app/admin/job-listing/page";


const formatDate = (d?: Date) =>
  d
    ? d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "-";
const StatusBadge: React.FC<{ status?: JobStatus }> = ({ status }) => {
  if (!status) return null;
  const colorMap: Record<JobStatus, string> = {
    Active: "bg-green-100 text-green-800",
    "Pending Review": "bg-yellow-100 text-yellow-800",
    Closed: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
        colorMap[status]
      }`}
    >
      {status}
    </span>
  );
};

const JobCard: React.FC<{
  job: Job;
  onView: (job: Job) => void;
}> = ({ job, onView }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          {job.department && (
            <p className="text-sm text-gray-500 mt-1">
              Department: <span className="font-medium">{job.department}</span>
            </p>
          )}
          {job.type && (
            <p className="text-sm text-gray-500">Type: {job.type}</p>
          )}
          {job.location && (
            <p className="text-sm text-gray-500">Location: {job.location}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={job.status} />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        {job.experience && (
          <div>
            <strong>Experience:</strong> {job.experience}
          </div>
        )}
        {job.posted && (
          <div>
            <strong>Posted:</strong> {formatDate(job.posted)}
          </div>
        )}
        {job.deadline && (
          <div>
            <strong>Deadline:</strong> {formatDate(job.deadline)}
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView(job)}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
        >
          View Details
        </button>
        <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 text-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default JobCard;