import axios from 'axios';

// Nota: El usuario debe proporcionar la API Key en un archivo .env
// OPENROUTER_API_KEY=your_key_here

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const sendMessageToAI = async (messages) => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        return {
            error: "API Key de OpenRouter no configurada. Por favor, añade VITE_OPENROUTER_API_KEY a tu archivo .env"
        };
    }

    try {
        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: 'google/gemini-2.0-flash-001', // Usando Gemini 2.0 Flash como se pidió
                messages: [
                    {
                        role: 'system',
                        content: `Eres el asistente inmobiliario inteligente de Dulce Salas en Baja California Norte. 
            Tu tono es profesional, visionario, servicial y experto.
            Conoces a fondo el mercado de Tijuana, Rosarito, Ensenada (Valle de Guadalupe) y Tecate.
            REGLA CRÍTICA: Sé extremadamente conciso. Haz una sola pregunta clara a la vez para guiar la conversación de forma natural. 
            No abrumes con párrafos largos ni múltiples preguntas.
            Tu objetivo principal es ayudar al usuario y, si detectas interés serio, proponer una cita. 
            Cuando un usuario pida una cita, asegúrate de obtener: Nombre, Zona de interés y un medio de contacto (WhatsApp o Correo).
            Habla siempre en español con elegancia.`
                    },
                    ...messages
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin || 'https://enchanting-kleicha-4fccf9.netlify.app',
                    'X-Title': 'Dulce Salas Real Estate App',
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message;
    } catch (error) {
        console.error('Error calling OpenRouter:', error);
        throw error;
    }
};
