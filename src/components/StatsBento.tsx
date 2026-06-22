import { motion, Variants } from 'framer-motion';
import { Target, FileEdit, Clock } from 'lucide-react';

interface StatsBentoProps {
  categoriesCount: number;
  rewritesCount: number;
  responseTime: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

export function StatsBento({ categoriesCount, rewritesCount, responseTime }: StatsBentoProps) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
    >
      {/* Bento Box 1 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
         <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[50px] group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
         <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-6 text-blue-500 shadow-sm border border-blue-100 dark:border-blue-500/20">
           <Target className="w-7 h-7" />
         </div>
         <div className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">{categoriesCount}</div>
         <div className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">Scored categories</div>
      </motion.div>

      {/* Bento Box 2 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
         <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[50px] group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
         <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl mb-6 text-emerald-500 shadow-sm border border-emerald-100 dark:border-emerald-500/20">
           <FileEdit className="w-7 h-7" />
         </div>
         <div className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">{rewritesCount}</div>
         <div className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">Bullets rewritten</div>
      </motion.div>

      {/* Bento Box 3 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
         <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[50px] group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
         <div className="p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl mb-6 text-purple-500 shadow-sm border border-purple-100 dark:border-purple-500/20">
           <Clock className="w-7 h-7" />
         </div>
         <div className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:scale-105 transition-transform">{responseTime}</div>
         <div className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">Average response</div>
      </motion.div>
    </motion.div>
  );
}
