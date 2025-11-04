// ===== RESERVASI SCRIPT =====
document.addEventListener("DOMContentLoaded", () => {
    const reservasiButtons = document.querySelectorAll(".btnReservasi");
    reservasiButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "isi-data.html";
        });
    });

    setupSearch();
});

// ===================================================
// REAL-TIME SEARCH
// ===================================================
function setupSearch() {
    const searchInput = document.querySelector('.search-rsv-container input') ||
        document.getElementById('searchInput') ||
        document.querySelector('.search-input');
    const mountainCards = document.querySelectorAll('.mountain-card');

    if (!searchInput || !mountainCards.length) {
        console.log('Search input or cards not found');
        return;
    }

    console.log(`✅ Search initialized: ${mountainCards.length} mountain cards found`);

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        mountainCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const isMatch = text.includes(query);

            card.style.display = isMatch || query === '' ? '' : 'none';
            if (isMatch || query === '') visibleCount++;
        });

        // Show/hide no results message
        let noResults = document.getElementById('noResultsMessage');
        if (visibleCount === 0 && query !== '') {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'noResultsMessage';
                noResults.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <div style="font-size: 48px;">🔍</div>
                        <h3>Tidak ada hasil ditemukan</h3>
                        <p>Coba kata kunci lain</p>
                    </div>
                `;
                mountainCards[0]?.parentElement?.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    });
}

// ===================================================
// handle tab switching
// ===================================================
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.classList.add("active");
    });
});

// ===================================================
// load data user dari localstorage
// ===================================================
const storedUser = JSON.parse(localStorage.getItem("userData"));

if (storedUser) {
    const nameVal = document.getElementById("nameValue");
    const emailVal = document.getElementById("emailValue");
    const usernameVal = document.getElementById("usernameValue");
    const greeting = document.getElementById("greeting");

    if (nameVal) nameVal.textContent = storedUser.nama || "-";
    if (emailVal) emailVal.textContent = storedUser.email || "-";
    if (usernameVal) usernameVal.textContent = storedUser.email.split("@")[0] || "user";
    if (greeting) greeting.textContent = `Hai, ${storedUser.nama.split(" ")[0]}`;
}

// ===================================================
// disable input radio (jenis kelamin) saat awal
// ===================================================
const genderInputs = document.querySelectorAll('input[name="gender"]');
genderInputs.forEach(input => (input.disabled = true));

// ===================================================
// handle tombol edit untuk mengaktifkan input
// ===================================================
const editBtn = document.getElementById("editProfileBtn");
let isEditing = false;

if (editBtn) {
    editBtn.addEventListener("click", () => {
        isEditing = !isEditing;
        genderInputs.forEach(input => (input.disabled = !isEditing));
        alert(isEditing ? "Mode edit aktif" : "Mode edit dinonaktifkan");
    });
}

// ===================================================
// handle navigasi ke halaman profile
// ===================================================
const profileBtn = document.getElementById("profileBtn");
if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}
