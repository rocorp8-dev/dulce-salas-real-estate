import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Info, X, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react'
import { supabase } from '../services/supabaseClient'
import PropertyCollage from './PropertyCollage'

const SkeletonCard = () => (
    <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-xl border border-zinc-100 animate-pulse">
        <div className="h-64 bg-zinc-200" />
        <div className="p-8 space-y-4">
            <div className="h-6 bg-zinc-200 rounded-md w-3/4" />
            <div className="h-4 bg-zinc-100 rounded-md w-1/2" />
            <div className="space-y-2">
                <div className="h-3 bg-zinc-100 rounded-md w-full" />
                <div className="h-3 bg-zinc-100 rounded-md w-full" />
            </div>
            <div className="pt-6 border-t border-zinc-100">
                <div className="h-4 bg-zinc-100 rounded-md w-1/4 mb-2" />
                <div className="h-8 bg-zinc-200 rounded-md w-1/2" />
            </div>
            <div className="h-14 bg-zinc-200 rounded-2xl w-full" />
        </div>
    </div>
)

const PropertyExplorer = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('Todas')
    const [selectedProperty, setSelectedProperty] = useState(null)

    const categories = ['Todas', 'Lujo', 'Inversión', 'Residencial']

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('properties')
                .select('*')

            if (error) throw error
            setProperties(data || [])
        } catch (err) {
            console.error('Error fetching properties:', err)
            setError('No pudimos cargar el catálogo. Por favor intenta más tarde.')
        } finally {
            setLoading(false)
        }
    }

    const filteredProperties = filter === 'Todas' ? properties : properties.filter(p => p.category === filter)

    return (
        <div className="h-full flex flex-col p-8 overflow-hidden relative min-h-[600px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase glow-text">Catálogo Exclusivo</h2>
                    <p className="text-zinc-500 text-sm mt-1">La casa de tus sueños está aquí • Baja California</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1 glass p-1 rounded-full border-[#ffffff10]">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${filter === cat
                                    ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {error ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <AlertCircle size={48} className="text-red-500/50 mb-4" />
                        <p className="text-zinc-400 font-medium max-w-xs">{error}</p>
                        <button
                            onClick={fetchProperties}
                            className="mt-6 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
                        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Building2 size={32} className="text-zinc-700" />
                        </div>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No hay propiedades en esta categoría</p>
                    </div>
                ) : (
                    <div className="bento-grid pb-12">
                        <AnimatePresence mode="popLayout">
                            {filteredProperties.map((prop, index) => {
                                // Logic to assign bento spans
                                let bentoClass = "";
                                if (index === 0) bentoClass = "bento-item-large";
                                else if (index === 1) bentoClass = "bento-item-tall";
                                else if (index === 5) bentoClass = "bento-item-wide";

                                return (
                                    <motion.div
                                        key={prop.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                        className={`glass-premium rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl hover:shadow-[#d4af3720] transition-all duration-500 border border-[#ffffff10] group ${bentoClass}`}
                                    >
                                        {/* Image Container */}
                                        <div className={`relative ${bentoClass.includes('large') || bentoClass.includes('tall') ? 'h-full min-h-[300px]' : 'h-64'} overflow-hidden`}>
                                            <img
                                                src={prop.image}
                                                alt={prop.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            <div className="absolute top-6 left-6 bg-[#d4af37] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                                                {prop.category}
                                            </div>

                                            {/* Floating Info for Bento items */}
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h3 className="text-white font-black text-xl mb-1 leading-tight uppercase tracking-tight glow-text">{prop.title}</h3>
                                                <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase tracking-tighter">
                                                    <MapPin size={10} />
                                                    {prop.location}
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-xl font-black text-white tracking-tighter">{prop.price}</span>
                                                    <button
                                                        onClick={() => setSelectedProperty(prop)}
                                                        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all"
                                                    >
                                                        <Info size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Detail Overlay */}
            <AnimatePresence>
                {selectedProperty && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-3xl bg-black/60"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedProperty(null)}
                                className="absolute top-6 right-6 z-[110] p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col md:flex-row w-full overflow-y-auto">
                                <div className="w-full md:w-3/5 p-8">
                                    <PropertyCollage images={selectedProperty.gallery || [selectedProperty.image]} />
                                </div>

                                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-white">
                                    <span className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Proyecto Destacado</span>
                                    <h2 className="text-[#1a1a1a] text-4xl font-black uppercase tracking-tighter leading-none mb-2">{selectedProperty.title}</h2>
                                    <p className="text-[#d4af37] text-lg font-bold mb-8">{selectedProperty.price}</p>

                                    <div className="space-y-6 mb-12">
                                        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                            {selectedProperty.long_description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedProperty.features?.map((f, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[#1a1a1a] font-bold text-xs uppercase">
                                                    <CheckCircle2 size={16} className="text-[#d4af37]" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h4 className="text-[#1a1a1a] font-black text-xs uppercase tracking-widest mb-4">Amenidades Premium</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProperty.amenities?.map((a, i) => (
                                                <span key={i} className="px-4 py-2 bg-zinc-100 text-[#1a1a1a] text-[10px] font-bold rounded-xl uppercase">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedProperty(null)}
                                        className="mt-auto w-full bg-[#1a1a1a] text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#d4af37] transition-all flex items-center justify-center gap-4 group"
                                    >
                                        Cerrar Detalles
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-all">
                                            <X size={16} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PropertyExplorer
