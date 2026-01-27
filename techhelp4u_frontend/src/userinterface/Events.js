'use client';
import React, { useEffect, useState } from "react";
import { serverURL, getData } from "../services/Fetchnodeservices";
import Footer from "./component/Footer";
import Nav from "./component/Nav";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const result = await getData("userinterface/display_all_event");
            if (result.status) {
                setEvents(result.data);
            }
        } catch (error) {
            console.error("Error in fetchEvents:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden font-sans selection:bg-purple-500/30">
            <Nav />

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
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

            <div className="relative z-10 px-4 py-32 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span className="text-sm font-medium text-purple-300 tracking-wider uppercase">Upcoming Events</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                    >
                        <span className="block text-white">Join Our</span>
                        <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                            Tech Workshops
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Level up your skills with our expert-led sessions on the latest technologies.
                    </motion.p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 justify-center">
                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-400">Loading upcoming events...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Events Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {events.map((item, index) => (
                            <motion.div
                                key={item.workshopid}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500"></div>

                                <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
                                        <img
                                            src={`${serverURL}/images/${item.icon}`}
                                            alt={item.eventname}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs font-medium text-white uppercase tracking-wide">Open</span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                                            {item.eventname}
                                        </h3>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                                <Calendar size={16} className="text-purple-500" />
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                                <Clock size={16} className="text-purple-500" />
                                                <span>{item.time}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-white">
                                                {item.fee ? `₹${item.fee}` : 'Free'}
                                            </span>
                                            <button className="flex items-center gap-2 text-sm font-bold text-white bg-white/5 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all duration-300 group/btn">
                                                Register
                                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && events.length === 0 && (
                    <div className="text-center py-20 mb-32">
                        <div className="inline-block p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-gray-400">No upcoming events found.</p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes particle {
                    0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(100px) scale(0); opacity: 0; }
                }
                .animate-gradient-shift { animation: gradient-shift 5s ease infinite; }
                .animate-particle { animation: particle linear infinite; }
            `}</style>
        </div>
    );
}
