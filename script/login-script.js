// toggle show hide password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.src = isPassword ? 'assets/show.svg' : 'assets/hide.svg';
  });
}

// ambil elemen utama
const signinBtn = document.getElementById("signin-btn");
const daftarBtn = document.getElementById("daftar-btn");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const signInForm = document.getElementById("signInForm");
const registerForm = document.getElementById("registerForm");

// helper simpan user ke localstorage
function simpanUserKeLocalStorage(data) {
  localStorage.setItem("userData", JSON.stringify(data));
  console.log("data user tersimpan:", data);
}

// tombol login
if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    const emailInput = document.querySelector('#signInForm input[type="email"]');
    const passwordInput = document.querySelector('#signInForm input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    // login pendaki
    if (email === "yanto@gmail.com" && password === "yanto123") {
      simpanUserKeLocalStorage({
        role: "pendaki",
        username: "yanto12344321",
        nama: "Yanto",
        email: "yanto@gmail.com",
      });
      alert("Login berhasil! Selamat datang Pendaki.");
      window.location.href = "home.html";
      return;
    }

    // login pengelola
    if (email === "thanos@gmail.com" && password === "thanos123") {
      simpanUserKeLocalStorage({
        role: "pengelola",
        username: "thanos12344322",
        nama: "Thanos",
        email: "thanos@gmail.com",
      });
      alert("Login berhasil! Selamat datang Pengelola.");
      window.location.href = "paket_wisata.html";
      return;
    }

    // gagal login
    alert("Email atau password salah! Coba lagi.");
  });
}

// tombol daftar (register)
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

    // kondisi khusus
    if (nama === "Yanto" && email === "yanto@gmail.com" && password === "yanto123") {
      simpanUserKeLocalStorage({
        role: "pendaki",
        username: "yanto12344321",
        nama: "Yanto",
        email: "yanto@gmail.com",
      });
      alert("Pendaftaran berhasil sebagai Pendaki!");
      window.location.href = "home.html";
      return;
    }else{
        alert("Pendaftaran gagal!");
    }

    if (nama === "Thanos" && email === "thanos@gmail.com" && password === "thanos123") {
      simpanUserKeLocalStorage({
        role: "pengelola",
        username: "thanos12344322",
        nama: "Thanos",
        email: "thanos@gmail.com",
      });
      alert("Pendaftaran berhasil sebagai Pengelola!");
      window.location.href = "paket_wisata.html";
      return;
    }

    // default otomatis deteksi 
    if (email.includes("pengelola")) {
      alert("Pendaftaran berhasil sebagai Pengelola!");
      window.location.href = "home-pengelola.html";
    } else {
      alert("Pendaftaran berhasil sebagai Pendaki!");
      window.location.href = "home.html";
    }
  });
}

// toggle tampilan form login dan register
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
  window.location.href = "reservasi.html";
}

const tombolReservasi = document.getElementsByClassName("btnReservasi")[0];
if (tombolReservasi) {
  tombolReservasi.addEventListener("click", pindahKeReservasi);
}
