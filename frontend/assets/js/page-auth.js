// fetch('/auth', {
//     method: 'GET',
//     credentials: 'include'
// })
//     .then(response => response.json())
//     .then(data => {
//         if (!data.isAuthenticated) {
//             window.location.href = '/login';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         window.location.href = '/login';
//     });

document.getElementById("logoutForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const response = await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.status === 200) {
            window.location.href = "/login"; // Redirect ke halaman indeks
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Terjadi kesalahan pada server.");
    }
});