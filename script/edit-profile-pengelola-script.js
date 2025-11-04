document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editProfileForm");
  const cancelBtn = document.getElementById("cancelBtn");

  // ambil data user dari localstorage
  const storedUser = JSON.parse(localStorage.getItem("userData")) || {};

  // helper untuk mengisi nilai input
  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value || "";
  };

  // isi nilai awal ke input form
  setValue("usernameEdit", storedUser.username || "thanos12344321");
  setValue("emailEdit", storedUser.email || "thanos@gmail.com");
  setValue("namaEdit", storedUser.nama);
  setValue("usiaEdit", storedUser.usia);
  setValue("nikEdit", storedUser.nik);
  setValue("telpEdit", storedUser.noTelp);
  setValue("alamatEdit", storedUser.alamat);

  // set radio button jenis kelamin
  const genderInputs = document.querySelectorAll('input[name="genderEdit"]');
  genderInputs.forEach((radio) => {
    radio.checked = radio.value === storedUser.gender;
  });

  // tombol batal
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Batalkan perubahan dan kembali ke profil?")) {
        window.location.href = "profile.html";
      }
    });
  }

  // tombol simpan
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nama = document.getElementById("namaEdit")?.value.trim();
      const telp = document.getElementById("telpEdit")?.value.trim();

      // validasi hanya nama yang wajib diisi
      if (!nama) {
        alert("Harap isi nama lengkap terlebih dahulu.");
        return;
      }

      // data baru dari form
      const updatedUser = {
        username: document.getElementById("usernameEdit").value,
        email: document.getElementById("emailEdit").value,
        nama,
        usia: document.getElementById("usiaEdit").value,
        nik: document.getElementById("nikEdit").value,
        gender:
          document.querySelector('input[name="genderEdit"]:checked')?.value || "",
        noTelp: telp || "-", // jika kosong akan diganti tanda "-"
        alamat: document.getElementById("alamatEdit").value,
      };

      // simpan data ke localstorage
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      alert("Data profil berhasil disimpan!");
      window.location.href = "profile.html";
    });
  }
});
