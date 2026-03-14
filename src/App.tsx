/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Home from './components/Home';
import Assessment from './components/Assessment';
import Report from './components/Report';
import TrainingPlan from './components/TrainingPlan';

type Step = 'home' | 'assessment' | 'report' | 'training';

export default function App() {
  const [step, setStep] = useState<Step>('home');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);

  const handleStart = () => setStep('assessment');
  
  const handleComplete = (finalScores: Record<string, number>) => {
    setScores(finalScores);
    setStep('report');
  };

  const handleSelectAbility = (id: string) => {
    setSelectedAbility(id);
    setStep('training');
  };

  const handleBackToReport = () => {
    setSelectedAbility(null);
    setStep('report');
  };

  return (
    <div className="font-sans text-slate-900 overflow-x-hidden">
      {step === 'home' && <Home onStart={handleStart} />}
      {step === 'assessment' && <Assessment onComplete={handleComplete} />}
      {step === 'report' && <Report scores={scores} onSelectAbility={handleSelectAbility} />}
      {step === 'training' && selectedAbility && (
        <TrainingPlan abilityId={selectedAbility} onBack={handleBackToReport} />
      )}
    </div>
  );
}

