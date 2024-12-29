const app = require('./app');
const { logger } = require('./utils/logger');
const { setupWebSocketServer } = require('./config/ws.config');
const { setupMqttClient } = require('./config/mqtt.client');

const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, HOSTNAME, () => {
    logger.info(`Running on PORT ${PORT}`);
});

const { broadcastMqttData } = setupWebSocketServer(server);

setupMqttClient('mqtt://localhost', 'alat/data', (topic, data) => {
    broadcastMqttData(topic, data);
});