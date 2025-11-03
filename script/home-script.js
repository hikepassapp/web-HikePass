document.addEventListener("DOMContentLoaded", function () {

    const routes = {
        home: "home.html",
        reservasi: "reservasi.html",
        tiket: "tiket.html",
        riwayat: "riwayat.html",
        informasi: "informasi.html",
        laporan: "laporan.html"
    };

    function goTo(pathKey) {
        if (!routes[pathKey]) return;
        window.location.href = routes[pathKey];
    }

    document.getElementById("goReservasi").addEventListener("click", () => goTo("reservasi"));
    document.getElementById("goRiwayat").addEventListener("click", () => goTo("riwayat"));
    document.getElementById("goInformasi").addEventListener("click", () => goTo("informasi"));
    document.getElementById("goLaporan").addEventListener("click", () => goTo("laporan"));

});
