// Base de Conocimientos para la IA de D9 Marketing
// Este archivo contiene toda la información que la IA necesita para funcionar como Secretaria Ejecutiva

// ============================================
// CATÁLOGO DE SERVICIOS
// ============================================
// NOTA: Estos son valores de ejemplo. Actualizar con precios reales del PDF.

export const services = {
    metaAds: {
        id: 'metaAds',
        name: 'Meta Ads (Facebook & Instagram)',
        shortName: 'Meta Ads',
        description: 'Gestión completa de campañas publicitarias en Facebook e Instagram. Incluye estrategia, diseño de anuncios, segmentación de audiencia, optimización y reportes mensuales.',
        price: '$800 - $2,500 USD/mes',
        priceBase: 800,
        currency: 'USD',
        billingCycle: 'mensual',
        includes: [
            'Estrategia publicitaria personalizada',
            'Diseño de creatividades (hasta 10 anuncios/mes)',
            'Segmentación avanzada de audiencia',
            'Optimización continua de campañas',
            'Reporte mensual de resultados',
            'Reunión de seguimiento mensual'
        ],
        notIncludes: [
            'Presupuesto publicitario (se paga directo a Meta)',
            'Producción de video profesional',
            'Fotografía de productos'
        ]
    },

    googleAds: {
        id: 'googleAds',
        name: 'Google Ads',
        shortName: 'Google Ads',
        description: 'Campañas de búsqueda, display y remarketing en Google. Ideal para captar clientes con intención de compra activa.',
        price: '$700 - $2,000 USD/mes',
        priceBase: 700,
        currency: 'USD',
        billingCycle: 'mensual',
        includes: [
            'Investigación de palabras clave',
            'Configuración de campañas',
            'Optimización de pujas',
            'Extensiones de anuncios',
            'Reporte mensual de conversiones'
        ]
    },

    consultoria: {
        id: 'consultoria',
        name: 'Consultoría de Marketing Digital',
        shortName: 'Consultoría',
        description: 'Asesoría estratégica personalizada para tu negocio. Análisis de mercado, competencia, definición de estrategia y plan de acción.',
        price: '$150 - $300 USD/hora',
        priceBase: 150,
        currency: 'USD',
        billingCycle: 'por hora',
        includes: [
            'Análisis de situación actual',
            'Auditoría de marketing digital',
            'Plan estratégico personalizado',
            'Recomendaciones accionables',
            'Seguimiento post-consultoría (30 días)'
        ]
    },

    seo: {
        id: 'seo',
        name: 'SEO (Posicionamiento Orgánico)',
        shortName: 'SEO',
        description: 'Optimización para motores de búsqueda. Mejora tu posicionamiento en Google de forma orgánica y sostenible.',
        price: '$600 - $1,800 USD/mes',
        priceBase: 600,
        currency: 'USD',
        billingCycle: 'mensual',
        includes: [
            'Auditoría SEO inicial',
            'Investigación de palabras clave',
            'Optimización on-page',
            'Link building',
            'Reporte mensual de rankings'
        ]
    },

    socialMedia: {
        id: 'socialMedia',
        name: 'Gestión de Redes Sociales',
        shortName: 'Redes Sociales',
        description: 'Administración completa de tus perfiles en redes sociales. Contenido, diseño, programación y community management.',
        price: '$500 - $1,500 USD/mes',
        priceBase: 500,
        currency: 'USD',
        billingCycle: 'mensual',
        includes: [
            'Calendario de contenidos mensual',
            'Diseño de publicaciones (hasta 20/mes)',
            'Programación de posts',
            'Respuesta a comentarios y mensajes',
            'Reporte de métricas mensual'
        ]
    },

    webDesign: {
        id: 'webDesign',
        name: 'Diseño y Desarrollo Web',
        shortName: 'Diseño Web',
        description: 'Creación de sitios web profesionales, responsivos y optimizados para conversión.',
        price: '$1,500 - $5,000 USD',
        priceBase: 1500,
        currency: 'USD',
        billingCycle: 'proyecto único',
        includes: [
            'Diseño personalizado',
            'Desarrollo responsive',
            'Optimización SEO básica',
            'Integración con Google Analytics',
            'Capacitación para administración',
            '3 meses de soporte técnico'
        ]
    },

    emailMarketing: {
        id: 'emailMarketing',
        name: 'Email Marketing',
        shortName: 'Email Marketing',
        description: 'Campañas de email marketing para nutrir leads y aumentar ventas. Diseño, automatización y análisis.',
        price: '$400 - $1,200 USD/mes',
        priceBase: 400,
        currency: 'USD',
        billingCycle: 'mensual',
        includes: [
            'Estrategia de email marketing',
            'Diseño de templates',
            'Configuración de automatizaciones',
            'Segmentación de audiencia',
            'Análisis de métricas'
        ]
    },

    branding: {
        id: 'branding',
        name: 'Branding e Identidad Corporativa',
        shortName: 'Branding',
        description: 'Creación o renovación de identidad de marca. Logo, manual de marca, papelería y activos visuales.',
        price: '$1,000 - $3,500 USD',
        priceBase: 1000,
        currency: 'USD',
        billingCycle: 'proyecto único',
        includes: [
            'Investigación de marca',
            'Diseño de logo (3 propuestas)',
            'Manual de identidad corporativa',
            'Papelería básica',
            'Archivos en todos los formatos'
        ]
    }
}

// ============================================
// PAQUETES Y PROMOCIONES
// ============================================

export const packages = {
    starter: {
        name: 'Paquete Starter',
        description: 'Ideal para negocios que están comenzando en marketing digital',
        services: ['metaAds', 'socialMedia'],
        price: '$1,200 USD/mes',
        discount: '15%',
        savings: '$180 USD/mes'
    },

    growth: {
        name: 'Paquete Growth',
        description: 'Para negocios que buscan escalar sus ventas',
        services: ['metaAds', 'googleAds', 'socialMedia'],
        price: '$2,500 USD/mes',
        discount: '20%',
        savings: '$500 USD/mes'
    },

    premium: {
        name: 'Paquete Premium',
        description: 'Solución completa de marketing digital',
        services: ['metaAds', 'googleAds', 'socialMedia', 'seo', 'emailMarketing'],
        price: '$4,500 USD/mes',
        discount: '25%',
        savings: '$1,500 USD/mes'
    }
}

// ============================================
// TEMPLATES DE PRESUPUESTOS
// ============================================
// Formato basado en las cotizaciones reales de D9 Marketing

export const budgetTemplates = {
    // Template principal que coincide con el formato de D9
    standard: (clientName, items, date = new Date().toLocaleDateString('es-MX')) => {
        const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)

        return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🅳9  D9 MARKETING
    De Todas Formas... Diseño
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRESENTE
${clientName}

Fecha: ${date}

Por medio de la presente envío la cotización que amablemente me fue solicitada:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${items.map(item => `
CANTIDAD: ${item.quantity}
DESCRIPCIÓN: ${item.description}
Precio Unidad: $${item.unitPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
COSTO: $${(item.quantity * item.unitPrice).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOTAL: $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TÉRMINOS Y CONDICIONES:

• La presente cotización tiene vigencia de 15 días hábiles a partir de su fecha de expedición.

• Los costos no incluyen IVA, agregar el 16%.

• Se requiere el 50% de anticipo al momento de aprobar el proyecto y el 50% restante al momento de la entrega.

• Despacho9 no se hace responsable por errores ortográficos o falta de texto.

• Aprobado y aceptado el Diseño Final el Cliente adquiere la propiedad exclusiva del mismo, sin embargo los diseños restantes presentados como alternativas, son propiedad del Despacho.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gracias por su preferencia.

D9 Marketing
`.trim()
    },

    // Template para servicios de marketing digital (formato adaptado)
    metaAds: (clientName, duration = 1, customPrice = null) => {
        const service = services.metaAds
        const price = customPrice || service.priceBase
        const total = price * duration

        const items = [
            {
                quantity: duration,
                description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
                unitPrice: price
            }
        ]

        return budgetTemplates.standard(clientName, items)
    },

    // Template genérico para cualquier servicio
    generic: (clientName, serviceId, duration = 1, customPrice = null) => {
        const service = services[serviceId]
        if (!service) return 'Servicio no encontrado'

        const price = customPrice || service.priceBase
        const total = price * duration

        const items = [
            {
                quantity: duration,
                description: `${service.name}\n${service.description}\n\nIncluye:\n${service.includes.map(i => `• ${i}`).join('\n')}`,
                unitPrice: price
            }
        ]

        return budgetTemplates.standard(clientName, items)
    },

    // Template para paquetes
    package: (clientName, packageId) => {
        const pkg = packages[packageId]
        if (!pkg) return 'Paquete no encontrado'

        const items = pkg.services.map(sId => {
            const service = services[sId]
            return {
                quantity: 1,
                description: `${service.name}\n${service.description}`,
                unitPrice: service.priceBase
            }
        })

        // Agregar descuento como item
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
        const discountAmount = subtotal * (parseInt(pkg.discount) / 100)

        items.push({
            quantity: 1,
            description: `Descuento por Paquete ${pkg.name} (${pkg.discount})`,
            unitPrice: -discountAmount
        })

        return budgetTemplates.standard(clientName, items)
    },

    // Template personalizado (permite agregar items manualmente)
    custom: (clientName, items, date) => {
        return budgetTemplates.standard(clientName, items, date)
    }
}

// ============================================
// TEMPLATES DE MENSAJES WHATSAPP
// ============================================

export const whatsappTemplates = {
    // Seguimiento después de enviar cotización
    followUpQuote: (clientName, service, daysAgo = 2) => {
        return `Hola ${clientName}, ¿cómo estás? 👋

Te escribo para dar seguimiento al presupuesto de *${service}* que te envié hace ${daysAgo} días.

¿Tuviste oportunidad de revisarlo? ¿Tienes alguna duda que pueda resolver?

Estoy aquí para ayudarte en lo que necesites. 😊`
    },

    // Recordatorio de cotización pendiente
    reminderQuote: (clientName, service) => {
        return `Hola ${clientName}, espero que estés muy bien 🌟

Solo quería recordarte que el presupuesto de *${service}* que te envié tiene vigencia de 15 días.

Si te interesa aprovechar esta propuesta, podemos agendar una llamada para resolver cualquier duda y comenzar lo antes posible.

¿Qué te parece si coordinamos una breve llamada esta semana? 📞`
    },

    // Cierre de venta
    closingSale: (clientName, service) => {
        return `¡Excelente decisión, ${clientName}! 🎉

Me da mucho gusto que hayas decidido trabajar con nosotros en *${service}*.

Los próximos pasos son:

1️⃣ Te envío el contrato para firma
2️⃣ Realizas el pago inicial (50%)
3️⃣ Iniciamos el proyecto en 48-72 hrs

¿Te parece bien si te envío el contrato hoy mismo?`
    },

    // Seguimiento post-reunión
    followUpMeeting: (clientName, nextSteps) => {
        return `Hola ${clientName}, fue un placer conversar contigo hoy 😊

Como quedamos, los próximos pasos son:

${nextSteps}

Cualquier duda que tengas, no dudes en escribirme.

¡Estamos emocionados de trabajar contigo! 🚀`
    },

    // Reactivación de cliente inactivo
    reactivation: (clientName, lastService) => {
        return `Hola ${clientName}, ¿cómo has estado? 👋

Ha pasado un tiempo desde que trabajamos juntos en *${lastService}*.

Tenemos nuevos servicios y promociones que podrían interesarte para impulsar tu negocio este año.

¿Te gustaría que agendemos una llamada rápida para platicarte sobre las novedades? ☕`
    },

    // Agradecimiento por referido
    thankYouReferral: (clientName, referredName) => {
        return `¡${clientName}, muchas gracias por recomendarnos! 🙏

${referredName} ya se puso en contacto con nosotros y estamos muy agradecidos por tu confianza.

Como muestra de nuestro agradecimiento, te haremos un descuento especial en tu próxima renovación.

¡Eres increíble! 🌟`
    },

    // Mensaje de bienvenida
    welcome: (clientName) => {
        return `¡Bienvenido a D9 Marketing, ${clientName}! 🎉

Estamos muy emocionados de comenzar a trabajar contigo.

Soy tu contacto directo y estaré disponible para cualquier duda o consulta que tengas durante todo el proceso.

¿Hay algo específico en lo que pueda ayudarte hoy? 😊`
    }
}

// ============================================
// INFORMACIÓN DE LA EMPRESA
// ============================================

export const companyInfo = {
    name: 'D9 Marketing',
    tagline: 'Transformando negocios digitalmente',
    director: 'Director D9',

    contact: {
        email: 'contacto@d9marketing.com', // Actualizar con email real
        phone: '+52 XXX XXX XXXX', // Actualizar con teléfono real
        whatsapp: '+52 XXX XXX XXXX', // Actualizar con WhatsApp real
        website: 'https://cute-strudel-7c76cf.netlify.app'
    },

    workingHours: {
        weekdays: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
        saturday: 'Sábado: 10:00 AM - 2:00 PM',
        sunday: 'Domingo: Cerrado'
    },

    paymentMethods: [
        'Transferencia bancaria',
        'PayPal',
        'Stripe',
        'Tarjeta de crédito/débito'
    ],

    policies: {
        quoteValidity: '15 días',
        paymentTerms: '50% inicial, 50% al finalizar primer mes',
        refundPolicy: 'Reembolso disponible dentro de los primeros 7 días',
        cancellationPolicy: 'Cancelación con 30 días de anticipación'
    }
}

// ============================================
// UTILIDADES
// ============================================

// Obtener lista de todos los servicios
export const getAllServices = () => {
    return Object.values(services)
}

// Obtener servicio por ID
export const getServiceById = (id) => {
    return services[id] || null
}

// Buscar servicios por nombre
export const searchServices = (query) => {
    const lowerQuery = query.toLowerCase()
    return Object.values(services).filter(service =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery)
    )
}

// Formatear lista de servicios para mostrar
export const formatServicesList = () => {
    return Object.values(services).map(service =>
        `• *${service.name}*: ${service.price}`
    ).join('\n')
}

// Generar presupuesto
export const generateBudget = (serviceId, clientName, duration = 1, customPrice = null) => {
    if (budgetTemplates[serviceId]) {
        return budgetTemplates[serviceId](clientName, duration, customPrice)
    }
    return budgetTemplates.generic(clientName, serviceId, duration, customPrice)
}

// Generar mensaje de WhatsApp
export const generateWhatsAppMessage = (templateName, ...args) => {
    if (whatsappTemplates[templateName]) {
        return whatsappTemplates[templateName](...args)
    }
    return 'Template no encontrado'
}
