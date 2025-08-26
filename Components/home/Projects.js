import React, { useState, useEffect } from 'react';
import { Project } from '@/entities/Project';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Tag, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await Project.list();
            setProjects(data);
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <section id="projects" className="py-24 sm:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div 
                    className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 20,
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
                        Featured Projects
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-gray-400 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Building the future, one project at a time
                    </motion.p>
                    <motion.div 
                        className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    onMouseMove={(e) => {
                        mouseX.set(e.clientX);
                        mouseY.set(e.clientY);
                    }}
                >
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                           <Skeleton key={index} className="h-96 rounded-2xl bg-white/5" />
                        ))
                    ) : (
                        projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="group relative"
                                variants={{
                                    hidden: { y: 50, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <motion.div
                                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative h-full"
                                    whileHover={{ 
                                        scale: 1.02,
                                        borderColor: "rgba(59, 130, 246, 0.3)",
                                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Animated Background on Hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                        animate={{
                                            background: hoveredIndex === index ? [
                                                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                                                "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                                                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
                                            ] : "none"
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />

                                    {/* Project Image */}
                                    <div className="relative overflow-hidden">
                                        <motion.img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-48 object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                                            transition={{ duration: 0.3 }}
                                        />
                                        
                                        {/* Floating Sparkle Effect */}
                                        <motion.div
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                                            animate={hoveredIndex === index ? {
                                                rotate: [0, 180, 360],
                                                scale: [1, 1.2, 1],
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Sparkles className="w-6 h-6 text-blue-400" />
                                        </motion.div>
                                    </div>

                                    <div className="p-6 relative z-10">
                                        {/* Project Header */}
                                        <motion.div 
                                            className="flex justify-between items-start mb-3"
                                            whileHover={{ y: -2 }}
                                        >
                                            <motion.h3 
                                                className="text-xl font-bold text-white"
                                                whileHover={{ 
                                                    textShadow: "0 0 10px rgba(59, 130, 246, 0.5)" 
                                                }}
                                            >
                                                {project.title}
                                            </motion.h3>
                                            {project.projectUrl && (
                                                <motion.a 
                                                    href={project.projectUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                    whileHover={{ 
                                                        scale: 1.2, 
                                                        rotate: 15,
                                                        color: "#60a5fa" 
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <ExternalLink size={20} />
                                                </motion.a>
                                            )}
                                        </motion.div>

                                        {/* Project Description */}
                                        <motion.p 
                                            className="text-gray-400 text-sm mb-4 min-h-[60px] leading-relaxed"
                                            whileHover={{ color: "#d1d5db" }}
                                        >
                                            {project.description}
                                        </motion.p>

                                        {/* Tags */}
                                        <motion.div 
                                            className="flex flex-wrap gap-2"
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1 }}
                                        >
                                            {project.tags?.map((tag, tagIndex) => (
                                                <motion.span 
                                                    key={tag}
                                                    className="text-xs font-medium bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20"
                                                    whileHover={{ 
                                                        scale: 1.1,
                                                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                                                        borderColor: "rgba(59, 130, 246, 0.4)"
                                                    }}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ 
                                                        delay: tagIndex * 0.1,
                                                        duration: 0.3 
                                                    }}
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Animated Border Effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                                        style={{
                                            background: `conic-gradient(from ${hoveredIndex === index ? 0 : 0}deg at 50% 50%, rgba(59, 130, 246, 0.3), transparent, rgba(59, 130, 246, 0.3))`,
                                            padding: '1px',
                                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            maskComposite: 'subtract'
                                        }}
                                        animate={hoveredIndex === index ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
