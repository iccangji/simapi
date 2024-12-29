// Ambil elemen form
const form = document.getElementById('uploadAlat');

// Tangani pengiriman form dengan AJAX
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    const formData = new FormData();
    formData.append('nama', document.getElementsByName("name")[0].value);
    formData.append('file', document.getElementsByName("image")[0].files[0]);

    // Lakukan request POST ke server
    fetch('http://localhost:3000/api/tambah-alat', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            return response.json()
        }) // Mengharapkan respons berupa JSON
        .then(data => {
            if (data.data) {
                window.location.href = '/alat';  // Ganti '/success' dengan URL halaman yang diinginkan
            } else {
                document.getElementById('alert-msg').setAttribute('style', 'display: block !important;');
                document.getElementById('alert-msg').textContent = "Gagal Menambahkan Data";
            }
        })
        .catch(error => {
            // console.error('Error:', error);
            document.getElementById('alert-msg').setAttribute('style', 'display: block !important;');
            document.getElementById('alert-msg').textContent = error;
        });
});