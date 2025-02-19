const mqtt = require('mqtt');
const { asyncHandler } = require('../middlewares/asyncHandler');
const historyController = require('../controllers/history.controller');

const setupMqttClient = (brokerUrl, topic, callback) => {
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT Broker');
        mqttClient.subscribe(topic, (err) => {
            if (err) {
                console.error('Failed to subscribe to topic', topic);
            }
        });
    });

    mqttClient.on('message', (topic, message) => {
        try {
            const mqttData = JSON.parse(message.toString());
            console.log('MQTT data has received!');
            callback(topic, mqttData);
            asyncHandler(
                historyController.create(mqttData.suhu, mqttData.kelembapan, mqttData.ppm, mqttData.prob_suhu, mqttData.prob_kelembapan, mqttData.prob_ikan, mqttData.prob_ppm)
            );

            console.log('MQTT data has saved!');
        } catch (err) {
            console.error('Error parsing MQTT message:', err.message);
        }
    });

    return mqttClient;
};

// const publishMqttClient = (brokerUrl, topic, message) => {
//     const mqttClient = mqtt.connect(brokerUrl);
//     try {
//         mqttClient.publish(topic, JSON.stringify(message), (err) => {
//             if (err) {
//                 console.log('Error parsing MQTT message:', err.message);
//             }
//             console.log('Order/data has published!');
//         });
//     } catch (err) {
//         console.error('Error parsing MQTT message:', err.message);
//     }
// };

module.exports = { setupMqttClient };
