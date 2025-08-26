import React, { useState, useEffect } from 'react';
import { Experience as ExperienceEntity } from '@/entities/Experience';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            const data = await ExperienceEntity.list("-startDate");
            setExperience(data);
            setLoading(false);
        };
        fetchExperience();
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <section id="experience" className="py-24 sm:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div 
                    className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

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
                        Career Journey
                    </motion.h2>
                    <motion.div 
                        className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Animated Timeline Line */}
                    <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ top: 0 }}
                    />
                    
                    <div className="space-y-16">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full mt-2"></div>
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                                        <Skeleton className="h-48 rounded-xl bg-white/5" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            experience.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    className="relative"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    onHoverStart={() => setHoveredIndex(index)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                >
                                    {/* Timeline Dot */}
                                    <motion.div 
                                        className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-6"
                                        whileHover={{ scale: 1.5 }}
                                    >
                                        <motion.div
                                            className="w-6 h-6 bg-black rounded-full border-4 border-blue-500 relative"
                                            animate={{
                                                boxShadow: hoveredIndex === index 
                                                    ? "0 0 20px rgba(59, 130, 246, 0.6)" 
                                                    : "0 0 10px rgba(59, 130, 246, 0.3)",
                                                scale: hoveredIndex === index ? 1.2 : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className="absolute inset-1 bg-blue-500 rounded-full"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.5, 1, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3
                                                }}
                                            />
                                        </motion.div>
                                    </motion.div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'}`}>
                                        <motion.div 
                                            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group"
                                            whileHover={{ 
                                                scale: 1.02,
                                                borderColor: "rgba(59, 130, 246, 0.3)",
                                                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Animated Background Gradient */}
                                            <motion.div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                                animate={{
                                                    background: [
                                                        "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                                        "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                                        "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                                                    ]
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />

                                            <div className="relative z-10">
                                                {/* Company Header */}
                                                <motion.div 
                                                    className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                                                    whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                                                >
                                                    {job.companyLogoUrl && (
                                                        <motion.img 
                                                            src={job.companyLogoUrl} 
                                                            alt={`${job.company} logo`} 
                                                            className="w-10 h-10 rounded-full bg-white p-1 shadow-lg"
                                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                                        />
                                                    )}
                                                    <div className={index % 2 === 0 ? 'md:text-right' : 'md:text-left'}>
                                                        <motion.h3 
                                                            className="text-2xl font-bold text-white"
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            {job.company}
                                                        </motion.h3>
                                                        <motion.p 
                                                            className="text-blue-400 font-semibold text-lg"
                                                            animate={{
                                                                textShadow: hoveredIndex === index 
                                                                    ? "0 0 10px rgba(59, 130, 246, 0.5)" 
                                                                    : "none"
                                                            }}
                                                        >
                                                            {job.role}
                                                        </motion.p>
                                                    </div>
                                                </motion.div>

                                                {/* Duration */}
                                                <motion.div 
                                                    className={`flex items-center gap-2 text-gray-400 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                                                    whileHover={{ color: "#60a5fa" }}
                                                >
                                                    <Calendar size={16} />
                                                    <span className="font-medium">
                                                        {format(new Date(job.startDate), 'MMM yyyy')} - {job.endDate ? format(new Date(job.endDate), 'MMM yyyy') : 'Present'}
                                                    </span>
                                                </motion.div>

                                                {/* Description */}
                                                <motion.p 
                                                    className="text-gray-300 leading-relaxed"
                                                    initial={{ opacity: 0.8 }}
                                                    whileHover={{ opacity: 1, y: -2 }}
                                                >
                                                    {job.description}
                                                </motion.p>

                                                {/* Hover Arrow Indicator */}
                                                <motion.div
                                                    className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-left-3' : '-right-3'} opacity-0 group-hover:opacity-100`}
                                                    initial={{ x: index % 2 === 0 ? -10 : 10 }}
                                                    whileHover={{ x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronRight 
                                                        className={`w-6 h-6 text-blue-400 ${index % 2 !== 0 ? 'rotate-180' : ''}`}
                                                    />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
