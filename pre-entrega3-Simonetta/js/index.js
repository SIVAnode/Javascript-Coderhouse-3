let ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
let totalIngreso = calcularTotal(ingresos);

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let totalGasto = calcularTotal(gastos);

function agregarIngreso() {
    let descripcion = document.getElementById('detalleIngreso').value;
    let monto = parseFloat(document.getElementById('montoIngreso').value);

    if (descripcion === '' || isNaN(monto)) {
        Swal.fire({
            title: "UPS!!!",
            text: "Ingresa un dato válido",
            icon: "warning",
            confirmButtonText: "ok"
        });
        return;
    } else {
        ingresos.push({ descripcion, monto });
        totalIngreso += monto;
        document.getElementById('detalleIngreso').value = '';
        document.getElementById('montoIngreso').value = '';
        actualizarTotalIngresos();
        mostrarIngresos();
        mostrarSaldo();
        Toastify({
            text: "El ingreso ha sido agregado correctamente",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #40ff69, #00ff0d)",
            },
            onClick: function () { }
        }).showToast();
    }
}

function actualizarTotalIngresos() {
    document.getElementById('totalIngresos').textContent = `$${totalIngreso.toFixed(2)}`;
}

function mostrarIngresos() {
    const ul = document.getElementById('listaIngresos');
    const ingresosHtml = ingresos.map(item => `<li class="lista">${item.descripcion}: $${item.monto.toFixed(2)}</li>`).join('');
    ul.innerHTML = ingresosHtml;
}

let botonIngreso = document.getElementById('btnIngreso');
botonIngreso.addEventListener('click', function (event) {
    event.preventDefault();
    agregarIngreso();
})

function agregarGasto() {
    let descripcion = document.getElementById('detalleGasto').value;
    let monto = parseFloat(document.getElementById('montoGasto').value);

    if (descripcion === '' || isNaN(monto)) {
        Swal.fire({
            title: "UPS!!!",
            text: "Ingresa un dato válido, por favor",
            icon: "warning",
            confirmButtonText: "ok"
        });
        return;
    } else {
        gastos.push({ descripcion, monto });
        totalGasto += monto;
        document.getElementById('detalleGasto').value = '';
        document.getElementById('montoGasto').value = '';
        actualizarTotalGastos();
        mostrarGastos();
        mostrarSaldo();
        Toastify({
            text: "El gasto ha sido agregado correctamente",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #40ff69, #00ff0d)",
            },
            onClick: function () { }
        }).showToast();
    }
}

function actualizarTotalGastos() {
    document.getElementById('totalGastos').textContent = `$${totalGasto.toFixed(2)}`;
}

function mostrarGastos() {
    const ul = document.getElementById('listaGastos');
    const gastosHtml = gastos.map(item => `<li class="lista">${item.descripcion}: $${item.monto.toFixed(2)}</li>`).join('');
    ul.innerHTML = gastosHtml;
}

let botonGastos = document.getElementById('botonGastos');
botonGastos.addEventListener('click', function (event) {
    event.preventDefault();
    agregarGasto();
})

function mostrarSaldo() {
    let saldo = totalIngreso - totalGasto;
    document.getElementById('saldoTotal').textContent = `$${saldo.toFixed(2)}`;
}

function guardarDatos() {
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
    localStorage.setItem('gastos', JSON.stringify(gastos));
    Swal.fire({
        title: "Guardado",
        text: "Acabas de guardar los datos",
        icon: "success",
        confirmButtonText: "ok"
    });
}

function cargarDatosDesdeLocalStorage() {
    const ingresosGuardados = JSON.parse(localStorage.getItem('ingresos'));
    const gastosGuardados = JSON.parse(localStorage.getItem('gastos'));

    if (ingresosGuardados && gastosGuardados) {
        ingresos = ingresosGuardados;
        gastos = gastosGuardados;
        totalIngreso = calcularTotal(ingresos);
        totalGasto = calcularTotal(gastos);
        mostrarIngresos();
        mostrarGastos();
        actualizarTotalIngresos();
        actualizarTotalGastos();
        mostrarSaldo();
    }
}

function borrarDatos() {
    Swal.fire({
        title: 'Seguro que quieres reiniciar?',
        text: "Este paso es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Borrado!',
                'Acabas de reiniciar todos los datos',
                'success'
            )
            localStorage.clear();
            ingresos = [];
            gastos = [];
            totalIngreso = 0;
            totalGasto = 0;
            mostrarIngresos();
            mostrarGastos();
            actualizarTotalIngresos();
            actualizarTotalGastos();
            mostrarSaldo();
        }
    })
}

function calcularTotal(items) {
    return items.reduce((total, item) => total + item.monto, 0);
}

let botonGuardar = document.getElementById('guardarDatos');
botonGuardar.addEventListener("click", guardarDatos);

let botonCargar = document.getElementById('cargarDatos');
botonCargar.addEventListener('click', function () {
    cargarDatosDesdeLocalStorage();
    Swal.fire({
        title: "Cargado",
        text: "Acabas de cargar los datos anteriormente guardados",
        icon: "success",
        confirmButtonText: "ok"
    });
});

let botonBorrarDatos = document.getElementById('borrarDatos');
botonBorrarDatos.addEventListener('click', borrarDatos);

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosDesdeLocalStorage();
});