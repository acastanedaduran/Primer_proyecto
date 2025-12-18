$(document).ready(function() {
    if ($("#saldodisponible").length) {
        const saldo = localStorage.getItem("saldo") || 0;
        $("#saldodisponible").text(`$${saldo}`);
    }

    if ($("#depositAmount").length) {
        $("#depositAmount").on("input", function () {
            const valor = $(this).val();
            if (valor <= 0) {
                $("#mensaje").text("Ingrese un monto válido").css("color", "red");
            } else {
                $("#mensaje").text("");
            }
        });

        $("button[data-bs-target='#staticBackdrop']").click(function () {
            const monto = parseFloat($("#depositAmount").val());
            if (isNaN(monto) || monto <= 0) {
                $("#mensaje").text("Ingrese un monto válido").css("color", "red");
                return;
            }

            let saldoActual = parseFloat(localStorage.getItem("saldo") || 0);
            saldoActual += monto;
            localStorage.setItem("saldo", saldoActual);

            $("#depositAmount").val("");
        });
    }

    if ($("#contactostabla").length) {
        const contactos = [
            { nombre: "Sofía Jiménez Castañeda", rut: "22.316.787-K", alias: "Hijita", banco: "BancoEstado", cuenta: "Vista" },
            { nombre: "Isabel Durán Pontigo", rut: "10.707.813-4", alias: "Mami", banco: "BancoBCI", cuenta: "Vista" }
        ];

        contactos.forEach(c => {
            $("#contactostabla").append(`<li class="list-group-item">${c.nombre} - ${c.alias}</li>`);
            $("#destino").append(`<option value="${c.rut}">${c.nombre} (${c.alias})</option>`);
        });

        $("#searchContact").on("input", function () {
            const filtro = $(this).val().toLowerCase();
            $("#contactostabla li").each(function () {
                const texto = $(this).text().toLowerCase();
                $(this).toggle(texto.includes(filtro));
            });
        });

        $("form").submit(function (e) {
            e.preventDefault();
            const destino = $("#destino").val();
            if (!destino) {
                alert("Seleccione un contacto");
                return;
            }

            let saldoActual = parseFloat(localStorage.getItem("saldo") || 0);
            const montoEnviar = 100;
            if (saldoActual < montoEnviar) {
                alert("Saldo insuficiente");
                return;
            }

            saldoActual -= montoEnviar;
            localStorage.setItem("saldo", saldoActual);
            alert(`Se enviaron $${montoEnviar} a ${destino}`);
        });
    }

    if ($("#tabla").length) {
        const movimientos = [
            { tipo: "Pago", detalle: "Pago automatico pasaje qr", monto: 870 },
            { tipo: "Pago", detalle: "Pago Dunkin", monto: 4690 },
            { tipo: "Transferencia", detalle: "Transferencia hacia Sofia Jimenez C", monto: 100000 },
            { tipo: "Pago", detalle: "Pago Papajohns", monto: 21180 },
            { tipo: "Comisión", detalle: "Comision transferencia a otros bancos", monto: 300 },
            { tipo: "Transferencia", detalle: "Transferencia de Isabel Duran Pontig", monto: 20000 }
        ];

        function mostrarMovimientos(filtro) {
            $("#tabla").empty();
            movimientos.forEach(m => {
                if (filtro === "todos" || m.tipo === filtro) {
                    $("#tabla").append(`<li class="list-group-item">${m.detalle} - $${m.monto}</li>`);
                }
            });
        }

        mostrarMovimientos("todos");

        $("#filtro").change(function () {
            const tipo = $(this).val();
            mostrarMovimientos(tipo);
        });
    }
});
