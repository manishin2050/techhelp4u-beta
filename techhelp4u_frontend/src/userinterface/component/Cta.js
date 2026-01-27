'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

export default function Cta() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (<section ref={ref} className="relative py-20 px-4 overflow-hidden bg-[#0b0f1a]">



    {/* Gradient overlay */}
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r 
  from-purple-950/20 
  via-purple-950/10 
  to-cyan-800/10" />






    {/* 🔥 OUTSIDE GLOW DESIGN */}







    <div className="max-w-4xl mx-auto relative z-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}

        className="
    p-12 md:p-16
    rounded-3xl
    text-center
    border border-purple-700
    bg-[#120e1e]
    shadow-[0_20px_25px_0_rgba(168,35,247,0.5)]
  "
      >

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Ready to{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Join TechHelp4U
          </span>
          ?
        </h2>

        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with thousands of tech professionals, get expert guidance,
          and grow your skills in a supportive community.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <a href="/contact">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 text-base rounded-full flex items-center gap-2">
              Start Your Journey Today
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
        </motion.div>
      </motion.div>

    </div>
  </section>
  );
}
