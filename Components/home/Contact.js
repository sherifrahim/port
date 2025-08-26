import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SendEmail } from '@/integrations/Core';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Mail, MessageCircle, User, Zap } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [0, 400], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 400], [-10, 10]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill out all fields.');
            return;
        }
        setLoading(true);
        try {
            await SendEmail({
                to: 'sherif@base44.com',
                from_name: formData.name,
                subject: `New message from ${formData.name} via Portfolio`,
                body: `From: ${formData.email}\n\nMessage:\n${formData.message}`
            });
            toast.success('Message sent! I will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <section id="contact" className="py-24 sm:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.6, 0.3, 0.6],
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 15,
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
                    className="text-center mb-16"
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
                        Let's Connect
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-gray-400 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Have an exciting project or just want to chat? I'd love to hear from you.
                    </motion.p>
                    <motion.div 
                        className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <motion.form 
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ rotateX, rotateY, transformPerspective: 1000 }}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            mouseX.set(e.clientX - rect.left);
                            mouseY.set(e.clientY - rect.top);
                        }}
                    >
                        {/* Form Fields Container */}
                        <motion.div 
                            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
                            whileHover={{ 
                                borderColor: "rgba(59, 130, 246, 0.3)",
                                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                            }}
                        >
                            {/* Animated Background */}
                            <motion.div
                                className="absolute inset-0 opacity-50"
                                animate={{
                                    background: [
                                        "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                        "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                        "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                        "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                            />

                            <div className="relative z-10 space-y-6">
                                {/* Name and Email Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div 
                                        className="relative"
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0"
                                            animate={{ 
                                                opacity: focusedField === 'name' ? 1 : 0,
                                                scale: focusedField === 'name' ? 1.02 : 1
                                            }}
                                        />
                                        <div className="relative flex items-center">
                                            <User className="absolute left-3 w-5 h-5 text-gray-400 z-10" />
                                            <Input 
                                                type="text" 
                                                name="name" 
                                                placeholder="Your Name" 
                                                value={formData.name} 
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 ring-offset-black focus-visible:ring-blue-500 pl-10"
                                                required
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="relative"
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0"
                                            animate={{ 
                                                opacity: focusedField === 'email' ? 1 : 0,
                                                scale: focusedField === 'email' ? 1.02 : 1
                                            }}
                                        />
                                        <div className="relative flex items-center">
                                            <Mail className="absolute left-3 w-5 h-5 text-gray-400 z-10" />
                                            <Input 
                                                type="email" 
                                                name="email" 
                                                placeholder="Your Email" 
                                                value={formData.email} 
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 ring-offset-black focus-visible:ring-blue-500 pl-10"
                                                required
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Message Field */}
                                <motion.div 
                                    className="relative"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0"
                                        animate={{ 
                                            opacity: focusedField === 'message' ? 1 : 0,
                                            scale: focusedField === 'message' ? 1.02 : 1
                                        }}
                                    />
                                    <div className="relative">
                                        <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                                        <Textarea 
                                            name="message" 
                                            placeholder="Your Message" 
                                            rows="6" 
                                            value={formData.message} 
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 ring-offset-black focus-visible:ring-blue-500 pl-10 pt-3"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div 
                                    className="text-center pt-4"
                                    whileHover={{ y: -2 }}
                                >
                                    <Button 
                                        type="submit" 
                                        size="lg" 
                                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white font-semibold px-8 py-3 relative overflow-hidden group" 
                                        disabled={loading}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-white/10"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <span className="relative z-10 flex items-center gap-2">
                                            {loading ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Loader2 className="h-4 w-4" />
                                                    </motion.div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <motion.div
                                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Send className="h-4 w-4" />
                                                    </motion.div>
                                                    Send Message
                                                </>
                                            )}
                                        </span>
                                        
                                        {/* Button Glow Effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 20px rgba(59, 130, 246, 0.3)",
                                                    "0 0 40px rgba(59, 130, 246, 0.5)",
                                                    "0 0 20px rgba(59, 130, 246, 0.3)"
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div 
                        className="mt-12 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <motion.p 
                            className="text-gray-400 mb-4"
                            whileHover={{ color: "#d1d5db" }}
                        >
                            Or reach me directly at
                        </motion.p>
                        <motion.a 
                            href="mailto:sherif@base44.com"
                            className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors"
                            whileHover={{ 
                                scale: 1.05,
                                textShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            sherif@base44.com
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
