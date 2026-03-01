import { useState, useEffect } from 'react';
import { Settings, RefreshCw, Calendar, Anchor } from 'lucide-react';
import { TierName, ChecklistState, Benefit } from './types';
import { TIERS } from './tiers';
import { loadTier, saveTier, loadChecklist, saveChecklist, loadLastReset, saveLastReset, shouldAutoResetDaily } from './storage';
import { ProgressRing } from './components/ProgressRing';
import { DrinkCounter } from './components/DrinkCounter';
import { SettingsModal } from './components/SettingsModal';
import { BenefitItem } from './components/BenefitItem';

function App() {
  const [currentTier, setCurrentTier] = useState<TierName>(loadTier());
  const [checklist, setChecklist] = useState<ChecklistState>(loadChecklist());
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (shouldAutoResetDaily()) {
      handleDailyReset();
    }
  }, []);

  useEffect(() => {
    saveChecklist(checklist);
  }, [checklist]);

  const currentTierData = TIERS[currentTier];
  const dailyDrinkBenefit = currentTierData.benefits.find(b => b.type === 'daily' && b.id.includes('drinks'));
  const perSailingBenefits = currentTierData.benefits.filter(b => b.type === 'per-sailing');

  const completedPerSailing = perSailingBenefits.filter(b => checklist[b.id] === true).length;
  const totalPerSailing = perSailingBenefits.length;

  const handleTierChange = (newTier: TierName) => {
    setCurrentTier(newTier);
    saveTier(newTier);
    setChecklist({});
    saveChecklist({});
  };

  const handleToggleBenefit = (benefitId: string) => {
    setChecklist(prev => ({
      ...prev,
      [benefitId]: !prev[benefitId],
    }));
  };

  const handleDrinkIncrement = (benefitId: string, max: number) => {
    setChecklist(prev => {
      const current = (prev[benefitId] as number) || 0;
      if (current >= max) return prev;
      return { ...prev, [benefitId]: current + 1 };
    });
  };

  const handleDrinkDecrement = (benefitId: string) => {
    setChecklist(prev => {
      const current = (prev[benefitId] as number) || 0;
      if (current <= 0) return prev;
      return { ...prev, [benefitId]: current - 1 };
    });
  };

  const handleNewCruise = () => {
    if (confirm('Reset all per-sailing benefits for a new cruise?')) {
      const newState: ChecklistState = {};
      if (dailyDrinkBenefit) {
        newState[dailyDrinkBenefit.id] = checklist[dailyDrinkBenefit.id] || 0;
      }
      setChecklist(newState);
      saveChecklist(newState);
    }
  };

  const handleDailyReset = () => {
    if (dailyDrinkBenefit) {
      setChecklist(prev => ({
        ...prev,
        [dailyDrinkBenefit.id]: 0,
      }));
      saveLastReset(new Date());
    }
  };

  const handleManualDailyReset = () => {
    if (confirm('Manually reset daily drink vouchers?')) {
      handleDailyReset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
              <Anchor className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Seas the Perks</h1>
              <p className="text-sm text-teal-400">{currentTierData.displayName} Tier</p>
            </div>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors border border-gray-700"
          >
            <Settings className="w-6 h-6" />
          </button>
        </header>

        <ProgressRing completed={completedPerSailing} total={totalPerSailing} />

        <div className="space-y-6">
          {dailyDrinkBenefit && (
            <div>
              <DrinkCounter
                used={(checklist[dailyDrinkBenefit.id] as number) || 0}
                total={dailyDrinkBenefit.quantity || 0}
                onIncrement={() => handleDrinkIncrement(dailyDrinkBenefit.id, dailyDrinkBenefit.quantity || 0)}
                onDecrement={() => handleDrinkDecrement(dailyDrinkBenefit.id)}
              />
              <button
                onClick={handleManualDailyReset}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-700 mb-6"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Reset Daily Drinks</span>
              </button>
            </div>
          )}

          {totalPerSailing > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  Per Sailing Benefits
                </h2>
              </div>

              <div className="space-y-2 mb-4">
                {perSailingBenefits.map((benefit: Benefit) => (
                  <BenefitItem
                    key={benefit.id}
                    label={benefit.label}
                    checked={!!checklist[benefit.id]}
                    onToggle={() => handleToggleBenefit(benefit.id)}
                  />
                ))}
              </div>

              <button
                onClick={handleNewCruise}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg font-semibold"
              >
                <RefreshCw className="w-5 h-5" />
                New Cruise - Reset All
              </button>
            </div>
          )}
        </div>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTier={currentTier}
        onTierChange={handleTierChange}
      />
    </div>
  );
}

export default App;
