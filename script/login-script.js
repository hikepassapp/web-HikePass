// Toggle show/hide password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.src = isPassword ? 'assets/show.svg' : 'assets/hide.svg';
    });
}

// Navigasi tombol admin/user
const userBtn = document.getElementById("userBtn");
const signinBtn = document.getElementById("signin-btn");
const reservasiBtn = document.getElementById("reservasi-btn");
const rsvSemeruBtn = document.getElementById("reservasi-semeru-btn");

if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        window.location.href = "home.html";
    });
}

if (userBtn) {
    userBtn.addEventListener("click", () => {
        window.location.href = "loginUser.html";
    });
}

if (reservasiBtn) {
    reservasiBtn.addEventListener("click", () => {
        window.location.href = "reservasi.html";
    });
}

if (rsvSemeruBtn) {
    rsvSemeruBtn.addEventListener("click", () => {
        window.location.href = "semeru-page.html";
    });
}

// Toggle form Sign In ↔ Register
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const signInForm = document.getElementById("signInForm");
const registerForm = document.getElementById("registerForm");

if (showRegister && showLogin) {
    showRegister.addEventListener("click", () => {
        signInForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLogin.addEventListener("click", () => {
        registerForm.style.display = "none";
        signInForm.style.display = "block";
    });
}

// Tombol menuju halaman reservasi
function pindahKeReservasi() {
    console.log("Memindahkan ke halaman reservasi...");
    window.location.href = "reservasi.html";
}

const tombolReservasi = document.getElementsByClassName("btnReservasi")[0];
if (tombolReservasi) {
    tombolReservasi.addEventListener("click", pindahKeReservasi);
}
