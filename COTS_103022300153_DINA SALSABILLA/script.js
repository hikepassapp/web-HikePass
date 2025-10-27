// Tombol Paket Wisata
document.getElementById('paketWisataBtn').addEventListener('click', function(e) {
    e.preventDefault();
});

// Tombol Informasi
document.getElementById('informasiBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Informasi segera hadir');
});

// Tombol Profil
document.getElementById('profilBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Profil segera hadir');
});

// Tombol Tambah
document.getElementById('tambahBtn').addEventListener('click', function() {
    alert('Tambah paket wisata segera hadir');
});

// Fungsi Edit
function editCard(cardNumber) {
    alert('Edit paket wisata segera hadir');
}

// Fungsi Hapus
function hapusCard(cardNumber) {
    const card = document.getElementById('card' + cardNumber);
    setTimeout(function() {
        card.remove();
        alert('Paket wisata berhasil dihapus');
    }, 300);
}