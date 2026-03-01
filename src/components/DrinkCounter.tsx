import { Wine, Plus, Minus } from 'lucide-react';

interface DrinkCounterProps {
  used: number;
  total: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function DrinkCounter({ used, total, onIncrement, onDecrement }: DrinkCounterProps) {
  return (
    <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border-2 border-teal-500/50 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500/20 p-3 rounded-lg">
            <Wine className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-300">Daily Drink Vouchers</div>
            <div className="text-xs text-gray-400">Resets at 5:00 AM</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="text-5xl font-bold text-white mb-1">
            {used} <span className="text-gray-500 text-3xl">/ {total}</span>
          </div>
          <div className="text-sm text-gray-400">Used Today</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDecrement}
            disabled={used === 0}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700 disabled:text-gray-500 text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            onClick={onIncrement}
            disabled={used >= total}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700 disabled:text-gray-500 text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
