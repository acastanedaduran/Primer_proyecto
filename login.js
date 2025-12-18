$(document).ready(function () {
    $("#loginform").submit(function (e) {
        e.preventDefault();
        const usuario = $("#user").val().trim();
        const password = $("#password").val().trim();
        const usuarioCorrecto = "ale";
        const passwordCorrecto = "290107";

        if (usuario === usuarioCorrecto && password === passwordCorrecto) {
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("saldo", "0");
            window.location.href = "menu.html";
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    });
});

