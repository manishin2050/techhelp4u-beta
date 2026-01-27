'use client';
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { postData } from "../services/Fetchnodeservices";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Swal from "sweetalert2";
import { Send, Phone, Mail, User, MessageSquare, Instagram, Twitter } from "lucide-react";

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

const FormInput = ({ label, icon: Icon, value, onChange, type = "text", placeholder, multiline = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group/input mb-6">
            <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${isFocused || value ? "-top-2.5 text-xs text-purple-400 font-bold bg-[#0a0a0a] px-2 z-10" : "top-4 text-gray-500 text-sm"}`}>
                {label}
            </label>
            <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border transition-all duration-300 ${isFocused ? "border-purple-500 ring-2 ring-purple-500/20" : "border-white/10 group-hover/input:border-white/20"}`}>
                <Icon size={18} className={`${isFocused ? "text-purple-400" : "text-gray-500"}`} />
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        rows={4}
                        className="w-full bg-transparent border-none outline-none text-white text-sm resize-none"
                        placeholder={isFocused ? placeholder : ""}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent border-none outline-none text-white text-sm"
                        placeholder={isFocused ? placeholder : ""}
                    />
                )}
            </div>
        </div>
    );
};

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !message) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all details before sending.",
                background: "#121212",
                color: "#fff",
                confirmButtonColor: "#a855f7"
            });
            return;
        }

        setLoading(true);
        const body = { name, email, phone, message };
        try {
            const response = await postData("contactus/submit_contact", body);
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "We'll get back to you legendary soon.",
                    background: "#121212",
                    color: "#fff",
                    confirmButtonColor: "#a855f7"
                });
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again.",
                background: "#121212",
                color: "#fff",
                confirmButtonColor: "#a855f7"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-purple-500/30">
            <Nav />

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 flex flex-col lg:flex-row items-center gap-20">
                {/* Text Side */}
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-xs tracking-widest uppercase"
                    >
                        Contact the Future
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
                    >
                        LET'S <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">CONNECT</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-md"
                    >
                        Whether you have questions, ideas, or just want to say hi, we're here to spark your mind.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-6 pt-8"
                    >
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                <Mail className="text-purple-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Us</p>
                                <p className="text-white font-medium">hello@techhelp4u.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                <Phone className="text-purple-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Call Us</p>
                                <p className="text-white font-medium">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                <Instagram className="text-purple-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Follow Us</p>
                                <p className="text-white font-medium">@techhelp4u</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                <Twitter className="text-purple-400" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Latest Updates</p>
                                <p className="text-white font-medium">@techhelp4u_off</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 w-full max-w-xl"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative p-10 bg-gradient-to-br from-[#0a0a0a] to-black border border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
                            <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <FormInput
                                    label="Full Name"
                                    icon={User}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                                <FormInput
                                    label="Email Address"
                                    icon={Mail}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                />
                                <FormInput
                                    label="Phone Number"
                                    icon={Phone}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Your mobile number"
                                />
                                <FormInput
                                    label="How can we help?"
                                    icon={MessageSquare}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    multiline
                                    placeholder="Type your message here..."
                                />

                                <div className="pt-4">
                                    <Magnetic>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={20} />
                                                </>
                                            )}
                                        </button>
                                    </Magnetic>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
