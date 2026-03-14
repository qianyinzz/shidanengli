import { useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';

export default function Assessment({ onComplete }: { onComplete: (scores: Record<string, number>) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const question = questions[currentIndex];

  const handleSelect = (score: number) => {
    const newScores = { ...scores, [question.abilityId]: score };
    setScores(newScores);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newScores);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between text-sm font-medium text-slate-500">
          <span>进度 {currentIndex + 1} / {questions.length}</span>
          <div className="flex-1 mx-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option.score)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-slate-700 font-medium"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
