import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export interface ActivityItem {
  activity: string;
  status: "New" | "Pending" | "Completed";
  date: string;
}

export const getRecentActivities = async (): Promise<ActivityItem[]> => {
  const collections = [
    {
      name: "orders",
      label: "Order",
      getActivity: (doc: any) => `Order #${doc.id} received`,
      status: "New",
    },
    {
      name: "contacts",
      label: "Contact",
      getActivity: () => `New contact message`,
      status: "New",
    },
    {
      name: "subscribers",
      label: "Subscriber",
      getActivity: (doc: any) => `New subscriber: ${doc.email}`,
      status: "New",
    },
    {
      name: "blogs",
      label: "Blog",
      getActivity: (doc: any) => `Blog published: ${doc.title}`,
      status: "Pending",
    },
    {
      name: "jobListings",
      label: "Job",
      getActivity: (doc: any) => `Job posted: ${doc.title}`,
      status: "Pending",
    },
    {
      name: "applications",
      label: "Application",
      getActivity: () => `New job application received`,
      status: "New",
    },
  ];

  const allActivities: ActivityItem[] = [];

  for (const col of collections) {
    const q = query(
      collection(db, col.name),
      orderBy("created_at", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const data = doc.data();
      const date =
        data.created_at?.toDate?.()?.toISOString().split("T")[0] ??
        new Date().toISOString().split("T")[0];

      allActivities.push({
        activity: col.getActivity({ id: doc.id, ...data }),
        status: col.status as ActivityItem["status"],
        date,
      });
    });
  }

  // Sort all combined activities by date descending
  return allActivities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
};
