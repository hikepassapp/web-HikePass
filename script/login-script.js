// toggle show/hide password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.src = isPassword ? 'assets/show.svg' : 'assets/hide.svg';
    });
}

// navigasi tombol login/register
const signinBtn = document.getElementById("signin-btn");
const daftarBtn = document.getElementById("daftar-btn");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const signInForm = document.getElementById("signInForm");
const registerForm = document.getElementById("registerForm");

// tombol sign in: masuk ke home/dashboard
if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        const emailInput = document.querySelector('#signInForm input[type="email"]');
        const passwordInput = document.querySelector('#signInForm input[type="password"]');
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // validasi sederhana
        if (!email || !password) {
            alert("Email dan password harus diisi!");
            return;
        }

        // kondisi login sederhana
        if (email === "dhea@gmail.com" && password === "dhea123") {
            alert("Login berhasil! Selamat datang Admin.");
            window.location.href = "home.html"; 
        } else {
            alert("Email atau password salah! Coba lagi.");
        }
    });
}

// tombol daftar -> validasi -> dashboard
if (daftarBtn) {
    daftarBtn.addEventListener("click", () => {
        const nama = document.getElementById("namaLengkap").value.trim();
        const email = document.getElementById("emailRegister").value.trim();
        const password = document.getElementById("passwordRegister").value.trim();
        const konfirmasi = document.getElementById("konfirmasiPassword").value.trim();

        if (!nama || !email || !password || !konfirmasi) {
            alert("Harap isi semua kolom terlebih dahulu!");
            return;
        }

        if (password !== konfirmasi) {
            alert("Password dan konfirmasi tidak cocok!");
            return;
        }

        // jika valid, diarahkan ke dashboard
        window.location.href = "home.html";
    });
}

// toggle form sign in <-> register
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

// tombol menu tambahan (opsional)
const userBtn = document.getElementById("userBtn");
const reservasiBtn = document.getElementById("reservasi-btn");
const rsvSemeruBtn = document.getElementById("reservasi-semeru-btn");

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

// tombol menuju halaman reservasi
function pindahKeReservasi() {
    console.log("Memindahkan ke halaman reservasi...");
    window.location.href = "reservasi.html";
}

const tombolReservasi = document.getElementsByClassName("btnReservasi")[0];
if (tombolReservasi) {
    tombolReservasi.addEventListener("click", pindahKeReservasi);
}
