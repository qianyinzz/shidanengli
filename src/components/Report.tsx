import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { abilities } from '../data';

export default function Report({ scores, onSelectAbility }: { scores: Record<string, number>, onSelectAbility: (id: string) => void }) {
  const data = abilities.map(a => ({
    subject: a.name,
    A: scores[a.id] || 0,
    fullMark: 10,
    id: a.id
  }));

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const avgScore = totalScore / abilities.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">你的全息能力图谱</h1>
          <p className="text-slate-500">综合得分: {totalScore} / 100 (平均 {avgScore.toFixed(1)})</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar name="能力值" dataKey="A" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">维度解析 (点击查看提升方案)</h3>
            <div className="grid grid-cols-2 gap-3">
              {abilities.map(a => (
                <motion.button
                  key={a.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectAbility(a.id)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
                >
                  <span className="font-medium text-slate-700">{a.name}</span>
                  <span className="text-indigo-600 font-bold">{scores[a.id] || 0}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
