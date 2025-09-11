// src/components/career/JobCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Timestamp } from "firebase/firestore";

interface JobListing {
  id: string;
  title: string;
  company?: string;
  location?: string;
  type?: string;
  experience?: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  whatWeOffer?: string[];
  created_at?: Timestamp | undefined;
}

interface JobCardProps {
  job: JobListing;
  onReadClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onReadClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{job.title || "Untitled Job"}</h3>
              <p className="text-sm text-muted-foreground">
                {job.company ? `${job.company} • ` : ""}{job.location || "Location not specified"}
              </p>
            </div>
            {job.type && (
              <div className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {job.type}
              </div>
            )}
          </div>

          {job.description && (
            <p className="mt-2 text-sm line-clamp-3">{job.description}</p>
          )}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {job.created_at ? `Posted ${formatRelativeDate(job.created_at)}` : ""}
            </div>
            <Button size="sm" onClick={onReadClick}>
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function formatRelativeDate(dateInput : Timestamp | undefined) {
  let d: Date;

  if (!dateInput) return "";

  if (typeof dateInput?.toDate === "function") {
    // Firestore Timestamp
    d = dateInput.toDate();
  } else if (typeof dateInput === "string") {
    d = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    d = dateInput;
  } else if (dateInput?.seconds) {
    // Firestore object with seconds
    d = new Date(dateInput.seconds * 1000);
  } else {
    return "";
  }

  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}


export default JobCard;
