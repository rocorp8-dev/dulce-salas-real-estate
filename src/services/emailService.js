import emailjs from '@emailjs/browser';

// Nota: Estos IDs normalmente se obtienen de EmailJS (https://www.emailjs.com/)
// Dulce, para que funcione 100%, necesitarás crear una cuenta gratuita en EmailJS
// y reemplazar estos marcadores con tus propios IDs.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_dulce_salas';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_lead';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

export const sendLeadNotification = async (leadData) => {
    try {
        const templateParams = {
            to_email: 'encantodelvalle0@gmail.com',
            from_name: leadData.name || 'Cliente Potencial',
            message: `Cita solicitada por: ${leadData.name}\nInterés: ${leadData.context}\nContacto: ${leadData.contact}\nFecha sugerida: ${leadData.date || 'Por definir'}`,
            subject: `Nueva Cita Dulce Salas - ${leadData.name}`
        };

        // Por ahora logeamos para verificar, pero intentamos enviar
        console.log('Enviando lead a Dulce Salas:', templateParams);

        if (PUBLIC_KEY !== 'your_public_key') {
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            return result;
        } else {
            console.warn('EmailJS no configurado con Public Key real. Saltando envío real.');
            return { status: 'skipped', message: 'Configuración pendiente' };
        }
    } catch (error) {
        console.error('Error enviando correo:', error);
        throw error;
    }
};
