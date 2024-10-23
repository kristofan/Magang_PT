<?php
// Konfigurasi koneksi database
$servername = "localhost";
$username = "root";  // Default username untuk XAMPP
$password = "";      // Default password kosong
$dbname = "user_management";  // Nama database yang dibuat di phpMyAdmin

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
