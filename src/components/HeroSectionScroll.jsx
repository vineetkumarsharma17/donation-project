import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Users, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSectionScroll = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate('/donate');
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-950 to-primary-900 overflow-hidden pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 to-primary-900/90"></div>
            </div>
            
            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-10">
                {/* Left Content */}
                <motion.div
                    className="text-center lg:text-left text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 mx-auto lg:mx-0"
                    >
                        <Heart size={14} className="text-secondary-400 fill-current" />
                        <span className="text-sm font-semibold text-secondary-100">Changing Lives Since 2020</span>
                    </motion.div>

                 <motion.h1
  className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
>
  Empowering Through
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-500 mt-2">
    Education
  </span>
</motion.h1>


                    <motion.p
                        className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Join us in our mission to provide books and educational resources to underprivileged children.
                        Every donation brings hope and knowledge to those who need it most.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">50k+</h3>
                            <p className="text-sm text-primary-200">Books Donated</p>
                        </div>
                        <div className="text-center lg:text-left border-l border-white/10 pl-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">10k+</h3>
                            <p className="text-sm text-primary-200">Children Helped</p>
                        </div>
                        <div className="text-center lg:text-left border-l border-white/10 pl-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">500+</h3>
                            <p className="text-sm text-primary-200">Volunteers</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <motion.button
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                        <motion.button
                            className="bg-trasparent text-white/80 hover:text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            whileHover={{ x: 5 }}
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <span className="text-lg">▶</span>
                            </div>
                            Watch Video
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right CTA Card */}
                <motion.div
                    className="relative hidden lg:block"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <motion.div
                        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-center"
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="w-24 h-24 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary-500/30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart size={40} className="text-white fill-current" />
                        </motion.div>

                        <h2 className="text-3xl font-bold text-white mb-2">Make a Difference</h2>
                        <p className="text-primary-100 mb-8">
                            Your contribution provides books and hope to children who need it most.
                        </p>

                        <motion.button
                            className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-secondary-500/20 transition-all flex items-center justify-center gap-2 text-lg"
                            onClick={handleDonateClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Donate Now
                            <ArrowRight size={20} />
                        </motion.button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-primary-200 text-sm">
                            <Lock size={14} />
                            <span>Secure & Tax Deductible</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSectionScroll;
