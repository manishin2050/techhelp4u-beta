'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { serverURL, getData } from '../services/Fetchnodeservices';
import Nav from './component/Nav';
import Footer from './component/Footer';
// 3. Upcoming Event Promotion Section
const UpcomingEventsPromo = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden flex items-center justify-center min-h-screen">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1 rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-300 font-mono text-sm tracking-widest mb-6"
                        >
                            UPCOMING • 2026
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8"
                        >
                            GLOBAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI SUMMIT</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed"
                        >
                            The biggest gathering of neural network architects and creative coders. Define the future of intelligence with us.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                        >
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                                Get Tickets
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                                View Schedule
                            </button>
                        </motion.div>
                    </div>

                    {/* Holographic Ticket Visual */}
                    <div className="flex-1 w-full max-w-md perspective-1000">
                        <TiltCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

// 4. Team CTA Section
const TeamCta = () => {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent"></div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Architects</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
                >
                    Behind every line of code and every successful event is a team of passionate innovators driven by curiosity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link to="/team">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Our Team
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

const TiltCard = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    return (
        <motion.div
            style={{ x, y, rotateX, rotateY, z: 100 }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.18}
            whileHover={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
            className="w-full aspect-[3/4] rounded-3xl bg-neutral-900 border border-white/10 relative overflow-hidden group shadow-[0_0_50px_rgba(168,85,247,0.4)]"
        >
            {/* Card Content */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10"></div>

            {/* Holographic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className="absolute bottom-0 inset-x-0 p-8 z-30">
                <div className="flex justify-between items-end border-b border-white/30 pb-4 mb-4">
                    <div>
                        <p className="text-sm text-purple-300 font-mono mb-1">DATE</p>
                        <p className="text-2xl font-bold text-white">OCT 24</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-purple-300 font-mono mb-1">LOCATION</p>
                        <p className="text-xl font-bold text-white">SAN FRANCISCO</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border border-black flex items-center justify-center text-[10px] text-white">
                                {i}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400">+2.4k joined</p>
                </div>
            </div>

            {/* Tech Decoration */}
            <div className="absolute top-4 right-4 z-30">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
            </div>
        </motion.div>
    )
}


// --- COMPONENTS ---

// 3. Immersive Horizontal Story Section
const ImmersiveStory = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    const events = [
        {
            year: "2020",
            title: "The Genesis",
            desc: "A spark in the dark. Three laptops, one garage, and a refusal to accept the status quo.",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            year: "2021",
            title: "First Contact",
            desc: "Breaking barriers. We secured our first enterprise partnership and never looked back.",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
        },
        {
            year: "2022",
            title: "Global Pulse",
            desc: "Expanding the network. Remote hubs established in key tech capitals worldwide.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        },
        {
            year: "2023",
            title: "AI Awakening",
            desc: "The pivot. Integrating neural networks into the core of our digital existence.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
        },
        {
            year: "2024",
            title: "Community Core",
            desc: "50,000 strong. Empowering the next generation of digital architects.",
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        },
        {
            year: "Beyond",
            title: "The Horizon",
            desc: "The future isn't written. It's coded. And we are the authors.",
            image: "https://images.unsplash.com/photo-1614728835591-bf144313f8f9?q=80&w=2075&auto=format&fit=crop"
        },
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 opacity-50 blur-3xl"></div>
                </div>

                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20 relative z-10">
                    {/* Intro Title Card */}
                    <div className="flex flex-col justify-center min-w-[50vw]">
                        <h2 className="text-8xl md:text-[12rem] font-black text-white leading-none tracking-tighter">
                            OUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">SAGA</span>
                        </h2>
                        <p className="text-2xl text-gray-400 mt-8 max-w-lg">Swipe to explore our journey through time and space.</p>
                    </div>

                    {events.map((event, index) => {
                        return <StoryCard key={index} event={event} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const StoryCard = ({ event }) => {
    return (
        <div className="group relative h-[70vh] w-[40vw] min-w-[400px] overflow-hidden bg-neutral-900 rounded-[3rem] border border-white/10 transition-all duration-500 hover:border-purple-500/50">
            <div
                style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 p-10 flex flex-col justify-end">
                <h3 className="text-9xl font-black text-white/10 absolute top-4 right-8">{event.year}</h3>

                <div className="relative z-20 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h4 className="text-4xl font-bold text-white mb-4 shadow-black drop-shadow-lg">{event.title}</h4>
                    <p className="text-xl text-gray-200 leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {event.desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

// 2. Reveal Text for "Who We Are"
const RevealText = () => {
    return (
        <section className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Video or Abstract animation */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover animate-pulse-slow" alt="cyberpunk" />
            </div>

            <div className="relative z-20 max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-7xl md:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-8 leading-none mix-blend-difference"
                >
                    WHO WE ARE
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-2xl md:text-4xl text-gray-300 font-light leading-relaxed"
                >
                    We are the <span className="font-bold text-white">glitch</span> in the matrix. The <span className="text-pink-500">spark</span> in the circuit. We don't just follow trends; we set the code that defines them.
                </motion.p>
            </div>
        </section>
    )
}

// 3. Events Parallax Section (Static Images from Public Folder)
const EventsSection = () => {
    // Static data with images from public folder
    const events = [
        { id: 1, title: "Hack The Future", icon: "/event1.jpg" },
        { id: 2, title: "Code Night", icon: "/event2.jpg" },
        { id: 3, title: "Tech Summit", icon: "/techhelp4U.jpg" },
        { id: 4, title: "Speaker Session", icon: "/speaker.jpg" },
        { id: 5, title: "Bootcamp", icon: "/s.jpg" },
    ];

    // Positions for chaos grid
    const positions = [
        { top: "0%", left: "5%", rotate: "-6deg" },
        { top: "20%", right: "5%", rotate: "6deg" },
        { top: "50%", left: "15%", rotate: "-3deg" },
        { bottom: "5%", right: "20%", rotate: "4deg" },
        { bottom: "10%", left: "10%", rotate: "-5deg" },
    ];

    return (
        <section className="py-32 bg-[#09090b] relative overflow-hidden min-h-[1000px]">

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-white/20 pb-8">
                    <h2 className="text-6xl md:text-9xl font-black text-white">
                        WE DO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">EVENTS.</span>
                    </h2>
                    <p className="text-gray-400 max-w-md text-right mt-8 md:mt-0">
                        From hackathons to tech summits, we bring the community together in electrifying ways.
                    </p>
                </div>

                {/* Chaos Grid events */}
                <div className="relative h-[800px] w-full">
                    {events.map((event, index) => {
                        const pos = positions[index % positions.length];
                        return (
                            <EventCard
                                key={event.id}
                                img={event.icon}
                                title={event.title}
                                top={pos.top}
                                left={pos.left}
                                right={pos.right}
                                bottom={pos.bottom}
                                rotate={pos.rotate}
                                delay={index * 0.2}
                            />
                        );
                    })}

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h3 className="text-[12rem] font-bold text-white/5 select-none">JOIN US</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

const EventCard = ({ img, title, top, left, right, bottom, rotate, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.6, delay: delay, type: "spring" }}
            style={{ top, left, right, bottom }}
            className="absolute w-64 h-80 md:w-80 md:h-96 bg-gray-800 rounded-2xl overflow-hidden border-4 border-white transform shadow-2xl cursor-pointer"
        >
            <img src={img} alt={title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h4 className="text-xl md:text-2xl font-bold text-white line-clamp-2">{title}</h4>
            </div>
        </motion.div>
    )
}

export default function AboutUs() {
    return (
        <div className="bg-black text-white font-sans overflow-x-hidden">
            <Nav />
            {/* 1. Hero */}
            <section className="h-screen flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black animate-pulse"></div>
                <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, type: "spring" }}
                    className="text-center z-10 mix-blend-lighten"
                >
                    <h1 className="text-9xl font-black tracking-tighter text-white">
                        WE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">CREATE</span> <br />
                        IMPACT
                    </h1>
                </motion.div>
            </section>

            {/* 2. Who We Are */}
            <RevealText />

            {/* 3. Upcoming Event Promotion */}
            <UpcomingEventsPromo />

            {/* 4. Events */}
            <EventsSection />

            {/* 5. Team CTA */}
            <TeamCta />

            <Footer />
        </div>
    );
}
