import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, BookOpen, Target, Lightbulb } from 'lucide-react';
import { trainingPlans, TrainingPlanData } from '../data';

export default function TrainingPlan({ abilityId, onBack }: { abilityId: string, onBack: () => void }) {
  const plan = trainingPlans[abilityId] as TrainingPlanData | undefined;

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center py-12">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl w-full space-y-8"
      >
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回报告
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{plan.title}</h1>
            <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-3xl">
              {plan.overview}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Core Concept */}
            <div className="flex items-start gap-4 bg-amber-50 p-6 rounded-2xl border border-amber-100 text-amber-900">
              <Lightbulb className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
              <p className="text-lg font-medium leading-relaxed">{plan.coreConcept}</p>
            </div>

            {/* Steps Section */}
            <div className="space-y-10">
              <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">核心训练步骤</h2>
              {plan.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-0"
                >
                  <div className="hidden md:flex absolute -left-12 top-1 items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                    <span className="md:hidden mr-2 text-indigo-600">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 text-lg">{step.content}</p>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-indigo-500" />
                      具体行动清单 (Action Items)
                    </h4>
                    <ul className="space-y-3">
                      {step.actionItems.map((item, i) => (
                        <li key={i} className="flex items-start text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommended Books */}
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
                延伸阅读推荐
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plan.recommendedBooks.map((book, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 font-medium flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3" />
                    {book}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
