let cardCounter = 4;
let editMode = false;
let editCardId = null;
let deleteCardId = null;

document.getElementById('tambahBtn').addEventListener('click', function() {
    editMode = false;
    editCardId = null;
    document.getElementById('modalTitle').textContent = 'Tambah Paket Wisata';
    document.getElementById('modalTambah').classList.add('active');
});

function tutupModal() {
    document.getElementById('modalTambah').classList.remove('active');
    document.getElementById('formTambah').reset();
    editMode = false;
    editCardId = null;
}

function tutupKonfirmasi() {
    document.getElementById('modalKonfirmasi').classList.remove('active');
    deleteCardId = null;
}

document.getElementById('modalTambah').addEventListener('click', function(e) {
    if (e.target === this) {
        tutupModal();
    }
});

document.getElementById('modalKonfirmasi').addEventListener('click', function(e) {
    if (e.target === this) {
        tutupKonfirmasi();
    }
});

document.getElementById('formTambah').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const namaGunung = document.getElementById('namaGunung').value;
    const alamatGunung = document.getElementById('alamatGunung').value;
    const elevasiGunung = document.getElementById('elevasiGunung').value;
    const durasiPendakian = document.getElementById('durasiPendakian').value;
    const jarakPendakian = document.getElementById('jarakPendakian').value;
    const pemandangan = document.getElementById('pemandangan').value;
    const levelPendaki = document.getElementById('levelPendaki').value;
    const harga = document.getElementById('harga').value;
    const fileInput = document.getElementById('uploadGambar');
    
    if (editMode) {
        const card = document.getElementById('card' + editCardId);
        let imageSrc = card.querySelector('img').src;
        
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageSrc = e.target.result;
                updateCard(card, imageSrc);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            updateCard(card, imageSrc);
        }
        
        function updateCard(cardElement, imgSrc) {
            cardElement.querySelector('img').src = imgSrc;
            cardElement.querySelector('img').alt = namaGunung;
            cardElement.querySelector('h3').textContent = namaGunung;
            cardElement.querySelector('.lokasi').textContent = alamatGunung;
            
            const infoItems = cardElement.querySelectorAll('.info div span');
            infoItems[0].textContent = elevasiGunung;
            infoItems[1].textContent = jarakPendakian;
            infoItems[2].textContent = durasiPendakian;
            infoItems[3].textContent = pemandangan;
            infoItems[4].textContent = levelPendaki;
            infoItems[5].textContent = harga;
            
            tutupModal();
            alert('Paket wisata berhasil diperbarui');
        }
    } else {
        let imageSrc = 'assets/pengelola/paket-wisata-1.jpg';
        
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageSrc = e.target.result;
                buatCardBaru(imageSrc);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            buatCardBaru(imageSrc);
        }
        
        function buatCardBaru(imgSrc) {
            const cardHTML = `
                <div class="card" id="card${cardCounter}">
                    <img src="${imgSrc}" alt="${namaGunung}">
                    <div class="card-body">
                        <h3>${namaGunung}</h3>
                        <p class="lokasi">${alamatGunung}</p>
                        
                        <div class="info">
                            <div>
                                <img src="assets/pengelola/tinggi.png" alt="Tinggi">
                                <span>${elevasiGunung}</span>
                            </div>
                            <div>
                                <img src="assets/pengelola/jarak-pos.png" alt="Jarak">
                                <span>${jarakPendakian}</span>
                            </div>
                            <div>
                                <img src="assets/pengelola/durasi.png" alt="Durasi">
                                <span>${durasiPendakian}</span>
                            </div>
                            <div>
                                <img src="assets/pengelola/wisata.png" alt="Wisata">
                                <span>${pemandangan}</span>
                            </div>
                            <div>
                                <img src="assets/pengelola/level.png" alt="Level">
                                <span>${levelPendaki}</span>
                            </div>
                            <div>
                                <img src="assets/pengelola/harga.png" alt="Harga">
                                <span>${harga}</span>
                            </div>
                        </div>

                        <div class="actions">
                            <button class="edit" onclick="editCard(${cardCounter})">
                                <img src="assets/pengelola/edit.png" alt="Edit">
                                <span>Edit</span>
                            </button>
                            <button class="hapus" onclick="hapusCard(${cardCounter})">
                                <img src="assets/pengelola/hapus.png" alt="Hapus">
                                <span>Hapus</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.querySelector('.cards .container').insertAdjacentHTML('beforeend', cardHTML);
            cardCounter++;
            tutupModal();
            alert('Paket wisata berhasil ditambahkan');
        }
    }
});

function editCard(cardNumber) {
    editMode = true;
    editCardId = cardNumber;
    
    const card = document.getElementById('card' + cardNumber);
    const namaGunung = card.querySelector('h3').textContent;
    const alamatGunung = card.querySelector('.lokasi').textContent;
    const infoItems = card.querySelectorAll('.info div span');
    
    document.getElementById('namaGunung').value = namaGunung;
    document.getElementById('alamatGunung').value = alamatGunung;
    document.getElementById('elevasiGunung').value = infoItems[0].textContent;
    document.getElementById('jarakPendakian').value = infoItems[1].textContent;
    document.getElementById('durasiPendakian').value = infoItems[2].textContent;
    document.getElementById('pemandangan').value = infoItems[3].textContent;
    document.getElementById('levelPendaki').value = infoItems[4].textContent;
    document.getElementById('harga').value = infoItems[5].textContent;
    
    document.getElementById('modalTitle').textContent = 'Edit Paket Wisata';
    document.getElementById('modalTambah').classList.add('active');
}

function hapusCard(cardNumber) {
    deleteCardId = cardNumber;
    document.getElementById('modalKonfirmasi').classList.add('active');
}

function konfirmasiHapus() {
    if (deleteCardId) {
        const card = document.getElementById('card' + deleteCardId);
        tutupKonfirmasi();
        setTimeout(function() {
            card.remove();
            alert('Paket wisata berhasil dihapus');
            deleteCardId = null;
        }, 300);
    }
}