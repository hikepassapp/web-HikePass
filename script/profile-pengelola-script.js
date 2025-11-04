document.addEventListener("DOMContentLoaded", () => {
  // ambil tombol edit profil dan logout
  const editBtn = document.getElementById("editProfileBtn");
  const logoutTab = document.getElementById("logoutTab");

  // navigasi ke halaman edit profil
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      window.location.href = "edit-profile-pengelola.html";
    });
  }

  // navigasi ke halaman logout
  if (logoutTab) {
    logoutTab.addEventListener("click", () => {
      window.location.href = "logout-pengelola.html";
    });
  }

  // ambil data user dari localStorage
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};

  // fungsi bantu untuk set teks elemen
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "-";
  };

  // tampilkan data user ke halaman profil
  setText("usernameValue", storedUser.username);
  setText("fullnameValue", storedUser.nama);
  setText("emailValue", storedUser.email);
  setText("ageValue", storedUser.usia);
  setText("nikValue", storedUser.nik);
  setText("addressValue", storedUser.alamat);
  setText("phoneValue", storedUser.noTelp);

  // tampilkan jenis kelamin
  const radios = document.querySelectorAll('input[name="gender"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === storedUser.gender;
  });

  // update ucapan di pojok kanan atas
  const greeting = document.getElementById("greeting");
  if (greeting && storedUser.nama) {
    const firstName = storedUser.nama.split(" ")[0];
    greeting.textContent = `Hai, ${firstName}`;
  }
});
