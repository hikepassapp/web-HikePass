const gunungs = [
  { 
    id: 1, 
    nama: "Gunung Malabar", 
    image: "assets/iMalabar.png",
    peraturan: "Wajib membawa surat izin...",
    tips: "Bawa air yang cukup...",
    umum: "Ketinggian 2343 mdpl..."
  },
  { 
    id: 2, 
    nama: "Gunung Puntang", 
    image: "assets/iPuntang.png",
    peraturan: "Pendakian dibuka 24 jam...",
    tips: "Trek yang mudah untuk pemula...",
    umum: "Pemandangan kota Bandung..."
  },
  { 
    id: 3, 
    nama: "Gunung Cikuray", 
    image: "assets/iCikuray.png",
    peraturan: "Maksimal 100 pendaki per hari...",
    tips: "Persiapan fisik yang baik...",
    umum: "Gunung favorit di Garut..."
  }
];

// Render gunung cards
function renderGunungs(data) {
  const container = document.getElementById('gununglList');
  if (!container) return;
  
  container.innerHTML = data.map(g => `
    <div class="gunung-card">
      <img src="${g.image}" alt="${g.nama}" onerror="this.src='assets/placeholder.jpg'" />
      <div class="card-content">
        <h3>${g.nama}</h3>
        <div class="card-actions">
          <button class="btn btn-edit" onclick="editGunung(${g.id})">✏️ Edit</button>
          <button class="btn btn-hapus" onclick="hapusGunung(${g.id})">🗑️ Hapus</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Edit gunung
function editGunung(id) {
  const gunung = gunungs.find(g => g.id === id);
  if (gunung) alert(`Edit: ${gunung.nama}`);
}

// Hapus gunung
function hapusGunung(id) {
  const gunung = gunungs.find(g => g.id === id);
  if (!gunung) return;
  
  if (confirm(`Yakin ingin menghapus "${gunung.nama}"?`)) {
    gunungs.splice(gunungs.findIndex(g => g.id === id), 1);
    renderGunungs(gunungs);
  }
}

function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modalOverlay';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <h2>Tambah Data Informasi Gunung</h2>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      
      <form id="formTambahGunung" class="modal-form" onsubmit="handleSubmit(event)">
        <div class="form-group">
          <label>Nama Gunung <span class="required">*</span></label>
          <input type="text" id="namaGunung" placeholder="Contoh: Gunung Semeru" required />
        </div>

        <div class="form-group">
          <label>Deskripsi Peraturan <span class="required">*</span></label>
          <textarea id="deskripsiPeraturan" rows="4" placeholder="Informasi detail tentang peraturan di gunung" required></textarea>
        </div>

        <div class="form-group">
          <label>Deskripsi Tips Pendakian <span class="required">*</span></label>
          <textarea id="deskripsiTips" rows="4" placeholder="Informasi detail tentang tips pendakian di gunung" required></textarea>
        </div>

        <div class="form-group">
          <label>Deskripsi Umum Pendakian <span class="required">*</span></label>
          <textarea id="deskripsiUmum" rows="4" placeholder="Informasi umum pendakian di gunung" required></textarea>
        </div>

        <div class="form-group">
          <label>Upload Gambar Gunung <span class="required">*</span></label>
          <input type="file" id="imageGunung" accept="image/*" required onchange="previewImage(event)" />
          <div id="imagePreview"></div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" onclick="closeModal()">Batal</button>
          <button type="submit" class="btn btn-submit">Simpan Data</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function openModal() {
  let modal = document.getElementById('modalOverlay');
  if (!modal) {
    createModal();
    modal = document.getElementById('modalOverlay');
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modalOverlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('formTambahGunung').reset();
    document.getElementById('imagePreview').innerHTML = '';
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('imagePreview');
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px; margin-top: 10px; border-radius: 8px;" />`;
    };
    reader.readAsDataURL(file);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  
  const formData = {
    id: Date.now(),
    nama: document.getElementById('namaGunung').value,
    peraturan: document.getElementById('deskripsiPeraturan').value,
    tips: document.getElementById('deskripsiTips').value,
    umum: document.getElementById('deskripsiUmum').value,
    image: URL.createObjectURL(document.getElementById('imageGunung').files[0])
  };
  
  gunungs.push(formData);
  renderGunungs(gunungs);
  closeModal();
  
  alert(`✅ Data "${formData.nama}" berhasil ditambahkan!`);
}

// ============ INITIALIZATION ============

function initInformasi() {
  renderGunungs(gunungs);

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const filtered = gunungs.filter(g => 
        g.nama.toLowerCase().includes(e.target.value.toLowerCase())
      );
      renderGunungs(filtered);
    });
  }
  
  // Button tambah
  const btnTambah = document.getElementById('btnTambah');
  if (btnTambah) {
    btnTambah.addEventListener('click', openModal);
  }
  
  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInformasi);
} else {
  initInformasi();
}