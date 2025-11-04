let paket = JSON.parse(localStorage.getItem("paketHikepass")) || [];

const modal = document.getElementById("modalPaket");
const btnOpen = document.getElementById("btnAddPaket");
const btnClose = document.getElementById("closeModalPaket");
const form = document.getElementById("paketForm");

// ✅ Open Modal
btnOpen.addEventListener("click", () => {
    document.getElementById("modalTitlePaket").innerText = "Tambah Paket Wisata";
    form.reset();
    document.getElementById("paketId").value = "";
    modal.style.display = "block";
});

// ✅ Close Modal
btnClose.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// ✅ Submit Form
form.addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        id: document.getElementById("paketId").value || Date.now(),
        judul: document.getElementById("paketJudul").value,
        jenis: document.getElementById("paketJenis").value,
        tanggal: document.getElementById("paketTanggal").value,
        biaya: document.getElementById("paketBiaya").value,
        titik: document.getElementById("paketTitik").value,
        jam: document.getElementById("paketJam").value,
        wa: document.getElementById("paketWa").value,
        deskripsi: document.getElementById("paketDeskripsi").value
    };

    if (document.getElementById("paketId").value) {
        paket = paket.map(item => item.id == data.id ? data : item);
    } else {
        paket.push(data);
    }

    localStorage.setItem("paketHikepass", JSON.stringify(paket));
    modal.style.display = "none";
    renderPaket();
});

// ✅ Render Data Cards
function renderPaket() {
    const container = document.getElementById("paketContainer");
    container.innerHTML = "";

    paket.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("info-card"); // pakai style card yg sama biar konsisten

        card.innerHTML = `
            <h4>${item.judul}</h4>
            <p><b>Jenis:</b> ${item.jenis}</p>
            <p><b>Tanggal:</b> ${item.tanggal}</p>
            <p><b>Biaya:</b> Rp ${item.biaya}</p>
            <p><b>Titik Kumpul:</b> ${item.titik}</p>
            <p><b>Jam:</b> ${item.jam}</p>
            <p><b>WA:</b> ${item.wa}</p>
            <p>${item.deskripsi}</p>

            <div class="card-actions">
                <button class="btn-edit" onclick="editPaket(${item.id})">Edit</button>
                <button class="btn-delete" onclick="hapusPaket(${item.id})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// ✅ Edit Data
function editPaket(id) {
    const data = paket.find(i => i.id == id);

    document.getElementById("modalTitlePaket").innerText = "Edit Paket Wisata";
    modal.style.display = "block";

    document.getElementById("paketId").value = data.id;
    document.getElementById("paketJudul").value = data.judul;
    document.getElementById("paketJenis").value = data.jenis;
    document.getElementById("paketTanggal").value = data.tanggal;
    document.getElementById("paketBiaya").value = data.biaya;
    document.getElementById("paketTitik").value = data.titik;
    document.getElementById("paketJam").value = data.jam;
    document.getElementById("paketWa").value = data.wa;
    document.getElementById("paketDeskripsi").value = data.deskripsi;
}

// ✅ Hapus Data
function hapusPaket(id) {
    if (!confirm("Hapus paket wisata ini?")) return;
    paket = paket.filter(i => i.id != id);
    localStorage.setItem("paketHikepass", JSON.stringify(paket));
    renderPaket();
}

// ✅ Load First Time
renderPaket();
