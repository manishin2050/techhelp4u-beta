'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import './Designcss.css';

export default function Testimonial() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      content: 'TechHelp4U transformed my career. The mentorship and community support is unparalleled.',
      rating: 5,
    },
    {
      name: 'Alex Rodriguez',
      role: 'AI Engineer',
      content: 'The collaborative environment helped me solve complex problems I couldn\'t tackle alone.',
      rating: 5,
    },
    {
      name: 'Jordan Kim',
      role: 'DevOps Specialist',
      content: 'Best decision I made. The expertise shared here is truly world-class.',
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="relative py-20 px-4 bg-[#000]">
      {/* Gradient overlay */}
      

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
        >
          Community <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Testimonials</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.2 }}
              className="
                group glassmorphism p-8 rounded-3xl
    border-1 border-white/20
    bg-[#120e1e]
    transition-all duration-300 cursor-pointer

    hover:border-purple-500
    hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]

shadow-[2px_2px_12px_rgba(168,35,247,0.5)]

  "
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">{testimonial.content}</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
