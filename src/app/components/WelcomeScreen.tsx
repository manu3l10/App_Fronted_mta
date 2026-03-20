import { motion } from "motion/react";
import { Plane, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const setHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background - Static for extreme performance on mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pointer-events-none z-0" />

      {/* Glow effects - CSS Only */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.1),transparent_50%)] z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(0,163,255,0.1),transparent_50%)] z-0" />

      {/* Earth - Simplified for mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isMobile ? 0.3 : 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/6 md:top-1/4 right-0 md:right-1/4 w-40 h-40 md:w-64 md:h-64 z-0"
      >
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 blur-2xl md:blur-3xl animate-pulse" />
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
        >
          {/* AI Avatar - Static glow */}
          <div className="relative mx-auto mb-8 w-24 h-24 md:w-32 md:h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 rounded-full animate-pulse shadow-2xl shadow-blue-500/50" />
            <div className="absolute inset-1 bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white leading-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Travel Assistance</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-2 font-medium">
            {t('welcome.subtitle')}
          </p>

          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-xs mx-auto leading-relaxed">
            {t('welcome.description')}
          </p>

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            {t('welcome.start')}
          </button>
        </motion.div>

        {/* Features - Simplified List */}
        <div className="mt-12 flex flex-col gap-3 text-[11px] md:text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span>{t('welcome.feature1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-cyan-500" />
            <span>{t('welcome.feature2')}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
