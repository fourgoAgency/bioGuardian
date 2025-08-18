'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Button } from '../ui/button';

export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  whatWeOffer?: string[];
  created_at?: Timestamp | string;
}

interface JobDetailDialogProps {
  job: JobListing | null;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onApply: () => void;
}

export default function JobDetailDialog({ job, open, onClose, onApply }: JobDetailDialogProps) {
  if (!job) return null;

  const formatDate = (date?: Timestamp | string) => {
    if (!date) return 'Recently';
    if (date instanceof Timestamp) return date.toDate().toLocaleDateString();
    return date;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800">{job.title}</DialogTitle>
        </DialogHeader>

        {/* Job Meta */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" color='blue' />
            Posted {formatDate(job.created_at)}
          </span>
          <span className="flex items-center" >
            <MapPin className="w-4 h-4 mr-1"  color='blue'/>
            {job.location}
          </span>
          <span className="flex items-center">
            <Briefcase className="w-4 h-4 mr-1" color='blue' />
            {job.type}
          </span>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-blue-800">Job Description</h3>
          <p className="text-gray-700 mt-2 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-800">Requirements</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {job.responsibilities?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-800">Responsibilities</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              {job.responsibilities.map((res, idx) => (
                <li key={idx}>{res}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What We Offer */}
        {job.whatWeOffer && job.whatWeOffer?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-800">What We Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {job.whatWeOffer.map((offer, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border ${
                    offer.toLowerCase() 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start">
                    <span className={`mr-2 mt-1 text-sm ${
                      offer.toLowerCase()
                        ? 'text-blue-600' 
                        : 'text-blue-600'
                    }`}>
                      ✓
                    </span>
                    <span className={`text-sm ${
                      offer.toLowerCase()
                        ? 'text-blue-800 font-medium' 
                        : 'text-gray-700'
                    }`}>
                      {offer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-6">
          <Button
            onClick={() => {
              onClose(false);
              onApply();
            }}
            className="w-full text-white py-3 rounded-lg transition"
          >
            Apply Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
