const webPush = require('web-push');

// Configura las claves VAPID (usa las claves que generaste)
const vapidKeys = {
    publicKey: 'BORtmy4HS5Ge_XRfgj0DR_NHfRQvsnLx3AWN6627T9qiYqqN_mWOSoOPHXoO7pygPKbgF5htQCxtTb7iEGRm-Tg',  // Reemplaza con tu clave pública VAPID
    privateKey: 'OQ0TondgGU3JR1iEM3mUFBBsd0WypDwccAnkAGfLMq4'  // Reemplaza con tu clave privada VAPID
};

webPush.setVapidDetails(
    'mailto:hackathon2024.1@gmail.com', // Cambia esto a tu correo de contacto
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { subscription, title, message } = req.body;

    const payload = JSON.stringify({
        title: title || 'Notificación',
        body: message || 'Tienes una nueva notificación'
    });

    try {
        await webPush.sendNotification(subscription, payload);
        res.status(200).json({ success: true, message: 'Notificación enviada' });
    } catch (error) {
        console.error('Error enviando notificación:', error);
        res.status(500).json({ success: false, error: 'Error enviando notificación' });
    }
};
