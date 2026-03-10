import axios from 'axios';
import { getAllServices, generateBudget, generateWhatsAppMessage } from './aiKnowledge';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Detecta comandos especiales tipo slash (/)
 */
export const detectCommand = (input) => {
    if (!input) return null;
    const text = input.trim().toLowerCase();

    if (text === '/servicios') {
        return { type: 'services' };
    }

    if (text.startsWith('/presupuesto')) {
        const parts = input.split(' ');
        return {
            type: 'quote',
            serviceId: parts[1] || 'generic',
            clientName: parts.slice(2).join(' ') || 'Cliente'
        };
    }

    if (text.startsWith('/whatsapp')) {
        const parts = input.split(' ');
        return {
            type: 'whatsapp',
            templateType: parts[1] || 'followUpQuote',
            clientName: parts.slice(2).join(' ') || 'Cliente'
        };
    }

    return null;
};

export const generateQuote = (serviceId, clientName) => {
    return generateBudget(serviceId, clientName);
};

export const generateWhatsApp = (templateType, clientName) => {
    return generateWhatsAppMessage(templateType, clientName);
};

export const listAllServices = () => {
    return getAllServices();
};

/**
 * Envía mensajes a la IA con lógica de reintentos y backoff exponencial
 */
export const sendMessageToAI = async (messages, retries = 3, delay = 1000) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
        return {
            error: "API Key de Groq no configurada. Por favor, añade VITE_GROQ_API_KEY a tu archivo .env"
        };
    }

    // Limitar el historial a las últimas 12 interacciones para control de tokens
    const recentMessages = messages.slice(-12);

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(
                GROQ_URL,
                {
                    model: 'llama3-8b-8192',
                    messages: [
                        {
                            role: 'system',
                            content: `Eres el asistente inmobiliario inteligente de Dulce Salas en Baja California Norte. 
Tu tono es profesional, visionario, servicial y experto.
Conoces a fondo el mercado de Tijuana, Rosarito, Ensenada (Valle de Guadalupe) y Tecate.

REGLAS CRÍTICAS:
1. Sé EXTREMADAMENTE CONCISO. Máximo 2-3 oraciones por respuesta.
2. Haz UNA SOLA pregunta clara a la vez.
3. No abrumes con párrafos largos ni múltiples preguntas.

Tu objetivo principal es ayudar al usuario y, si detectas interés serio, proponer una cita.
Cuando un usuario pida una cita, asegúrate de obtener: Nombre, Zona de interés y un medio de contacto (WhatsApp o Correo).
Habla siempre en español con elegancia.`
                        },
                        ...recentMessages
                    ],
                    max_tokens: 400,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 20000 // 20 segundos de timeout
                }
            );

            return response.data.choices[0].message;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            const isRateLimit = error.response?.status === 429;
            const isServerError = error.response?.status >= 500;
            const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');

            // Si es el último intento o un error fatal (401, 403, etc)
            if (attempt === retries || (error.response?.status < 500 && !isRateLimit && !isTimeout)) {
                if (isRateLimit) {
                    return {
                        role: 'assistant',
                        content: 'Estoy recibiendo muchas consultas. Por favor, espera un minuto e intenta de nuevo.',
                        isError: true
                    };
                }
                throw error;
            }

            // Esperar con backoff exponencial
            const waitTime = delay * Math.pow(2, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
};
