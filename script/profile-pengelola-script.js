window.addEventListener("load", () => {
  // ambil tombol edit profil dan logout
  const editBtn = document.getElementById("editProfileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // navigasi ke halaman edit profil
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      console.log("Tombol edit diklik");
      window.location.href = "edit-profile-pengelola.html";
    });
  } else {
    console.warn("Elemen editProfileBtn tidak ditemukan di halaman ini");
  }

  // navigasi ke halaman logout 
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // hapus data user dari localstorage
      localStorage.removeItem("userData");
      // langsung arahkan ke halaman logout pengelola
      window.location.href = "logout-pengelola.html";
    });
  } else {
    console.warn("Elemen logoutBtn tidak ditemukan di halaman ini");
  }

  // mengambil data user dari localstorage
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};

  // fungsi bantu untuk mengatur teks elemen
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "-";
  };

  // menampilkan data user ke halaman profil
  setText("usernameValue", storedUser.username);
  setText("fullnameValue", storedUser.nama);
  setText("emailValue", storedUser.email);
  setText("ageValue", storedUser.usia);
  setText("nikValue", storedUser.nik);
  setText("addressValue", storedUser.alamat);
  setText("phoneValue", storedUser.noTelp);

  // menampilkan jenis kelamin
  const radios = document.querySelectorAll('input[name="gender"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === storedUser.gender;
  });

  const greeting = document.getElementById("greeting");
  if (greeting && storedUser.nama) {
    const firstName = storedUser.nama.split(" ")[0];
    greeting.textContent = `Hai, ${firstName}`;
  }
});
