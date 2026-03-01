import { X, Crown } from 'lucide-react';
import { TierName } from '../types';
import { TIERS } from '../tiers';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: TierName;
  onTierChange: (tier: TierName) => void;
}

const tierColors: Record<TierName, string> = {
  gold: 'from-yellow-600 to-yellow-700',
  platinum: 'from-gray-300 to-gray-400',
  emerald: 'from-emerald-500 to-emerald-600',
  diamond: 'from-cyan-400 to-blue-500',
  'diamond-plus': 'from-blue-500 to-purple-600',
  pinnacle: 'from-purple-600 to-pink-600',
};

export function SettingsModal({ isOpen, onClose, currentTier, onTierChange }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/20 p-2 rounded-lg">
              <Crown className="w-6 h-6 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Loyalty Tier</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-3">
          {Object.values(TIERS).map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                onTierChange(tier.id);
                onClose();
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                currentTier === tier.id
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tierColors[tier.id]} flex items-center justify-center`}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{tier.displayName}</div>
                    <div className="text-sm text-gray-400">{tier.benefits.length} benefits</div>
                  </div>
                </div>
                {currentTier === tier.id && (
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
