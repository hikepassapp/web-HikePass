document.getElementById("btnLogout").addEventListener("click", function (e) {
    e.preventDefault(); 

    let tanya = confirm("Apakah anda yakin ingin keluar?");
    if (tanya) {
        window.location.href = "login.html";
    }
});
