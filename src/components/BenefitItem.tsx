import { Check } from 'lucide-react';

interface BenefitItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function BenefitItem({ label, checked, onToggle }: BenefitItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all group"
    >
      <div
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          checked
            ? 'bg-teal-500 border-teal-500'
            : 'border-gray-600 group-hover:border-gray-500'
        }`}
      >
        {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
      <span
        className={`flex-1 text-left transition-all ${
          checked ? 'text-gray-400 line-through' : 'text-gray-200'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
