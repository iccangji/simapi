document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;

    if (username != "" && password != "") {
        document.getElementsByClassName("btn-login")[0].disabled = true;
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.status === 200) {
                document.getElementsByClassName("alert-message")[0].setAttribute("style", "display: none !important;");
                window.location.href = "/"; // Redirect ke halaman indeks
            } else {
                document.getElementsByClassName("alert-message")[0].textContent = result.message;
                document.getElementsByClassName("alert-message")[0].setAttribute("style", "display: block !important;");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan pada server.");
        }
        document.getElementsByClassName("btn-login")[0].disabled = false;
    }
});