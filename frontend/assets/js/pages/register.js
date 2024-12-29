document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementsByName("username")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;

    if (username != "" && password != "") {
        document.getElementsByClassName("btn-register")[0].disabled = true;
        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();

            if (response.status === 201) {
                document.getElementsByClassName("alert-message")[0].setAttribute("style", "display: none !important;");
                window.location.href = "/login"; // Redirect ke halaman indeks
            } else {
                document.getElementsByClassName("alert-message")[0].textContent = result.message;
                document.getElementsByClassName("alert-message")[0].setAttribute("style", "display: block !important;");
            }
        } catch (err) {
            // console.error("Error:", err);
            alert("Terjadi kesalahan pada server.");
        }
        document.getElementsByClassName("btn-register")[0].disabled = false;
    }
});