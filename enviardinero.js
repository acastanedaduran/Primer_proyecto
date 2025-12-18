$(document).ready(function () {
    const contactos = [
        { nombre: "Sofía Jiménez Castañeda", alias: "Hijita", rut: "22.316.787-K", banco:"BancoEstado - Cuenta Vista" },
        { nombre: "Isabel Durán Pontigo", alias: "Mami", rut: "10.707.813-4", banco: "BancoBCI - Cuenta Corriente"},
    ];

    contactos.forEach(c => {
        $("#contactList").append(`<li class="list-group-item">${c.nombre} (${c.alias}) - ${c.rut} - ${c.banco}</li>`);
        $("#destino").append(`<option value="${c.rut}">${c.nombre} (${c.alias}) - ${c.banco}</option>`);
    });

    let saldoActual = parseFloat(localStorage.getItem("saldo") || 0);
    $("#saldoDisponible").text(`$${saldoActual}`);
    $("#searchContact").on("input", function() {
        const filtro = $(this).val().toLowerCase();
        let primerCoincidencia = null;

        $("#destino option").each(function() {
            const texto = $(this).text().toLowerCase();
            $(this).toggle(texto.includes(filtro));
            if (texto.includes(filtro) && primerCoincidencia === null) {
                primerCoincidencia = $(this).val();
            }
        });

        if (primerCoincidencia) {
            $("#destino").val(primerCoincidencia);
        }
    });
    $("button[data-bs-target='#confirmModal']").click(function() {
        const destino = $("#destino").val();
        const montoEnviar = parseFloat($("#montoEnviar").val());

        if (!destino) {
            $("#mensaje").text("Seleccione un contacto").css("color", "red").fadeIn().delay(2000).fadeOut();
            return;
        }

        if (isNaN(montoEnviar) || montoEnviar <= 0) {
            $("#mensaje").text("Ingrese un monto válido").css("color", "red").fadeIn().delay(2000).fadeOut();
            return;
        }

        if (montoEnviar > saldoActual) {
            $("#mensaje").text("Saldo insuficiente").css("color", "red").fadeIn().delay(2000).fadeOut();
            return;
        }
        saldoActual -= montoEnviar;
        localStorage.setItem("saldo", saldoActual);
        $("#saldoDisponible").text(`$${saldoActual}`);
        let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        transacciones.push({
            tipo: "Transferencia",
            detalle: `Enviado a ${destino} - $${montoEnviar}`,
            monto: montoEnviar
        });
        localStorage.setItem("transacciones", JSON.stringify(transacciones));
        $("#montoEnviar").val("");
    });
});

