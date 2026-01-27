'use client';
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';


import { getData, serverURL } from '../../services/Fetchnodeservices';

export default function Teams() {
  const [member, setMember] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const result = await getData("userinterface/display_all_team");
      if (result.status && result.data.length > 0) {
        setMember(result.data[0]);
      }
    };
    fetchTeamMembers();
  }, []);

  if (!member) return null;

  const imageUrl = member.img_url
    ? `${serverURL}/images/${member.img_url}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.membername)}`;

  return (
    <section
      id="teams"
      ref={ref}
      className="relative py-12 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 order-2 lg:order-1"
          >
            {/* Minimal Accent */}
            <div className="w-12 h-1 bg-purple-600 mb-4"></div>

            <h4 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase mb-3">
              The Founder
            </h4>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
              {member.membername}
            </h2>

            <p className="text-lg text-purple-400 font-medium mb-4">
              {member.memberrole}
            </p>

            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-lg">
              {member.memberdescription}
            </p>

            <div className="flex items-center gap-6">
              <Link to="/our-team">
                <button className="group flex items-center gap-2 text-white font-semibold tracking-wide hover:text-purple-400 transition-colors text-sm">
                  <span className="border-b border-white/30 pb-0.5 group-hover:border-purple-400 transition-colors">
                    Explore more
                  </span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FaLinkedinIn size={20} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[3/4] md:aspect-square lg:aspect-square overflow-hidden bg-gray-900 max-w-md mx-auto lg:ml-auto">
              <img
                src={imageUrl}
                alt={member.membername}
                className="w-full h-full object-cover object-top"
              />

              {/* Cinematic Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent lg:hidden"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
