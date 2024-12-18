<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "laundry_db";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$name = $_POST['name'];
$whatsapp = $_POST['whatsapp'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];

// Konversi nomor WhatsApp: jika dimulai dengan '0', ubah menjadi '62'
if (preg_match('/^0/', $whatsapp)) {
    $whatsapp = preg_replace('/^0/', '62', $whatsapp);
}

$stmt = $conn->prepare("INSERT INTO customers (name, whatsapp, latitude, longitude) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssdd", $name, $whatsapp, $lat, $lng);

if ($stmt->execute()) {
    echo "Data berhasil disimpan!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
