import React from 'react';

interface DateRangePickerProps {
  onDateChange?: (start: Date | null, end: Date | null) => void;
}

export default function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  React.useEffect(() => {
    if (onDateChange) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      onDateChange(start, end);
    }
  }, [startDate, endDate, onDateChange]);

  return (
    <div className="flex gap-4 mb-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">Start Date</p>
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">End Date</p>
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}
