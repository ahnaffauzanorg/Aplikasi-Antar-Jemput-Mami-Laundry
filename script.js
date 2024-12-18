const map = L.map('map').setView([-5.168855, 119.448868], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

map.on('click', function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const popupContent = `
        <form id="popupForm">
            <label>Nama: <input type="text" id="name" required></label><br>
            <label>WhatsApp: <input type="text" id="whatsapp" required></label><br>
            <button type="submit">Kirim</button>
        </form>
    `;

    L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);

    document.getElementById('popupForm').onsubmit = function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const whatsapp = document.getElementById('whatsapp').value;

        fetch('submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&whatsapp=${encodeURIComponent(whatsapp)}&lat=${lat}&lng=${lng}`,
        })
            .then(response => response.text())
            .then(data => alert('Data berhasil dikirim!'))
            .catch(error => console.error('Error:', error));
    };
});
