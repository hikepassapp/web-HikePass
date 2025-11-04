// Ambil data laporan
function loadLaporan() {
    const laporanContainer = document.getElementById("laporanContainer");
    let data = JSON.parse(localStorage.getItem("laporanHikepass")) || [];

    if (data.length === 0) {
        laporanContainer.innerHTML = `
            <p style="text-align:center; padding:20px;">Belum ada laporan masuk.</p>
        `;
        return;
    }

    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Tanggal</th>
                    <th>Kategori</th>
                    <th>Lokasi</th>
                    <th>Deskripsi</th>
                    <th>Foto</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.email}</td>
                <td>${item.tanggal}</td>
                <td>${item.kategori}</td>
                <td>${item.lokasi}</td>
                <td>${item.deskripsi}</td>
                <td>${item.foto ? `<img src="uploads/${item.foto}" width="60">` : "-"}</td>
                <td>
                    <button onclick="hapusLaporan(${item.id})" class="btn-delete">Hapus</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    laporanContainer.innerHTML = html;
}

// Hapus laporan
function hapusLaporan(id) {
    let data = JSON.parse(localStorage.getItem("laporanHikepass")) || [];
    let newData = data.filter(l => l.id !== id);

    localStorage.setItem("laporanHikepass", JSON.stringify(newData));
    loadLaporan();
}

// Tombol Refresh
document.getElementById("btnRefresh").addEventListener("click", () => location.reload());

// Load pertama kali
loadLaporan();
