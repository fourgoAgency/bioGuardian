'use client';
import React, { useEffect, useState } from "react";
import CareerHero from "@/components/career/CareerHero";
import JobCard from "@/components/career/JobCard";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ApplicationData } from "@/components/career/ApplicationForm";
import ApplicationForm from "@/components/career/ApplicationForm";

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
  const [uploadProgress, setUploadProgress] = useState<number>(0); // ✅ New state

  const [applicationData, setApplicationData] = useState<ApplicationData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    coverLetter: '',
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


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
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return alert('Please upload your CV.');

    setIsSubmitting(true);

    try {
      const fileRef = ref(storage, `resumes/${applicationData.name.replace(/\s+/g, '-')}-${Date.now()}`);
      const snap = await uploadBytes(fileRef, cvFile);
      const resume_url = await getDownloadURL(snap.ref);

      await addDoc(collection(db, 'job_applications'), {
        ...applicationData,
        resume_url,
        created_at: serverTimestamp(),
      });

      alert('Application submitted!');
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        coverLetter: '',
      });
      setCvFile(null);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
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
              showApplicationForm={!!applicationData.position}
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
