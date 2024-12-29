let tempStart = 45;
let humidityStart = 45;
let ppmStart = 45;

let tempMax = 80;
let humidityMax = 80;
let ppmMax = 80;

function handleDataChange(mqttData) {
    const tempValue = document.getElementById('temperature-value');
    const tempType = document.getElementById('temperature-type');
    const humidityValue = document.getElementById('humidity-value');
    const humidityType = document.getElementById('humidity-type');
    const ppmValue = document.getElementById('ppm-value');
    const tempValueTable = document.getElementById('temperature-value-table');
    const humidityValueTable = document.getElementById('humidity-value-table');
    const ppmValueTable = document.getElementById('ppm-value-table');
    const ppmTypeValueTable = document.getElementById('ppm-type-value-table');

    const quality_theme = (!mqttData.prob_ppm) ? 'success' : 'danger';
    const quality_content = (!mqttData.prob_ppm) ? 'Mati' : 'Menyala';

    tempValue.textContent = "";
    tempType.textContent = "";
    humidityValue.textContent = "";
    humidityType.textContent = "";
    ppmValue.textContent = "";
    // ppmType.textContent = "";

    humidityValueTable.textContent = "";
    tempValueTable.textContent = "";
    ppmValueTable.textContent = "";
    ppmTypeValueTable.textContent = "";

    tempValue.textContent = `${mqttData.suhu}°`;
    humidityValue.textContent = mqttData.kelembapan;
    ppmValue.textContent = mqttData.ppm;
    tempType.textContent = (mqttData.prob_suhu) ? "Baik" : "Tidak Baik";
    humidityType.textContent = (mqttData.prob_kelembapan) ? "Baik" : "Tidak Baik";

    tempValueTable.textContent = `${mqttData.suhu}°`;
    humidityValueTable.textContent = mqttData.kelembapan;
    ppmValueTable.textContent = mqttData.ppm;
    ppmTypeValueTable.innerHTML = `<span class="badge bg-${quality_theme}">${quality_content}</span>`;

    tempDeg = 45 + (mqttData.suhu / tempMax * 180);
    humidityDeg = 45 + (mqttData.kelembapan / humidityMax * 180);
    ppmDeg = 45 + (mqttData.ppm / ppmMax * 180);

    animateCircles(
        data = [
            {
                'element': 'temp-visual',
                'deg': tempDeg,
                'max': 50,
                'deg_start': tempStart
            },
            {
                'element': 'humidity-visual',
                'deg': humidityDeg,
                'max': 50,
                'deg_start': humidityStart
            },
            {
                'element': 'ppm-visual',
                'deg': ppmDeg,
                'max': 50,
                'deg_start': ppmStart
            }
        ]
    );

    tempStart = tempDeg;
    humidityStart = humidityDeg;
    ppmStart = ppmDeg;
}

fetch('/api/history/latest', {
    method: 'GET',
    credentials: 'include'
})
    .then(response => response.json())
    .then(data => {
        handleDataChange(data.data[0]);
    })
    .catch(error => {
        console.error('Error:', error);
    });

const ws = new WebSocket('ws://localhost:3000');
ws.onmessage = (event) => {
    console.log("data diterima!");

    const topic = JSON.parse(event.data).topic;
    const mqttData = JSON.parse(event.data).data;

    handleDataChange(mqttData);
}

function animateCircles(data) {

    data.forEach(elem => {
        let visual = document.getElementById(elem.element);
        let animation = visual.animate(
            [
                { transform: `rotate(${elem.deg_start}deg)` },
                { transform: `rotate(${elem.deg}deg)` }
            ], {
            duration: 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        animation.onfinish = () => {
            visual.style.transform = `rotate(${elem.deg}deg)`;
            animation.cancel();
        };

    });
}