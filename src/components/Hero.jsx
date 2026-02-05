import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background with higher resolution feel */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    className="w-full h-full object-cover"
                    alt="Luxury Real Estate"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex flex-col items-center">
                        <img src="/logo_ds.png" alt="Dulce Salas Logo" className="h-24 md:hidden mb-6 object-contain" />
                        <span className="text-[#d4af37] font-black text-[10px] md:text-sm uppercase tracking-[0.5em] mb-4 md:mb-6 block">
                            Exclusividad • Plusvalía • Estilo
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8">
                        Best Real Estate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ffffff50]">Deals</span>
                    </h1>
                    <p className="text-white/60 text-xs sm:text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed px-4">
                        Explora las propiedades más exclusivas de Baja California con el respaldo de la asesoría inmobiliaria más avanzada del norte de México.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="#properties"
                            className="w-full md:w-auto bg-[#d4af37] text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-[#d4af3720]"
                        >
                            Ver Portafolio
                        </a>
                        <a
                            href="#about"
                            className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
                        >
                            Sobre Dulce Salas
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Animated Scroll Down Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
            >
                <span className="text-[8px] uppercase font-bold tracking-[0.3em]">Hacia Abajo</span>
                <ChevronDown size={20} />
            </motion.div>
        </section>
    )
}

export default Hero
