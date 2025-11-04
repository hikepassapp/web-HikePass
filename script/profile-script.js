document.addEventListener("DOMContentLoaded", () => {
  // mengambil tombol edit profil
  const editBtn = document.getElementById("editProfileBtn");

  // navigasi ke halaman edit profile ===
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      window.location.href = "edit-profile.html";
    });
  }

  // mengambil data user dari localStorage 
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};

  // helper buat set teks
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "-";
  };

  // menampilkan data di field profil
  setText("usernameValue", storedUser.username);
  setText("fullnameValue", storedUser.nama);
  setText("emailValue", storedUser.email);
  setText("ageValue", storedUser.usia);
  setText("nikValue", storedUser.nik);
  setText("addressValue", storedUser.alamat);
  setText("phoneValue", storedUser.noTelp);

  // menampilkan radio jenis kelamin
  const radios = document.querySelectorAll('input[name="gender"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === storedUser.gender;
  });

  // update greeting di pojok kanan atas ===
  const greeting = document.getElementById("greeting");
  if (greeting && storedUser.nama) {
    const firstName = storedUser.nama.split(" ")[0];
    greeting.textContent = `Hai, ${firstName}`;
  }
});
