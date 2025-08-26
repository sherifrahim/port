
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Server, Search, AlertTriangle, Network, Shield } from 'lucide-react';

const About = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

    const skills = [
        { icon: Shield, title: "SOC & EDR Management", desc: "Ensuring uptime and performance for continuous threat monitoring." },
        { icon: Search, title: "Log Auditing & Analysis", desc: "Detecting anomalies and maintaining operational integrity." },
        { icon: AlertTriangle, title: "SIEM Fine-Tuning", desc: "Improving detection accuracy and reducing false positives." },
        { icon: Network, title: "Network & Infrastructure Security", desc: "Configuring firewalls, VPNs, and structured network layouts." },
        { icon: Server, title: "System Administration", desc: "Managing servers, Active Directory, and providing L1-L3 support." },
        { icon: ShieldCheck, title: "Vulnerability Assessment", desc: "Applying web security knowledge and OWASP standards." }
    ];

    return (
        <section id="about" className="py-24 sm:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"
                style={{ y, opacity }}
            />
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"
                        animate={{
                            textShadow: [
                                "0 0 10px rgba(59, 130, 246, 0.3)",
                                "0 0 20px rgba(59, 130, 246, 0.5)",
                                "0 0 10px rgba(59, 130, 246, 0.3)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        About Me
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-gray-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Cyber Security Engineer • System Administrator • IT Specialist
                    </motion.p>
                    <motion.div 
                        className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <motion.div 
                            className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"
                            animate={{
                                rotate: [0, 1, 0],
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <div className="relative rounded-2xl w-full aspect-square bg-black/30 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LDEzMCwyNDYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgICAgPC9wY2V0dGVybj4KICAgIDwvZGVmcz4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-50 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_40%,transparent_100%)]"></div>
                           <motion.div
                             animate={{
                                scale: [1, 1.05, 1],
                                textShadow: ["0 0 10px rgba(59, 130, 246, 0.5)","0 0 20px rgba(59, 130, 246, 0.8)","0 0 10px rgba(59, 130, 246, 0.5)"]
                             }}
                             transition={{
                                duration: 3,
                                repeat: Infinity,
                             }}
                           >
                            <ShieldCheck className="w-32 h-32 text-blue-500/80" strokeWidth={1} />
                           </motion.div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <motion.p 
                            className="text-lg text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            I'm a Cyber Security Engineer specializing in SOC & EDR management, log auditing, and SIEM fine-tuning. My goal is to build and maintain resilient security operations that protect critical infrastructure.
                        </motion.p>
                        <motion.p 
                            className="text-lg text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            With broad experience across IT system administration, network security, and vulnerability assessments, I bridge the gap between deep technical knowledge and practical, high-impact security implementation. I thrive on solving complex challenges and ensuring operational integrity from the ground up.
                        </motion.p>

                        <motion.div 
                            className="pt-6 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Focus Areas</h3>
                            <div className="space-y-3">
                                {[
                                    "Security Operations Center (SOC) Management",
                                    "SIEM Rule & Alert Optimization",
                                    "IT Infrastructure & System Administration",
                                    "Vulnerability Assessment & Penetration Testing",
                                ].map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="w-2 h-2 bg-blue-400 rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: index * 0.2,
                                                repeat: Infinity,
                                            }}
                                        />
                                        <span className="text-gray-200">{achievement}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-12">Expertise & Impact</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm relative overflow-hidden group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ 
                                    scale: 1.02,
                                    borderColor: "rgba(59, 130, 246, 0.3)"
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        background: [
                                            "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                            "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                            "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <motion.div 
                                    className="relative z-10"
                                    whileHover={{ y: -2 }}
                                >
                                    <motion.div
                                        className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4"
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <skill.icon className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{skill.title}</h4>
                                    <p className="text-gray-400 text-sm">{skill.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
