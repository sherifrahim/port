import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";

const navItems = [
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
];

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
        initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100,
            opacity: 0 
        }}
        animate={{ 
            y: -100,
            opacity: [0, 1, 0],
        }}
        transition={{
            duration: Math.random() * 10 + 10,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
        }}
    />
);

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            
            const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
            let current = 'hero';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="bg-black text-gray-300 font-sans leading-relaxed selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
            <style>{`
                .glow-text { 
                    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1);
                }
                .glass-effect {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .gradient-border {
                    background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent);
                    padding: 1px;
                }
                .gradient-border > * {
                    background: black;
                    border-radius: inherit;
                }
            `}</style>
            
            {/* Floating Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingParticle key={i} delay={i * 2} />
            ))}

            {/* Custom Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-screen"
                style={{
                    x: useTransform(mouseX, [0, window.innerWidth], [0, window.innerWidth]),
                    y: useTransform(mouseY, [0, window.innerHeight], [0, window.innerHeight])
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    scale: { duration: 2, repeat: Infinity }
                }}
            />
            
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'glass-effect shadow-2xl' : 'bg-transparent'}`}>
                <motion.div 
                    className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                    style={{ scaleX, transformOrigin: '0%' }} 
                />
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.button 
                        onClick={() => scrollToSection('hero')} 
                        className="text-2xl font-bold tracking-wider cursor-pointer hover:text-blue-400 transition-all duration-300 glow-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        SR
                    </motion.button>
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => scrollToSection(item.to)}
                                className="relative text-gray-300 hover:text-white transition-all duration-300 cursor-pointer group"
                                whileHover={{ y: -2 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {activeSection === item.to && (
                                    <motion.div 
                                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                                        layoutId="underline" 
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <motion.div
                                    className="absolute inset-0 bg-blue-500/10 rounded-lg -z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {[
                            { icon: Linkedin, href: "https://www.linkedin.com/in/sherifrahim/" },
                            { icon: Github, href: "https://github.com/sherifrahim" },
                            { icon: Mail, href: "mailto:contact@sherifrahim.com" }
                        ].map(({ icon: Icon, href }, index) => (
                            <motion.a
                                key={index}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                whileHover={{ y: -2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <motion.button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-gray-300 hover:text-white z-50 relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div
                                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </motion.button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 glass-effect z-30"
                    >
                        <motion.div 
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="pt-32 pb-8"
                        >
                            <div className="flex flex-col items-center space-y-8">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => {
                                            scrollToSection(item.to);
                                            setIsOpen(false);
                                        }}
                                        className="text-2xl text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        whileHover={{ scale: 1.1, x: 10 }}
                                    >
                                        {item.name}
                                        <motion.div
                                            className="absolute -left-4 top-1/2 w-2 h-2 bg-blue-500 rounded-full"
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1 }}
                                            style={{ y: "-50%" }}
                                        />
                                    </motion.button>
                                ))}
                                <motion.div 
                                    className="flex justify-center space-x-8 pt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {[
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/sherifrahim/" },
                                        { icon: Github, href: "https://github.com/sherifrahim" },
                                        { icon: Mail, href: "mailto:contact@sherifrahim.com" }
                                    ].map(({ icon: Icon, href }, index) => (
                                        <motion.a
                                            key={index}
                                            href={href}
                                            target={href.startsWith('mailto') ? undefined : "_blank"}
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-all duration-300"
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Icon size={28} />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main>{children}</main>

            <footer className="bg-black border-t border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
                <motion.div 
                    className="container mx-auto px-6 py-8 text-center text-gray-600 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.p
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        &copy; {new Date().getFullYear()} Sherif Rahim. Crafted with passion and innovation.
                    </motion.p>
                </motion.div>
            </footer>
        </div>
    );
}
