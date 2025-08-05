"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// Type for one month of data
type ChartItem = {
  name: string; // Month name
  [productName: string]: number | string;
};
const barColors = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899",
  "#14b8a6", "#f97316", "#22c55e", "#0ea5e9", "#eab308", "#6b7280",
];


export default function OrderVolumeChart() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const monthlyData: { [month: string]: { [product: string]: number } } = {};

      snapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        const createdAt = data.created_at;

        const date =
          createdAt instanceof Timestamp
            ? createdAt.toDate()
            : new Date(createdAt?.seconds ? createdAt.seconds * 1000 : createdAt);


        if (!createdAt || !data.items || !Array.isArray(data.items)) return;
        const month = date.toLocaleString("default", { month: "short" });

        if (!monthlyData[month]) monthlyData[month] = {};

        data.items.forEach((item: {name:string, quantity?: number}) => {
          const productName = item.name;
          const quantity = item.quantity ?? 1;

          if (productName) {
            monthlyData[month][productName] =
              (monthlyData[month][productName] || 0) + quantity;
          }
        });
      });

      const allProductNames = new Set<string>();
      Object.values(monthlyData).forEach((productCounts) => {
        Object.keys(productCounts).forEach((product) =>
          allProductNames.add(product)
        );
      });

      const monthsSorted = Object.keys(monthlyData).sort(
        (a, b) =>
          new Date(`1 ${a} 2025`).getMonth() - new Date(`1 ${b} 2025`).getMonth()
      );

      const formattedData = monthsSorted.map((month) => {
        const entry: ChartItem = { name: month };
        allProductNames.forEach((product) => {
          entry[product] = monthlyData[month][product] || 0;
        });
        return entry;
      });

      setProducts([...allProductNames]);
      setChartData(formattedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Monthly Order Volume</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {products.map((product, index) => (
            <Bar
              key={product}
              dataKey={product}
              fill={barColors[index % barColors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
