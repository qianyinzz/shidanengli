import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, Zap, Users, Lightbulb, Crown, Shield, TrendingUp, HeartHandshake, MessageCircle, X } from 'lucide-react';
import { abilities } from '../data';

const icons = [Brain, Target, Zap, Users, Lightbulb, Crown, Shield, TrendingUp, HeartHandshake, MessageCircle];

// 预设的有效兑换码 (可以后续扩展为后端验证)
const VALID_CODES = ['AI2026', 'START2026', 'TESTCODE'];

export default function Home({ onStart }: { onStart: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 初始化时检查本地缓存的解锁状态
  useEffect(() => {
    const unlocked = localStorage.getItem('isUnlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  const handleStartClick = () => {
    if (isUnlocked) {
      onStart();
    } else {
      setShowModal(true);
    }
  };

  const handleVerifyCode = () => {
    const trimmedCode = code.trim().toUpperCase();
    if (VALID_CODES.includes(trimmedCode)) {
      localStorage.setItem('isUnlocked', 'true');
      setIsUnlocked(true);
      setShowModal(false);
      onStart();
    } else {
      setError('无效的兑换码，请重试');
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-10"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            十大核心能力全息测评
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            全面解析你的底层能力模型，获取专属提升方案
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-4">
          {abilities.map((ability, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={ability.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all"
              >
                <Icon className="w-8 h-8 text-indigo-500 mb-3" />
                <span className="font-medium text-slate-700">{ability.name}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
        >
          开始全息自测 (约3分钟)
        </motion.button>
      </motion.div>

      {/* 兑换码弹窗 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-6">
                <Crown className="w-12 h-12 text-indigo-500 mx-auto justify-center mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">解锁专属测评</h2>
                <p className="text-slate-600">请输入您的兑换码以开始本次深度能力诊断</p>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(''); // 清除错误提示
                    }}
                    placeholder="请输入兑换码"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-center uppercase tracking-wider text-slate-700"
                    onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyCode}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition-colors"
                >
                  验证并开始测评
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
