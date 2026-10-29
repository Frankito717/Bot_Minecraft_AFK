const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Losantipala3000.aternos.me',
        port: 25839,
        username: 'ANTIPALABOT',
        version: false, // Dejalo en false para que intente negociar el protocolo crossplay
        skipValidation: true // Saltea validaciones estrictas que rompen con Geyser
    });

    bot.on('spawn', () => {
        console.log('[NPC] El bot apareció correctamente en el mapa.');
    });

    bot.on('end', (reason) => {
        console.log(`[NPC] Desconectado por: ${reason}. Reconectando en 10 segundos...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('[NPC] Error:', err);
    });
}

createBot();
