import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home, Building2, User, Phone } from 'lucide-react'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Inicio', href: '#home', icon: Home },
        { name: 'Propiedades', href: '#properties', icon: Building2 },
        { name: 'Sobre Mí', href: '#about', icon: User },
        { name: 'Contacto', href: '#contact', icon: Phone },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled
                ? 'bg-[#02060c]/90 backdrop-blur-xl py-3 border-b border-[#d4af3730] shadow-[0_4px_30px_rgba(212,175,55,0.15)]'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img src="/logo_ds.png" alt="Dulce Salas Logo" className="h-16 md:h-20 w-auto object-contain transition-transform hover:scale-105 duration-300" />
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-none">Dulce Salas</span>
                        <span className="text-[10px] md:text-xs text-[#d4af37] font-black uppercase tracking-[0.4em] mt-1">Tu Asesor Inmobiliario</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#d4af37] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openChat'))}
                        className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                    >
                        Consultar
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-[#02060c] flex flex-col items-center justify-center space-y-8 md:hidden p-8"
                >
                    <button
                        className="absolute top-8 right-6 text-white/50 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>

                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-black uppercase tracking-tighter text-white hover:text-[#d4af37] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openChat'))}
                        className="bg-[#d4af37] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs mt-8"
                    >
                        Agendar Cita
                    </button>

                    <div className="absolute bottom-12 flex flex-col items-center gap-2">
                        <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em]">Dulce Salas</span>
                        <span className="text-zinc-600 text-[9px] uppercase tracking-widest">Real Estate</span>
                    </div>
                </motion.div>
            )}
        </header>
    )
}

export default Header
