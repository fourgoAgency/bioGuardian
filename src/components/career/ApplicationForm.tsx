
import React from 'react';
import { Send } from 'lucide-react';

interface JobListing {
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  whatWeOffer?: string[];
}

export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  coverLetter: string;
}

interface ApplicationFormProps {
  applicationData: ApplicationData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  showApplicationForm: boolean;
  jobListings: JobListing[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
  onInputChange,
  onSubmit,
  isSubmitting,
  showApplicationForm,
  jobListings,
  onFileChange,
}) => {
  return (
    <div id="application-form" className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Send className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Apply Now</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={applicationData.name}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={applicationData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={applicationData.phone}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Position Applied For *
          </label>
          <select
            id="position"
            name="position"
            required
            value={applicationData.position}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a position</option>
            {jobListings.map((job, index) => (
              <option key={index} value={job.title}>{job.title}</option>
            ))}
          </select>


        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <select
            id="experience"
            name="experience"
            required
            value={applicationData.experience}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
            Education *
          </label>
          <input
            type="text"
            id="education"
            name="education"
            required
            value={applicationData.education}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Bachelor's in Pharmacy"
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
            Resume/CV
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={onFileChange}
            className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX, JPG, or PNG file. Max 5MB.</p>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            required
            rows={4}
            value={applicationData.coverLetter}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why you're interested in this position..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Application</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
