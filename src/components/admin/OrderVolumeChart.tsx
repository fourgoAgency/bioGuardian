import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", Pharmaceuticals: 400, Equipment: 300, Services: 200 },
  { name: "Feb", Pharmaceuticals: 500, Equipment: 250, Services: 180 },
  { name: "Mar", Pharmaceuticals: 450, Equipment: 320, Services: 210 },
  { name: "Apr", Pharmaceuticals: 600, Equipment: 340, Services: 260 },
  { name: "May", Pharmaceuticals: 580, Equipment: 310, Services: 220 },
  { name: "Jun", Pharmaceuticals: 620, Equipment: 400, Services: 300 },
];

export default function OrderVolumeChart() {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Monthly Order Volume</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Slizcole" fill="#3b82f6" />
          <Bar dataKey="Equipmen" fill="#10b981" />
          <Bar dataKey="Services" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
