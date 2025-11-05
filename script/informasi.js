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
  }
];

function renderGunungs(data) {
  const container = document.getElementById('gununglList');
  if (!container) return;
  
  container.innerHTML = data.map(g => `
    <div class="gunung-card">
      <img src="${g.image}" alt="${g.nama}" onerror="this.src='assets/placeholder.jpg'" />
      <div class="card-info">
        <div class="info-row">
          <span class="info-label">📋 Peraturan</span>
          <span class="info-text">${g.peraturan}</span>
        </div>
        <div class="info-row">
          <span class="info-label">💡 Tips Mendaki</span>
          <span class="info-text">${g.tips}</span>
        </div>
        <div class="info-row">
          <span class="info-label">ℹ️ Info Umum</span>
          <span class="info-text">${g.umum}</span>
        </div>
      </div>
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
function editGunung(id) {
  const gunung = gunungs.find(g => g.id === id);
  if (!gunung) return;
  openModal();
  setTimeout(() => {
    const modalTitle = document.querySelector('#modalOverlay h2');
    if (modalTitle) {
      modalTitle.textContent = 'Edit Data Informasi Gunung';
    }
    document.getElementById('namaGunung').value = gunung.nama;
    document.getElementById('deskripsiPeraturan').value = gunung.peraturan;
    document.getElementById('deskripsiTips').value = gunung.tips;
    document.getElementById('deskripsiUmum').value = gunung.umum;
    const preview = document.getElementById('imagePreview');
    if (preview && gunung.image) {
      preview.innerHTML = `<img src="${gunung.image}" style="max-width: 100%; max-height: 200px; margin-top: 10px; border-radius: 8px;" />`;
    }
    const submitBtn = document.querySelector('#formTambahGunung button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Simpan Perubahan';
      submitBtn.onclick = (e) => handleEditSubmit(e, id);
    }
  }, 100);
}

function handleEditSubmit(event, id) {
  event.preventDefault();
  
  const index = gunungs.findIndex(g => g.id === id);
  if (index === -1) return;
  
  const imageFile = document.getElementById('imageGunung').files[0];
  const newImage = imageFile ? URL.createObjectURL(imageFile) : gunungs[index].image;
  
  gunungs[index] = {
    id: id,
    nama: document.getElementById('namaGunung').value,
    peraturan: document.getElementById('deskripsiPeraturan').value,
    tips: document.getElementById('deskripsiTips').value,
    umum: document.getElementById('deskripsiUmum').value,
    image: newImage
  };
  
  renderGunungs(gunungs);
  closeModal();
  const submitBtn = document.querySelector('#formTambahGunung button[type="submit"]');
  if (submitBtn) {
    submitBtn.textContent = 'Tambah Gunung';
    submitBtn.onclick = null;
  }
}

function hapusGunung(id) {
  const gunung = gunungs.find(g => g.id === id);
  if (!gunung) return;
  
  if (confirm(`Yakin ingin menghapus "${gunung.nama}"?`)) {
    gunungs.splice(gunungs.findIndex(g => g.id === id), 1);
    renderGunungs(gunungs);
  }
}

function createModal() {
  fetch('modal-gunung.html')
    .then(response => response.text())
    .then(html => {
      const modal = document.createElement('div');
      modal.id = 'modalOverlay';
      modal.className = 'modal-overlay';
      modal.innerHTML = html;
      
      document.body.appendChild(modal);
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
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
    
    const modalTitle = document.querySelector('#modalOverlay h2');
    if (modalTitle) {
      modalTitle.textContent = 'Tambah Data Informasi Gunung';
    }
    
    const submitBtn = document.querySelector('#formTambahGunung button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Tambah Gunung';
      submitBtn.onclick = null;
    }
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
}

function initInformasi() {
  renderGunungs(gunungs);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const filtered = gunungs.filter(g => 
        g.nama.toLowerCase().includes(e.target.value.toLowerCase())
      );
      renderGunungs(filtered);
    });
  }
  
  const btnTambah = document.getElementById('btnTambah');
  if (btnTambah) {
    btnTambah.addEventListener('click', openModal);
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInformasi);
} else {
  initInformasi();
}