$(document).ready(function() {
    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    function mostrarTransacciones(filtro = "todos") {
        $("#tabla").empty();
        if (transacciones.length === 0) {
            $("#tabla").append('<li class="list-group-item">No hay transacciones</li>');
            return;
        }

        transacciones.forEach(t => {
            if (filtro === "todos" || t.tipo === filtro) {
                $("#tabla").append(`<li class="list-group-item">${t.tipo}: ${t.detalle} - $${t.monto}</li>`);
            }
        });
    }
    mostrarTransacciones();
    $("#filtro").change(function() {
        const tipo = $(this).val();
        mostrarTransacciones(tipo);
    });
});
