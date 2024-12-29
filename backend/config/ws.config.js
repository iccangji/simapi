const WebSocket = require('ws');
const setupWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });
    const broadcastMqttData = (topic, data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ topic: topic, data: data }));
            }
        });
    };

    return { broadcastMqttData };
};

module.exports = { setupWebSocketServer };
