document.addEventListener("DOMContentLoaded", () => {
  const cancelBtn = document.getElementById("cancelBtn");
  const logoutConfirmBtn = document.getElementById("logoutConfirmBtn");

  // tombol batal kembali ke profil
  cancelBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // tombol keluar (hapus data dan ke login)
  logoutConfirmBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    alert("Anda telah berhasil logout.");
    window.location.href = "login.html";
  });
});
