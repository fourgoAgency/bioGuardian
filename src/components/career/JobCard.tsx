// src/components/career/JobCard.tsx
import React from "react";
import { MapPin, Clock, Briefcase } from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

interface JobCardProps {
  job: JobListing;
  onApplyClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 hover:shadow-lg transition-all duration-200">
      <h3 className="text-xl font-semibold mb-2 text-blue-700">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.description}</p>

      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.experience}</span>
        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
      </div>

      <button
        onClick={onApplyClick}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
