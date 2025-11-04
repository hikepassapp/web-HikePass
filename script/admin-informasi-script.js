let informasi = JSON.parse(localStorage.getItem("infoHikepass")) || [];

const modal = document.getElementById("modalInfo");
const btnOpen = document.getElementById("btnAddInfo");
const btnClose = document.getElementById("closeModalInfo");
const form = document.getElementById("infoForm");

btnOpen.addEventListener("click", () => {
    document.getElementById("modalTitle").innerText = "Tambah Informasi";
    form.reset();
    document.getElementById("infoId").value = "";
    modal.style.display = "block";
});

btnClose.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

form.addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        id: document.getElementById("infoId").value || Date.now(),
        judul: document.getElementById("infoJudul").value,
        deskripsi: document.getElementById("infoDeskripsi").value,
        gambar: document.getElementById("infoGambar").value
    };

    if (document.getElementById("infoId").value) {
        informasi = informasi.map(item => item.id == data.id ? data : item);
    } else {
        informasi.push(data);
    }

    localStorage.setItem("infoHikepass", JSON.stringify(informasi));
    modal.style.display = "none";
    renderInformasi();
});

function renderInformasi() {
    const container = document.getElementById("infoContainer");
    container.innerHTML = "";

    informasi.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("info-card");

        card.innerHTML = `
            <img src="${item.gambar}">
            <h4>${item.judul}</h4>
            <p>${item.deskripsi}</p>
            <div class="card-actions">
                <button class="btn-edit" onclick="editInfo(${item.id})">Edit</button>
                <button class="btn-delete" onclick="hapusInfo(${item.id})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function editInfo(id) {
    const data = informasi.find(i => i.id == id);
    document.getElementById("modalTitle").innerText = "Edit Informasi";
    modal.style.display = "block";

    document.getElementById("infoId").value = data.id;
    document.getElementById("infoJudul").value = data.judul;
    document.getElementById("infoDeskripsi").value = data.deskripsi;
    document.getElementById("infoGambar").value = data.gambar;
}

function hapusInfo(id) {
    if (!confirm("Hapus informasi ini?")) return;
    informasi = informasi.filter(i => i.id != id);
    localStorage.setItem("infoHikepass", JSON.stringify(informasi));
    renderInformasi();
}

renderInformasi();
