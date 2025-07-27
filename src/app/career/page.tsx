'use client';
import React, { useEffect, useState } from "react";
import CareerHero from "@/components/career/CareerHero";
import JobCard from "@/components/career/JobCard";
import ApplicationForm from "@/components/career/ApplicationForm";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

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
  const [uploadProgress, setUploadProgress] = useState<number>(0); // ✅ New state
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

  // ✅ Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData: JobListing[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.title &&
            data.location &&
            data.type &&
            data.experience &&
            data.description &&
            Array.isArray(data.requirements) &&
            Array.isArray(data.responsibilities)
          ) {
            jobsData.push({ id: doc.id, ...data } as JobListing);
          }
        });
        setJobListings(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setApplicationData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("📂 Selected File:", file);
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData.name || !applicationData.email) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let resumeUrl = "";

      // ✅ Upload file with progress
      if (resumeFile) {
        const fileRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, resumeFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress); // ✅ Show progress
            },
            (error) => reject(error),
            () => resolve()
          );
        });

        resumeUrl = await getDownloadURL(fileRef);
      }

      // ✅ Save application to Firestore
      await addDoc(collection(db, "job_applications"), {
        ...applicationData,
        resume_url: resumeUrl,
        created_at: Timestamp.now(),
      });

      // ✅ Send Email via API route
      await fetch("/api/send-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...applicationData, resumeUrl }),
      });

      alert("✅ Application submitted successfully!");
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
      setUploadProgress(0);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("❌ Failed to submit application.");
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
                setApplicationData((prev) => ({ ...prev, position: job.title }));
                setShowApplicationForm(true);
              }}
            />
          ))}
        </div>

        {showApplicationForm && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Apply Now</h2>

            {/* ✅ Upload Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

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
