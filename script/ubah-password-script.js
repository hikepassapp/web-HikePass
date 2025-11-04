document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changePasswordForm");
  const cancelBtn = document.getElementById("cancelBtn");

  // tombol batal
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Batalkan perubahan password dan kembali ke profil?")) {
      window.location.href = "profile.html";
    }
  });

  // tombol simpan
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const oldPass = document.getElementById("oldPassword").value.trim();
    const newPass = document.getElementById("newPassword").value.trim();
    const confirmPass = document.getElementById("confirmPassword").value.trim();

    if (!oldPass || !newPass || !confirmPass) {
      alert("Harap isi semua field password.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Konfirmasi password tidak cocok.");
      return;
    }

    alert("Password berhasil diubah!");
    window.location.href = "profile.html";
  });
});
