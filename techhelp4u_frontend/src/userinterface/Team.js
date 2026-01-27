'use client';
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { serverURL, getData } from "../services/Fetchnodeservices";
import Footer from "./component/Footer"
import Nav from "./component/Nav"

// --- Premium Interaction Helpers ---

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const JoinCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full min-h-[400px]"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-2xl border-2 border-dashed border-purple-500/30 rounded-3xl flex flex-col justify-center items-center p-12 hover:border-purple-500/50 transition-all duration-500"
      >
        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 text-center underline decoration-purple-500/50 decoration-2 underline-offset-8">YOU ARE NEXT?</h3>
        <p className="text-gray-400 text-center text-sm mb-8 max-w-[200px]">We're always looking for geniuses to join our ranks.</p>
        <Magnetic>
          <button className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Join the Squad
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  const fetchTeamMembers = async () => {
    const result = await getData("userinterface/display_all_team");
    if (result.status) {
      setTeam(result.data);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-purple-500/30">
      <Nav />
      {/* Epic Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[150px] animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[150px] animate-float-2"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-violet-600/25 rounded-full blur-[150px] animate-float-3"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-20 max-w-7xl mx-auto">
        {/* Epic Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/30 rounded-full backdrop-blur-xl">
              <div className="relative">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-sm tracking-[0.3em] uppercase">Our Team</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight relative group/title">
            <span className="inline-block text-white relative">Meet The Legends</span>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-purple-600/20 blur-3xl opacity-0 group-hover/title:opacity-100 transition-opacity duration-500 -z-10"></div>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The brilliant minds behind our success
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-purple-500"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-purple-500 to-purple-500"></div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => {
            const imageUrl = member.img_url
              ? `${serverURL}/images/${member.img_url}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.membername)}&background=random&color=fff&size=500`;

            return (
              <div
                key={index}
                className="group relative animate-fade-in-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-black/90 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden group-hover:border-purple-500 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  <div className="relative h-80 overflow-hidden">
                    <img src={imageUrl} alt={member.membername} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  </div>
                  <div className="relative p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300">
                        {member.membername}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-semibold uppercase tracking-wider">{member.memberrole}</span>
                      </div>
                      <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{member.memberdescription}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-[#0A66C2] border border-white/10 rounded-xl transition-all duration-300">
                        <svg className="w-5 h-5 text-[#0A66C2] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                      <a href={member.twitter || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 bg-white/5 hover:bg-black border border-white/10 rounded-xl transition-all duration-300">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <JoinCard />
        </div>

        {/* Empty State */}
        {team.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-gray-900/80 backdrop-blur-2xl border border-purple-500/20 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">No Legends Found</h3>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(30px, -30px) rotate(120deg); } 66% { transform: translate(-20px, 20px) rotate(240deg); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(-40px, 30px) rotate(-120deg); } 66% { transform: translate(30px, -20px) rotate(-240deg); } }
        @keyframes float-3 { 0%, 100% { transform: translate(-50%, 0) rotate(0deg); } 50% { transform: translate(-50%, -50px) rotate(180deg); } }
        @keyframes particle { 0% { transform: translateY(0) scale(0); opacity: 0; } 10% { opacity: 1; transform: scale(1); } 100% { transform: translateY(-100vh) scale(0); opacity: 0; } }
        @keyframes fade-in-scale { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-float-1 { animation: float-1 25s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 30s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 20s ease-in-out infinite; }
        .animate-particle { animation: particle linear infinite; }
        .animate-fade-in-scale { animation: fade-in-scale 0.6s ease-out forwards; opacity: 0; }
      `}</style>
      <Footer />
    </div>
  );
}
