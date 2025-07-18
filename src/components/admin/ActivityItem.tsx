const statusColor: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800"
};

export default function ActivityItem({ activity, status, date }: { activity: string; status: string; date: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{activity}</p>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}>{status}</span>
    </div>
  );
}
