"use client";

import { useEffect, useState } from "react";
import OverviewCard from "@/components/admin/OverviewCard";
import OrderVolumeChart from "@/components/admin/OrderVolumeChart";
import JobTrendsChart from "@/components/admin/JobTrendsChart";
import {
  ShoppingCart,
  User,
  Mail,
  FileText,
  Briefcase,
  Clipboard,
} from "lucide-react";
import {
  getRecentActivities,
  ActivityItem as Activity,
} from "@/lib/RecentActivities";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import RecentActivities from "@/components/admin/RecentActivity";
import ViewReportButton from "@/components/admin/ViewReports";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activities, setActivities] = useState<Activity[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const [counts, setCounts] = useState({
    orders: 0,
    contacts: 0,
    subscribers: 0,
    blogs: 0,
    jobListings: 0,
    applications: 0,
  });

  useEffect(() => {
    const unsubscribers = [
      onSnapshot(collection(db, "orders"), (snap) =>
        setCounts((prev) => ({ ...prev, orders: snap.size }))
      ),
      onSnapshot(collection(db, "contact_submissions"), (snap) =>
        setCounts((prev) => ({ ...prev, contacts: snap.size }))
      ),
      onSnapshot(collection(db, "newsletter_subscriptions"), (snap) =>
        setCounts((prev) => ({ ...prev, subscribers: snap.size }))
      ),
      onSnapshot(collection(db, "posts"), (snap) =>
        setCounts((prev) => ({ ...prev, blogs: snap.size }))
      ),
      onSnapshot(collection(db, "jobs"), (snap) =>
        setCounts((prev) => ({ ...prev, jobListings: snap.size }))
      ),
      onSnapshot(collection(db, "job_applications"), (snap) =>
        setCounts((prev) => ({ ...prev, applications: snap.size }))
      ),
    ];

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getRecentActivities();
      setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  return (
    <main className=" sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Admin Dashboard
        </h1>
        <ViewReportButton />
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Orders Received"
          Icon={ShoppingCart}
          value={counts.orders.toLocaleString()}
          timeframe="Past 30 days"
          link='/admin/orders'
        />
        <OverviewCard
          title="Total Contact Forms Submissions"
          Icon={Mail}
          value={counts.contacts.toLocaleString()}
          timeframe="This month"
          link='/admin/contact-submissions'
        />
        <OverviewCard
          title="Total Subscribers List"
          Icon={User}
          value={counts.subscribers.toLocaleString()}
          timeframe="This month"
          link='/admin/newsletter-subscribers'
        />
        <OverviewCard
          title="Total Blogs Management"
          Icon={FileText}
          value={counts.blogs.toLocaleString()}
          timeframe="All time"
          link= "/admin/blogs"
        />
        <OverviewCard
          title="Total Job Vacancies Management"
          Icon={Briefcase}
          value={counts.jobListings.toLocaleString()}
          timeframe="Active now"
          link= "/admin/job-listing"
        />
        <OverviewCard
          title="Total Job Applications"
          Icon={Clipboard}
          value={counts.applications.toLocaleString()}
          timeframe="Under review"
          link= "/admin/job-applications"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow w-full overflow-auto">
          <OrderVolumeChart />
        </div>
        <div className="bg-white p-4 rounded-xl shadow w-full overflow-auto">
          <JobTrendsChart />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-xl p-4 w-full">
        <RecentActivities />
      </div>
    </main>
  );
}
