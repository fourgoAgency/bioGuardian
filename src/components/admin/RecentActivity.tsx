"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import ActivityItem from "./ActivityItem";

interface ActivityEntry {
  type: string;
  message: string;
  created_at: Date;
}

const COLLECTIONS_TO_FETCH = [
  "orders",
  "posts",
  "jobs",
  "job_applications",
  "contact_submissions",
  "newsletter_subscriptions",
];

// You can change mapping for better status UI
const collectionStatusMap: Record<string, string> = {
  orders: "Completed",
  posts: "New",
  jobs: "New",
  job_applications: "Pending",
  contact_submissions: "Pending",
  newsletter_subscriptions: "New",
};

export default function RecentActivities() {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCollections = async () => {
      const allActivities: ActivityEntry[] = [];

      for (const col of COLLECTIONS_TO_FETCH) {
        try {
          const snapshot = await getDocs(collection(db, col));
          snapshot.forEach((doc) => {
            const data = doc.data();
            const createdAt: Timestamp = data.created_at;
            if (!createdAt?.toDate) return;

            const name =
              data.name || data.customer_name || data.email || data.title || "Unknown";

            allActivities.push({
              type: col,
              message: `${name} in ${col}`,
              created_at: createdAt.toDate(),
            });
          });
        } catch (error) {
          console.warn(`Error fetching ${col}:`, error);
        }
      }

      const sorted = allActivities.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime()
      );

      setActivities(sorted.slice(0, 10));
      setLoading(false);
    };

    fetchAllCollections();
  }, []);

  if (loading) return <p>Loading recent activities...</p>;
  if (activities.length === 0) return <p>No recent activities found.</p>;

  return (
    <div className="bg-white shadow rounded-xl p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      {activities.map((item, index) => (
        <ActivityItem
          key={index}
          activity={item.message}
          status={collectionStatusMap[item.type] || "New"}
          date={item.created_at.toLocaleDateString()}
        />
      ))}
    </div>
  );
}
