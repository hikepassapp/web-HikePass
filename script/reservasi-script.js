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

    if (isEditing) {
      alert("Mode edit aktif. Anda bisa ubah jenis kelamin sekarang.");
    } else {
      alert("Mode edit dinonaktifkan.");
    }
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
