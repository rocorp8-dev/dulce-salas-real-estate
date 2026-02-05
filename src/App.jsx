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
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover opacity-30 grayscale"
            alt=""
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
            AGENDAR CONSULTORÍA GRATUITA
          </button>
          <p className="mt-8 text-zinc-600 text-[10px] uppercase font-bold tracking-widest">© 2026 Dulce Salas Real Estate • Todos los derechos reservados</p>
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
