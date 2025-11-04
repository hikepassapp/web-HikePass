// =========================
// MODAL TAMBAH DATA
// =========================
const modalAdd = document.getElementById("modalAdd");
const btnOpenModalAdd = document.getElementById("openModalAdd");
const btnCloseModalAdd = document.getElementById("closeModalAdd");

btnOpenModalAdd.addEventListener("click", () => {
    modalAdd.style.display = "block";
});

btnCloseModalAdd.addEventListener("click", () => {
    modalAdd.style.display = "none";
});

// Tutup modal jika klik di luar box
window.addEventListener("click", (e) => {
    if (e.target === modalAdd) {
        modalAdd.style.display = "none";
    }
});


// ✅ Load data
let dataGunung = JSON.parse(localStorage.getItem("dataGunung")) || [];

const defaultData = {
    nama: "Gunung Malabar",
    harga: "Rp. 15.000",
    jarak: "12 Km, 5 Pos",
    waktu: "2 Jam Estimasi Puncak",
    level: "Pemula",
    fasilitas: "Toilet, Parkir, Warung, Pos Registrasi",
    image: "assets/GunungCikuray.jpg"
};

// jika kosong set default
if (dataGunung.length === 0) {
    dataGunung = Array(4).fill(defaultData);
    localStorage.setItem("dataGunung", JSON.stringify(dataGunung));
}

// Element
const container = document.getElementById("mountainContainer");
const pagination = document.getElementById("pagination");
const showCount = document.getElementById("showCount");
const searchInput = document.getElementById("searchInput");

let currentPage = 1;

function renderCard(data, page = 1) {
    const start = (page - 1) * showCount.value;
    const end = start + Number(showCount.value);
    const sliced = data.slice(start, end);

    container.innerHTML = sliced.map((g, i) => `
        <div class="card">
            <img src="${g.image}" onclick="viewDetail(${start + i})">

            <div class="card-body">
                <h4>${g.nama}</h4>
                <p>HTM: ${g.harga}</p>
                <p>${g.jarak}</p>
                <p>${g.waktu}</p>
                <p>${g.level}</p>
                <small>Include: ${g.fasilitas}</small>

                <div style="margin-top:8px; display:flex; gap:6px;">
                    <button onclick="editGunung(${start + i})" class="btn-sm blue">Edit</button>
                    <button onclick="deleteGunung(${start + i})" class="btn-sm red">Delete</button>
                </div>
            </div>
        </div>
    `).join("");

    renderPagination(data.length);
}

// Pagination
function renderPagination(total) {
    const totalPage = Math.ceil(total / showCount.value);
    pagination.innerHTML = Array(totalPage).fill(0).map((_, i) =>
        `<button class="${i+1 === currentPage ? "active" : ""}" onclick="gotoPage(${i+1})">${i+1}</button>`
    ).join("");
}
function gotoPage(p) { currentPage = p; renderCard(filtered()); }

// Search
function filtered() {
    const key = searchInput.value.toLowerCase();
    return dataGunung.filter(g => g.nama.toLowerCase().includes(key));
}
searchInput.addEventListener("keyup", () => { currentPage=1; renderCard(filtered()); });

// Tambah Gunung
document.getElementById("addGunungForm").addEventListener("submit", e => {
    e.preventDefault();

    const newData = {
        nama: addNama.value,
        harga: addHarga.value,
        jarak: addJarak.value,
        waktu: addWaktu.value,
        level: addLevel.value,
        fasilitas: addFasilitas.value,
        image: addImage.value
    };

    dataGunung.push(newData);
    localStorage.setItem("dataGunung", JSON.stringify(dataGunung));
    modalAdd.style.display = "none";
    renderCard(dataGunung);
});

// Edit
function editGunung(index) {
    const newName = prompt("Edit nama gunung", dataGunung[index].nama);
    if (newName) {
        dataGunung[index].nama = newName;
        localStorage.setItem("dataGunung", JSON.stringify(dataGunung));
        renderCard(filtered());
    }
}

// Delete
function deleteGunung(index) {
    if (confirm("Hapus data?")) {
        dataGunung.splice(index, 1);
        localStorage.setItem("dataGunung", JSON.stringify(dataGunung));
        renderCard(filtered());
    }
}

// Go to detail page
function viewDetail(index) {
    localStorage.setItem("detailGunung", JSON.stringify(dataGunung[index]));
    window.location.href = "detail-gunung.html";
}

renderCard(dataGunung);
