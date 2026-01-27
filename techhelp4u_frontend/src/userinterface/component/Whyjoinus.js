'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

export  default function WhyJoinUs() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const reasons = [
    'Access to industry experts and mentors',
    'Collaborative project opportunities',
    'Cutting-edge tech resources',
    'Career advancement support',
    'Exclusive networking events',
    'Hands-on learning experiences',
  ];

  return (
   <section ref={ref} className="relative py-20 px-4 bg-[#000]">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Why Join <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">TechHelp4U</span>?
        </h2>
        <p className="text-gray-400 mb-8">
          Be part of a thriving community where innovation meets collaboration. Get support from experts and grow your tech skills.
        </p>
      </motion.div>

      {/* Right boxes */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        {reasons.map((reason, i) => (
<motion.div
  key={i}
  initial={{ opacity: 0, y: 10 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
  transition={{ delay: i * 0.1 }}
  whileHover={{ scale: 1.03 }}
  className="
    group flex flex-row items-center gap-9
    py-3 px-5 rounded-3xl

    bg-[#120e1e]
    border border-white/20

    cursor-pointer
    transition-all duration-300

    hover:border-purple-500
    hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]

    shadow-[0_10px_20px_rgba(0,0,0,0.4)]
  "
>
  <CheckCircle2
    size={22}
    className="text-cyan-400 flex-shrink-0 group-hover:text-purple-400 transition-colors"
  />

  <span className="text-base text-white group-hover:text-purple-400 transition-colors">
    {reason}
  </span>
</motion.div>


))}

      </motion.div>
    </div>
  </div>
</section>

  );
}
