$(document).ready(function () {
    if ($("#depositAmount").length) {
        let saldoActual = parseFloat(localStorage.getItem("saldo") || 0);
        $("#saldoDisponible").text(`$${saldoActual}`);
        $("#depositAmount").on("input", function () {
            const valor = parseFloat($(this).val());
            if (isNaN(valor) || valor <= 0) {
                $("#mensaje").text("Ingrese un monto válido").css("color", "red").fadeIn().delay(2000).fadeOut();
            } else {
                $("#mensaje").fadeOut();
            }
        });
        $("button[data-bs-target='#staticBackdrop']").click(function () {
            const monto = parseFloat($("#depositAmount").val());

            if (isNaN(monto) || monto <= 0) {
                $("#mensaje").text("Ingrese un monto válido").css("color", "red").fadeIn().delay(2000).fadeOut();
                return;
            }
            saldoActual += monto;
            localStorage.setItem("saldo", saldoActual);
            $("#saldoDisponible").text(`$${saldoActual}`);
            let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
            transacciones.push({
                tipo: "Depósito",
                detalle: `Depósito de $${monto}`,
                monto: monto
            });
            localStorage.setItem("transacciones", JSON.stringify(transacciones));
            $("#depositAmount").val("");
        });
    }
});