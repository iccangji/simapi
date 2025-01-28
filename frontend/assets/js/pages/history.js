const handleDataTable = (data) => {
    const dataElem = document.getElementById('data-table');
    const tableBody = dataElem.querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement("tr");
        const dateData = `${(new Date(row.timestamp)).toString().split(' ')[1]}-${(new Date(row.timestamp)).toString().split(' ')[2]}-${(new Date(row.timestamp)).toString().split(' ')[3]}`;
        const timeData = (new Date(row.timestamp)).toString().split(' ')[4];

        tr.innerHTML = `
                <th scope="row">${dateData}</td>
                <td>${row.suhu}</td>
                <td>${row.kelembapan}</td>
                <td>${row.ppm}</td>
                <td>${timeData}</td>
                <td>${(!row.prob_ikan) ? "Kering" : "Basah"}</td>
                <td>${(!row.prob_ppm) ? "Mati" : "Menyala"}</td>
            `;
        tableBody.appendChild(tr);
    });
}

fetch('/api/history', {
    method: 'GET',
    credentials: 'include'
})
    .then(response => response.json())
    .then(data => {
        handleDataTable(data.data);

    })
    .catch(error => {
        console.error('Error:', error);
    });


const weekSelect = document.getElementById("week-select");
Array.from(weekSelect.options).forEach(option => {
    option.disabled = true;
});

const handleMonthChange = () => {
    Array.from(weekSelect.options).forEach(option => {
        option.disabled = false;
    });
}

document.getElementById("month-select").setAttribute("onchange", "handleMonthChange()");

document.getElementById("form-search").addEventListener("submit", async function (event) {
    event.preventDefault();

    const month = document.getElementById("month-select").value;
    const week = document.getElementById("week-select").value;
    const date = document.getElementById("datePicker").value;
    try {
        const response = await fetch(`/api/history?month=${month}&week=${week}&date=${date}`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        handleDataTable(data.data);
    } catch (error) {
        console.error('Error:', error);
    }
});