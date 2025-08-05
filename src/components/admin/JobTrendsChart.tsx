"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust path if different

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function JobTrendsChart() {
  const [chartData, setChartData] = useState<{ month: string; applications: number }[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "job_applications"), // Adjust collection name if needed
      (snapshot) => {
        const monthCount: Record<string, number> = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.created_at;

          if (createdAt && typeof createdAt.toDate === "function") {
            const date = createdAt.toDate();
            const month = monthNames[date.getMonth()];
            monthCount[month] = (monthCount[month] || 0) + 1;
          }
        });

        const result = Object.keys(monthCount).map((month) => ({
          month,
          applications: monthCount[month],
        }));

        // Sort by actual month order
        const sorted = result.sort(
          (a, b) =>
            new Date(`1 ${a.month} 2025`).getMonth() -
            new Date(`1 ${b.month} 2025`).getMonth()
        );

        setChartData(sorted);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Job Application Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area dataKey="applications" stroke="#6366f1" fill="#c7d2fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
