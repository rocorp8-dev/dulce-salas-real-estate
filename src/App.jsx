import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import PropertyExplorer from './components/PropertyExplorer'
import ChatInterface from './components/ChatInterface'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

const LandingPage = () => (
  <>
    {/* Main Structure */}
    <Header />

    <main>
      <Hero />

      <section id="properties" className="relative z-10 py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <PropertyExplorer />
        </div>
      </section>

      {/* Placeholder for About Me / Contact Sections per Hilux reference */}
      <section id="about" className="relative py-32 overflow-hidden">
        {/* Background image with overlay for that "lost" depth */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=50"
            className="w-full h-full object-cover opacity-30 grayscale"
            alt=""
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Sobre Dulce Salas</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white leading-tight">
              Liderando el futuro <br /> inmobiliario en BC
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
              Con más de 10 años de experiencia y la integración estratégica de inteligencia artificial, ayudo a mis clientes a encontrar no solo una propiedad, sino una inversión de vida segura y rentable.
            </p>
            <div className="w-24 h-1.5 bg-[#d4af37] mx-auto rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">¿Listo para dar el siguiente paso?</h2>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openChat'))}
            className="bg-[#d4af37] text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-[#d4af3720]"
          >
            AGENDAR UNA CITA
          </button>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6 mt-12 mb-8">
            <a
              href="https://www.instagram.com/dulce.ventas.encanto"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61579480085617"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
            </a>
          </div>

          <p className="mt-4 text-zinc-600 text-[10px] uppercase font-bold tracking-widest">© 2026 Dulce Salas Real Estate • Todos los derechos reservados</p>
        </div>
      </section>
    </main>

    {/* Floating Chat Widget */}
    <ChatInterface />
  </>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
        {/* Background blobs for flair */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#d4af3708] blur-[150px] rounded-full -mr-96 -mt-96 pointer-events-none z-0" />
        <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-[#00f2ff03] blur-[150px] rounded-full -ml-96 -mb-96 pointer-events-none z-0" />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
