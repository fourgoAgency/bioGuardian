'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AddJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    experience: '0-1 years',
    type: 'Full-Time',
    status: true,
    description: '',
    requirements: '',
    responsibilities: '',
    deadline: '',
    created_at: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'jobs'), {
        title: formData.title,
        location: formData.location,
        experience: formData.experience,
        type: formData.type,
        status: formData.status,
        description: formData.description,
        deadline: formData.deadline,
        created_at: formData.created_at,
        requirements: formData.requirements.split('\n').filter(Boolean),
        responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      });

      alert('Job added successfully!');
      router.push('/admin/job-listing');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Job Opening</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="e.g., Senior Software Engineer"
              value={formData.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
            <input
              name="location"
              placeholder="e.g., Lahore, Pakistan"
              value={formData.location}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="0-1 years">0–1 years</option>
              <option value="1-3 years">1–3 years</option>
              <option value="3-5 years">3–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="font-medium">Job Type:</label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value="Full-Time"
                  checked={formData.type === 'Full-Time'}
                  onChange={handleChange}
                />
                Full-Time
              </label>
              <label className="flex items-center gap-1 ml-4">
                <input
                  type="radio"
                  name="type"
                  value="Part-Time"
                  checked={formData.type === 'Part-Time'}
                  onChange={handleChange}
                />
                Part-Time
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-medium">Status:</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  className="sr-only peer"
                  checked={formData.status}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
              <span>{formData.status ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        </div>

        {/* Description & Lists */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Description & Timeline</h2>
          <textarea
            name="description"
            placeholder="Enter detailed job responsibilities, qualifications, and benefits here."
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-gray-300 rounded p-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <textarea
              name="requirements"
              placeholder="Enter each requirement on a new line"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded p-2"
            />
            <textarea
              name="responsibilities"
              placeholder="Enter each responsibility on a new line"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium mb-2">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-gray-300 rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
}
