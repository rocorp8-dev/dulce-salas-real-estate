import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../services/supabaseClient'
import { Plus, Trash2, Edit2, LogOut, LayoutDashboard, Building2, Save, X, ExternalLink, Camera, Loader2, Image as ImageIcon } from 'lucide-react'

const AdminDashboard = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProperty, setEditingProperty] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Residencial',
        price: '',
        location: '',
        description: '',
        long_description: '',
        image: '',
        gallery: [],
        features: '',
        amenities: ''
    })

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false })
        if (error) console.error('Error:', error)
        else setProperties(data)
        setLoading(false)
    }

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        try {
            setUploading(true)
            const uploadedUrls = []

            for (const file of files) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('properties')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('properties')
                    .getPublicUrl(filePath)

                uploadedUrls.push(publicUrl)
            }

            setFormData(prev => ({
                ...prev,
                image: prev.image || uploadedUrls[0],
                gallery: [...(prev.gallery || []), ...uploadedUrls]
            }))
        } catch (error) {
            alert('Error al subir imagen: Asegúrate de que el bucket "properties" exista y sea público en Supabase.')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...formData,
            features: typeof formData.features === 'string' ? formData.features.split(',').map(s => s.trim()) : formData.features,
            amenities: typeof formData.amenities === 'string' ? formData.amenities.split(',').map(s => s.trim()) : formData.amenities
        }

        if (editingProperty) {
            const { error } = await supabase.from('properties').update(payload).eq('id', editingProperty.id)
            if (error) alert('Error al actualizar')
        } else {
            const { error } = await supabase.from('properties').insert([payload])
            if (error) alert('Error al guardar')
        }

        setIsFormOpen(false)
        setEditingProperty(null)
        setFormData({ title: '', category: 'Residencial', price: '', location: '', description: '', long_description: '', image: '', gallery: [], features: '', amenities: '' })
        fetchProperties()
    }

    const handleDelete = async (id) => {
        if (confirm('¿Estás segura de que quieres eliminar esta propiedad?')) {
            const { error } = await supabase.from('properties').delete().eq('id', id)
            if (error) alert('Error al eliminar')
            else fetchProperties()
        }
    }

    const startEdit = (prop) => {
        setEditingProperty(prop)
        setFormData({
            title: prop.title,
            category: prop.category,
            price: prop.price,
            location: prop.location,
            description: prop.description,
            long_description: prop.long_description,
            image: prop.image,
            gallery: prop.gallery || [],
            features: prop.features ? (Array.isArray(prop.features) ? prop.features.join(', ') : prop.features) : '',
            amenities: prop.amenities ? (Array.isArray(prop.amenities) ? prop.amenities.join(', ') : prop.amenities) : ''
        })
        setIsFormOpen(true)
    }

    return (
        <div className="min-h-screen bg-[#02060c] text-white p-6 md:p-12 font-['Inter',sans-serif]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <LayoutDashboard className="text-[#d4af37]" />
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Panel de Gestión</h1>
                    </div>
                    <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Control de Catálogo • Dulce Salas</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setEditingProperty(null)
                            setFormData({ title: '', category: 'Residencial', price: '', location: '', description: '', long_description: '', image: '', gallery: [], features: '', amenities: '' })
                            setIsFormOpen(true)
                        }}
                        className="bg-[#d4af37] text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <Plus size={16} />
                        Nueva Propiedad
                    </button>
                    <a href="/" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                        <ExternalLink size={16} />
                        Ver Sitio
                    </a>
                </div>
            </header>

            <main>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="animate-spin text-[#d4af37]" size={48} />
                        <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Cargando Catálogo...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {properties.map(prop => (
                            <div key={prop.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-[#d4af37]/30 transition-all hover:bg-white/[0.07]">
                                <div className="w-40 h-28 rounded-3xl overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/5 shadow-2xl">
                                    <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                        <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.2em]">{prop.category}</span>
                                        {prop.gallery?.length > 0 && (
                                            <span className="text-[8px] bg-[#d4af37]/20 border border-[#d4af37]/30 px-3 py-1 rounded-full text-[#d4af37] font-black uppercase tracking-widest">
                                                {prop.gallery.length} fotos
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white/90">{prop.title}</h3>
                                    <p className="text-zinc-500 text-sm font-medium">{prop.location} • <span className="text-white/40">{prop.price}</span></p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => startEdit(prop)}
                                        className="p-5 bg-white/5 rounded-full text-white hover:bg-[#d4af37] hover:text-black transition-all shadow-lg"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prop.id)}
                                        className="p-5 bg-white/5 rounded-full text-white hover:bg-red-500 transition-all shadow-lg"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl my-auto rounded-[4rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]"
                        >
                            <div className="p-12 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#d4af37]/5 to-transparent">
                                <div>
                                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                                        {editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
                                    </h1>
                                    <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-[0.3em] mt-2">Detalles Exclusivos de la Carpeta</p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-12 overflow-y-auto space-y-12 max-h-[70vh] custom-scrollbar">
                                {/* Upload Gallery Grid */}
                                <div className="space-y-6">
                                    <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[#d4af37] flex items-center gap-3">
                                        <ImageIcon size={14} />
                                        Multimedia y Galería (Se recomienda subir 3+ fotos para el Collage)
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        <div
                                            onClick={() => document.getElementById('file-upload').click()}
                                            className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group relative overflow-hidden"
                                        >
                                            {uploading ? (
                                                <Loader2 className="animate-spin text-[#d4af37]" size={32} />
                                            ) : (
                                                <>
                                                    <Camera className="text-zinc-600 group-hover:text-[#d4af37] mb-2 transform group-hover:scale-110 transition-transform" size={32} />
                                                    <span className="text-[8px] uppercase font-black text-zinc-600 group-hover:text-[#d4af37] tracking-widest text-center px-4">Añadir Archivos</span>
                                                </>
                                            )}
                                            <input
                                                id="file-upload"
                                                type="file"
                                                multiple
                                                className="hidden"
                                                onChange={handleFileUpload}
                                                accept="image/*"
                                                disabled={uploading}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        {formData.gallery?.map((url, i) => (
                                            <div key={i} className="aspect-square rounded-[2.5rem] overflow-hidden relative group border border-white/5">
                                                <img src={url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(p => ({ ...p, gallery: p.gallery.filter((_, idx) => idx !== i) }))}
                                                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(p => ({ ...p, image: url }))}
                                                        className={`p-3 rounded-full hover:scale-110 transition-transform ${formData.image === url ? 'bg-[#d4af37] text-black' : 'bg-white/20 text-white'}`}
                                                    >
                                                        <ImageIcon size={16} />
                                                    </button>
                                                </div>
                                                {formData.image === url && (
                                                    <div className="absolute bottom-4 left-4 bg-[#d4af37] text-black text-[7px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">Portada</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Título de la Propiedad</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all font-bold text-white tracking-tight"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ej: Villa Paraíso Azul"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Categoría Exclusiva</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all appearance-none font-bold text-white tracking-widest uppercase text-xs"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="Lujo">Lujo</option>
                                                <option value="Residencial">Residencial</option>
                                                <option value="Inversión">Inversión</option>
                                                <option value="Exclusiva">Exclusiva</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Inversión / Precio</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all font-bold text-white/70"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="Ej: $850,000 USD"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Ubicación Geográfica</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all font-bold text-white/70"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Ej: Valle de Guadalupe, BC"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">URL de Imagen Principal (Fallback)</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all text-white/40 text-sm"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Se asignará automáticamente al subir fotos o pega una URL manual"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Síntesis Comercial (Descripción Corta)</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all text-white/80"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Escribe un gancho comercial irresistible..."
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Especificaciones Técnicas (Descripción Larga)</label>
                                    <textarea
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-8 focus:border-[#d4af37] outline-none transition-all text-white/80 leading-relaxed font-medium"
                                        value={formData.long_description}
                                        onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                        placeholder="Describe cada detalle: acabados, materiales, vistas, amenidades cercanas..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Características Clave (Comas)</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all text-white/60"
                                            value={formData.features}
                                            onChange={e => setFormData({ ...formData, features: e.target.value })}
                                            placeholder="Ej: 4 Recámaras, 3.5 Baños, Cochera Triple"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]">Amenidades de Lujo (Comas)</label>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 focus:border-[#d4af37] outline-none transition-all text-white/60"
                                            value={formData.amenities}
                                            onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                                            placeholder="Ej: Alberca Infinity, Cava de Vinos, Roof Garden"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-10">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-white text-black py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-[#d4af37] hover:text-white transition-all flex items-center justify-center gap-4 shadow-2xl group"
                                    >
                                        <Save size={24} className="group-hover:scale-110 transition-transform" />
                                        Publicar en Catálogo
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminDashboard
