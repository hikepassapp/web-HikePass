// script/informasi.js
const gunungs = [
  { id: 1, nama: "Gunung Malabar", image: "assets/iMalabar.png" },
  { id: 2, nama: "Gunung Puntang", image: "assets/iPuntang.png" },
  { id: 3, nama: "Gunung Cikuray", image: "assets/iCikuray.png" }
];

function renderGunungs(data) {
  const container = document.getElementById('gununglList');
  
  if (!container) {
    console.error('Container gununglList tidak ditemukan!');
    return;
  }
  
  if (data.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">Tidak ada data gunung ditemukan.</p>';
    return;
  }
  
  container.innerHTML = data.map(g => `
    <div class="gunung-card">
      <img src="${g.image}" alt="${g.nama}" onerror="this.src='assets/placeholder.jpg'" />
      <div class="card-content">
        <h3>${g.nama}</h3>
        <div class="card-actions">
          <button class="btn btn-edit" onclick="editGunung(${g.id})">
            ✏️ Edit
          </button>
          <button class="btn btn-hapus" onclick="hapusGunung(${g.id})">
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Edit gunung
function editGunung(id) {
  const gunung = gunungs.find(g => g.id === id);
  if (gunung) {
    alert(`Edit: ${gunung.nama}`);
    // Implementasi form edit
  }
}

// Hapus gunung
function hapusGunung(id) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    const index = gunungs.findIndex(g => g.id === id);
    if (index !== -1) {
      gunungs.splice(index, 1);
      renderGunungs(gunungs);
    }
  }
}

// Inisialisasi
function initInformasi() {
  console.log('Inisialisasi halaman informasi...');
  
  // Render data awal
  renderGunungs(gunungs);
  
  // Setup search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = gunungs.filter(g => 
        g.nama.toLowerCase().includes(query)
      );
      renderGunungs(filtered);
    });
    console.log('Search listener terpasang');
  } else {
    console.error('Element searchInput tidak ditemukan!');
  }
  
  // Setup tombol tambah
  const btnTambah = document.getElementById('btnTambah');
  if (btnTambah) {
    btnTambah.addEventListener('click', () => {
      alert('Form tambah data informasi');
      // Implementasi form tambah
    });
    console.log('Button tambah listener terpasang');
  } else {
    console.error('Element btnTambah tidak ditemukan!');
  }
}

// Jalankan setelah DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInformasi);
} else {
  initInformasi();
}