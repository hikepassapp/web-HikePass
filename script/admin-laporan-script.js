let originalData = JSON.parse(localStorage.getItem("laporanHikepass")) || [];

function loadLaporan(data = originalData) {
    const laporanContainer = document.getElementById("laporanContainer");

    if (data.length === 0) {
        laporanContainer.innerHTML = `
            <p style="text-align:center; padding:20px;">Tidak ada data ditemukan.</p>
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

function hapusLaporan(id) {
    originalData = originalData.filter(l => l.id !== id);
    localStorage.setItem("laporanHikepass", JSON.stringify(originalData));
    applyFilter();
}

document.getElementById("btnRefresh").addEventListener("click", () => location.reload());

// ✅ Search & Filter
function applyFilter() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const kategori = document.getElementById("filterKategori").value;
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    const filtered = originalData.filter(item => {
        const matchKeyword =
            item.nama.toLowerCase().includes(keyword) ||
            item.email.toLowerCase().includes(keyword) ||
            item.lokasi.toLowerCase().includes(keyword) ||
            item.kategori.toLowerCase().includes(keyword);

        const matchKategori = kategori ? item.kategori === kategori : true;

        const itemDate = new Date(item.tanggal);
        const matchDate =
            (!start || itemDate >= new Date(start)) &&
            (!end || itemDate <= new Date(end));

        return matchKeyword && matchKategori && matchDate;
    });

    loadLaporan(filtered);
}

// Event Listener Filters
document.getElementById("searchInput").addEventListener("input", applyFilter);
document.getElementById("filterKategori").addEventListener("change", applyFilter);
document.getElementById("startDate").addEventListener("change", applyFilter);
document.getElementById("endDate").addEventListener("change", applyFilter);

document.getElementById("resetFilter").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("filterKategori").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    loadLaporan();
});

// Load data awal
loadLaporan();
