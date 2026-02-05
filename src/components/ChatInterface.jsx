import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, MapPin, Calculator, FileText, X } from 'lucide-react'
import { sendMessageToAI } from '../services/aiService'
import { sendLeadNotification } from '../services/emailService'

const ChatInterface = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hola, un gusto saludarte. Soy el asistente inteligente de Dulce Salas. ¿En qué zona de Baja California estás buscando tu próxima inversión? Ensenada, Rosarito o Tijuana...'
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('openChat', handleOpenChat);
        return () => window.removeEventListener('openChat', handleOpenChat);
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const chatHistory = messages.concat(userMessage)
            const assistantResponse = await sendMessageToAI(chatHistory)

            if (assistantResponse.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `⚠️ Error: ${assistantResponse.error}`,
                    isError: true
                }])
            } else {
                setMessages(prev => [...prev, assistantResponse])

                // Lógica de detección de lead/cita
                const content = assistantResponse.content.toLowerCase()
                console.log("Analizando respuesta de IA para envío de correo:", content);

                // Palabras clave ampliadas para detección
                const keywords = ["agendada", "correo enviado", "confirmada", "cita", "contactaré", "datos recibidos", "perfecto", "registrado"];
                const isLeadCapture = keywords.some(keyword => content.includes(keyword));

                if (isLeadCapture) {
                    console.log("¡Intención de cita detectada! Preparando envío de correo...");
                    const leadData = {
                        name: "Cliente desde Chat",
                        context: `Conversación reciente: ${input} ... (Respuesta IA: ${assistantResponse.content})`,
                        contact: "Verificar historial de chat",
                        date: new Date().toLocaleString()
                    }

                    try {
                        const emailResult = await sendLeadNotification(leadData)
                        console.log("Resultado del envío de correo:", emailResult);
                    } catch (emailErr) {
                        console.error("Fallo al intentar enviar el correo automático:", emailErr);
                    }
                }
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Lo siento, hubo un problema al conectar con mis sistemas centrales de IA. Por favor, verifica tu conexión o API Key.',
                isError: true
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const quickActions = [
        { label: 'Plusvalía en Tijuana', icon: MapPin },
        { label: 'Valle de Guadalupe', icon: Sparkles },
        { label: 'Simular ISR/ISAI', icon: Calculator },
        { label: 'Contrato Legal BC', icon: FileText },
    ]

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-black/90 backdrop-blur-3xl border border-white/10 w-[90vw] md:w-[420px] h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37] overflow-hidden border border-[#d4af37]/30">
                                    <img src="/dulce_perfil.png" className="w-full h-full object-cover" alt="Dulce Salas" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Dulce Salas AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase">En línea</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#d4af37] text-black font-semibold rounded-tr-none shadow-lg'
                                        : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-black/40">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe aquí..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#d4af3740] text-sm text-white"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-4 bg-[#d4af37] text-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Bubble Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative group flex items-center"
            >
                {/* Visual Label (Tooltip Style) */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="mr-4 bg-white text-black px-6 py-3 rounded-2xl rounded-br-none shadow-2xl font-bold text-sm whitespace-nowrap"
                        >
                            ¿En qué puedo ayudarte?
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="w-16 h-16 rounded-3xl bg-[#1a1a1a] border-2 border-[#d4af37] p-0.5 shadow-[0_10px_40_rgba(212,175,55,0.4)] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-[1.4rem] bg-white/5 flex items-center justify-center overflow-hidden">
                        <img src="/dulce_perfil.png" alt="Dulce Salas" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Status Dot */}
                <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 border-4 border-black rounded-full" />
            </motion.button>
        </div>
    )
}

export default ChatInterface
