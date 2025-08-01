"use client";

import OverviewCard from "@/components/admin/OverviewCard";
import OrderVolumeChart from "@/components/admin/OrderVolumeChart";
import JobTrendsChart from "@/components/admin/JobTrendsChart";
import ActivityItem from "@/components/admin/ActivityItem";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  Mail,
  FileText,
  Briefcase,
  Clipboard,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className=" sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Admin Dashboard
        </h1>
        <Button className="w-full sm:w-fit" variant="default">
          View Report &gt;
        </Button>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Orders"
          Icon={ShoppingCart}
          value="2,567"
          timeframe="Past 30 days"
        />
        <OverviewCard
          title="Total Contacts"
          Icon={Mail}
          value="852"
          timeframe="This month"
        />
        <OverviewCard
          title="Total Subscribers"
          Icon={User}
          value="1,204"
          timeframe="This month"
        />
        <OverviewCard
          title="Total Blogs"
          Icon={FileText}
          value="128"
          timeframe="All time"
        />
        <OverviewCard
          title="Total Job Listings"
          Icon={Briefcase}
          value="24"
          timeframe="Active now"
        />
        <OverviewCard
          title="Total Applications"
          Icon={Clipboard}
          value="349"
          timeframe="Under review"
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
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Activities
        </h2>
        <div className="space-y-3">
          <ActivityItem
            activity="Order #BG2023-012 received"
            status="New"
            date="2025-07-12"
          />
          <ActivityItem
            activity="Question about drug efficacy"
            status="New"
            date="2025-07-12"
          />
          <ActivityItem
            activity="Article draft for 'Innovations in Vaccine'"
            status="Pending"
            date="2025-07-13"
          />
          <ActivityItem
            activity="Order #BG2023-009 shipped"
            status="Completed"
            date="2025-07-14"
          />
          <ActivityItem
            activity="New subscriber: biolead@email.com"
            status="New"
            date="2025-07-15"
          />
        </div>
      </div>
    </main>
  );
}
