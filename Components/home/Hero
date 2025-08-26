
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
    <motion.div
        animate={{
            y: [-10, 10, -10],
            rotate: [-1, 1, -1],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

const Hero = () => {
    const [showLogo, setShowLogo] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
    const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <motion.div 
                    className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDMvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LDEzMCwyNDYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgICAgPC9wYXR0ZXJuPgogICAgPC9kZWZzPgogICAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <div className="container mx-auto px-6 text-center z-10 relative">
                <motion.div
                    style={{ rotateX, rotateY, transformPerspective: 1000 }}
                    className="space-y-8"
                >
                    <FloatingElement delay={0}>
                        <motion.div
                            className="cursor-pointer"
                            onClick={() => setShowLogo(!showLogo)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <AnimatePresence mode="wait">
                                {showLogo ? (
                                    <motion.div
                                        key="logo"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="h-[80px] md:h-[120px] lg:h-[138px] flex justify-center items-center"
                                    >
                                        <motion.span 
                                            className="text-7xl md:text-9xl lg:text-[140px] font-extrabold text-white"
                                            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}
                                            initial={{ x: -20 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            S
                                        </motion.span>
                                        <motion.span 
                                            className="text-7xl md:text-9xl lg:text-[140px] font-extrabold text-blue-400 -ml-4 md:-ml-6 lg:-ml-8"
                                            style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
                                            initial={{ x: 20 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            R
                                        </motion.span>
                                    </motion.div>
                                ) : (
                                    <motion.h1
                                        key="name"
                                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <motion.span 
                                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400"
                                            animate={{
                                                backgroundPosition: ['0%', '100%', '0%'],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{
                                                backgroundSize: '200% 100%',
                                                textShadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)'
                                            }}
                                        >
                                            Sherif Rahim
                                        </motion.span>
                                    </motion.h1>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </FloatingElement>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="space-y-4"
                    >
                        <motion.p 
                            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            Cyber Security Engineer specializing in SOC & EDR management, log auditing, and SIEM fine-tuning to ensure resilient security operations.
                        </motion.p>
                        <motion.p 
                            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            Experienced across IT infrastructure, vulnerability assessments, and red-blue team practices, bridging technical depth with practical impact.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        <motion.button 
                            onClick={() => scrollToSection('contact')}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white rounded-xl backdrop-blur-sm shadow-2xl font-semibold text-lg relative overflow-hidden group"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                            <span className="relative z-10">Let's Connect</span>
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                animate={{
                                    background: [
                                        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                                        "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                                        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <button onClick={() => scrollToSection('about')} className="cursor-pointer group">
                    <motion.div 
                        className="w-6 h-12 border-2 border-gray-500 rounded-full group-hover:border-blue-400 transition-colors flex justify-center pt-2 relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.div 
                            className="w-1 h-3 bg-gray-500 rounded-full group-hover:bg-blue-400"
                            animate={{ y: [0, 16, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            animate={{
                                background: [
                                    "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                                    "radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)"
                                ]
                            }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </motion.div>
                    <motion.p 
                        className="text-xs text-gray-500 mt-2 group-hover:text-blue-400 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                    >
                        Scroll to explore
                    </motion.p>
                </button>
            </motion.div>

            {/* Decorative Elements */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                    }}
                />
            ))}
        </section>
    );
};

export default Hero;
