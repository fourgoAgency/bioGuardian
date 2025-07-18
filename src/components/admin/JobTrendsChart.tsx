import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const jobData = [
  { month: "Jan", applications: 200 },
  { month: "Feb", applications: 250 },
  { month: "Mar", applications: 300 },
  { month: "Apr", applications: 400 },
  { month: "May", applications: 500 },
  { month: "Jun", applications: 600 },
];

export default function JobTrendsChart() {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Job Application Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={jobData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area dataKey="applications" stroke="#6366f1" fill="#c7d2fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
