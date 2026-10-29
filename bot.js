const net = require('net');

const HOST = 'Losantipala3000.aternos.me';
const PORT = 25839;

function mantenerConexion() {
    console.log('[TCP] Conectando al servidor...');
    const client = new net.Socket();

    client.connect(PORT, HOST, () => {
        console.log('[TCP] ¡Conexión establecida! Manteniendo el puerto vivo...');
        
        // Manda un ping falso cada 20 segundos para que Aternos no crea que hay inactividad
        setInterval(() => {
            client.write(Buffer.from([0x00])); 
        }, 20000);
    });

    client.on('close', () => {
        console.log('[TCP] Conexión cerrada. Reconectando en 5 segundos...');
        setTimeout(mantenerConexion, 5000);
    });

    client.on('error', (err) => {
        console.log('[TCP] Error:', err.message);
        client.destroy();
    });
}

mantenerConexion();
