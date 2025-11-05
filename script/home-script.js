document.addEventListener("DOMContentLoaded", function () {

    const routes = {
        home: "home.html",
        reservasi: "reservasi.html",
        tiket: "tiket.html",
        riwayat: "tiket-saya.html",
        informasi: "informasi.html",
        laporan: "laporan.html",
        profile: "profile.html"
    };

    function goTo(pathKey) {
        if (!routes[pathKey]) return;
        window.location.href = routes[pathKey];
    }

    const btnReservasi = document.getElementById("goReservasi");
    const btnRiwayat = document.getElementById("goRiwayat");
    const btnInformasi = document.getElementById("goInformasi");
    const btnLaporan = document.getElementById("goLaporan");
    const profileBtn = document.getElementById("profileBtn");

    if (btnReservasi) btnReservasi.addEventListener("click", () => goTo("reservasi"));
    if (btnRiwayat) btnRiwayat.addEventListener("click", () => goTo("riwayat"));
    if (btnInformasi) btnInformasi.addEventListener("click", () => goTo("informasi"));
    if (btnLaporan) btnLaporan.addEventListener("click", () => goTo("laporan"));
    if (profileBtn) profileBtn.addEventListener("click", () => goTo("profile"));
});
