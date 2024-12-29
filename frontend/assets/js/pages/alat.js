const apiUrl = "http://localhost:3000/api/alat";

const dataElement = document.getElementById("data-alat");
async function fetchData() {
    try {
        // Fetch data dari API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        console.log(data.data.length);

        if (data.data.length) {
            dataElement.innerHTML = "";
            data.data.forEach((alat) => {
                console.log(alat);

                const colDiv = document.createElement("div");
                colDiv.classList.add("col-6");

                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "w-100");
                cardDiv.innerHTML = `
                     <div class="card-body d-flex flex-column align-items-center justify-content-center">
                         <h5 class="fw-bolder">${alat.nama}</h5>
                         <img src="./uploads/${alat.path}" class="dashboard-tools" alt="${data.nama}">
                     </div>
                 `;

                colDiv.appendChild(cardDiv);
                dataElement.appendChild(colDiv);
            });
        } else {
            dataElement.innerHTML = "";
            const heading = document.createElement("h4");
            heading.classList.add("text-center");
            heading.textContent = "Tidak ada alat";

            dataElement.appendChild(heading);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();