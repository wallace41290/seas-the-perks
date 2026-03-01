interface ProgressRingProps {
  completed: number;
  total: number;
}

export function ProgressRing({ completed, total }: ProgressRingProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <svg width="180" height="180" className="transform -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="rgba(20, 184, 166, 0.2)"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#14b8a6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-teal-400">
            {completed}
          </div>
          <div className="text-sm text-gray-400">of {total}</div>
          <div className="text-xs text-gray-500 mt-1">Benefits Used</div>
        </div>
      </div>
    </div>
  );
}
