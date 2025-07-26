'use client';
// src/pages/Career.tsx

import React, { useEffect, useState } from "react";
import CareerHero from "@/components/career/CareerHero";
import JobCard from "@/components/career/JobCard";
import ApplicationForm from "@/components/career/ApplicationForm";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

// Types
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

const CareerPage: React.FC = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    coverLetter: "",
  });

  // Fetch jobs from Firestore
  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData: JobListing[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // DEBUG LOG: check field presence
        console.log("Fetched job data:", data);

        // Validate required fields exist
        if (
          data.title &&
          data.location &&
          data.type &&
          data.experience &&
          data.description &&
          Array.isArray(data.requirements) &&
          Array.isArray(data.responsibilities)
        ) {
          jobsData.push({
            id: doc.id,
            title: data.title,
            location: data.location,
            type: data.type,
            experience: data.experience,
            description: data.description,
            requirements: data.requirements,
            responsibilities: data.responsibilities,
          });
        } else {
          console.warn("Invalid job data format:", data);
        }
      });

      setJobListings(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
}, []);


  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  // Submit application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resumeUrl = "";

      if (resumeFile) {
        const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
        const snapshot = await uploadBytes(storageRef, resumeFile);
        resumeUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "job_applications"), {
        ...applicationData,
        resume_url: resumeUrl,
        created_at: Timestamp.now(),
      });

       // Redirect to Gmail compose with pre-filled email
      const subject = encodeURIComponent("Job Application: " + applicationData.position);
      const body = encodeURIComponent(
        `Name: ${applicationData.name}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}\nPosition: ${applicationData.position}\nExperience: ${applicationData.experience}\nEducation: ${applicationData.education}\nCover Letter:\n${applicationData.coverLetter}`
      );
      const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr@bioguardian.net&su=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      setApplicationData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        education: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setShowApplicationForm(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <CareerHero />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {jobListings.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApplyClick={() => {
                setApplicationData((prev) => ({
                  ...prev,
                  position: job.title,
                }));
                setShowApplicationForm(true);
              }}
            />
          ))}
        </div>

        {showApplicationForm && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Apply Now</h2>
            <ApplicationForm
              applicationData={applicationData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              showApplicationForm={showApplicationForm}
              jobListings={jobListings}
              onFileChange={handleFileChange}
            />
          </section>
        )}
      </main>


    </div>
  );
};

export default CareerPage;
