let mascotas = [];

function obtenerDatosMascotas() {
    let nombre = document.getElementById("mascotaNombre").value.trim();
    let especie = document.getElementById("mascotaEspecie").value.trim();
    let propietario = document.getElementById("mascotaPropietario").value.trim();
    let edad = Number(document.getElementById("mascotaEdad").value);
    let estado = "Pendiente"

    return {
        nombre : nombre,
        especie : especie,
        propietario : propietario,
        edad : edad,
        estado : estado
    };
}

function validarFormulario(mascota) {
    if (mascota.nombre === "") {
        return "Debe ingresar Nombre de la Mascota";
    }
    if (mascota.nombre.length <= 2 ) {
        return "El Nombre de la mascota debe tener al menos 3 letras";
    }
    if (mascota.especie === "") {
        return "Debe ingresar la especie de la mascota";
    }
    if (mascota.propietario === "") {
        return "Debe ingresar el nombre del propietario";
    }
    if (mascota.edad <= 0 || isNaN(mascota.edad)) {
        return "Debe ingresar edad mayor a 0";
    }

    return "";   
}

function registrarMascota() {
    let mascota = obtenerDatosMascotas();
    let error = validarFormulario(mascota);

    if (error !== "") {
        mostrarMensaje(error);
        return;
    }

    mascotas.push(mascota);

    limpiarFormulario();
    mostrarMensaje("La mascota se ha registrado correctamente");
    mostrarMascotas();

} 

function mostrarMascotas() {
    let lista = document.getElementById("listaRegistro");
    lista.innerHTML = "";

    mascotas.forEach((mascota, index) => {
        let item = document.createElement("li");

        item.textContent = mascota.nombre +
            " | Especie: " + mascota.especie +
            " | Dueño: " + mascota.propietario +
            " | Edad: " + mascota.edad +
            " años | Estado: " + mascota.estado + " ";

        let botonCambiar = document.createElement("button");
        botonCambiar.textContent = "Cambiar Estado";

        botonCambiar.addEventListener("click", function() {
            cambiarEstado(index);
        });

        item.appendChild(botonCambiar);
        lista.appendChild(item);

    });

    calcularTotales();
}

function encontrarMascota() {
    let buscar = document.getElementById("buscarMascota").value.toLowerCase().trim();

    if (buscar === "") {
        let listaBuscar = document.getElementById("listaBusqueda");
        listaBuscar.innerHTML = "Por favor, ingresa un nombre para buscar";
        return; 
    }

    let listaBuscar = document.getElementById("listaBusqueda");
    listaBuscar.innerHTML = "";

    let mascotasFiltradas = mascotas.filter(mascota =>
        mascota.nombre.toLowerCase().includes(buscar)
    );

    if (mascotasFiltradas.length === 0) {
        listaBuscar.innerHTML = "No se encotraron Mascotas con el nombre de " + buscar;
        return;
    }

    mascotasFiltradas.forEach((mascota, index) => {
        let itemBuscar = document.createElement("li");

        itemBuscar.textContent = mascota.nombre +
            " | Especie: " + mascota.especie +
            " | Dueño: " + mascota.propietario +
            " | Edad: " + mascota.edad +
            " años | Estado: " + mascota.estado + " ";

        listaBuscar.appendChild(itemBuscar);
    });

    
    limpiarFormulario();
}

function calcularTotales() {
    let totalMascotas = 0;
    let totalPendientes = 0;
    let totalAtencion = 0;
    let totalAlta = 0;

    mascotas.forEach(mascota => {
        totalMascotas++;

        if (mascota.estado === "Pendiente") {
            totalPendientes++;
        } else if (mascota.estado === "En Atencion") {
            totalAtencion++;
        } else if (mascota.estado === "De Alta") {
            totalAlta++;
        }

    });
    document.getElementById("totalMascotas").textContent = 
        "Total de Mascotas: " + totalMascotas;
    document.getElementById("totalPendientes").textContent = 
        "Total de Mascotas Pendientes: " + totalPendientes;
    document.getElementById("totalEnAtencion").textContent = 
        "Total de Mascotas En Atencion: " + totalAtencion;
    document.getElementById("totalDeAlta").textContent = 
        "Total de Mascotas De Alta: " + totalAlta;
}

function cambiarEstado(index) {
    let mascotaSeleccionada = mascotas[index];

    if (mascotaSeleccionada.estado === "Pendiente") {
        mascotaSeleccionada.estado = "En Atencion";
        mostrarMensaje(mascotaSeleccionada.nombre + " esta siendo Atendida");

    } else if (mascotaSeleccionada.estado === "En Atencion") {
        mascotaSeleccionada.estado = "De Alta";
        mostrarMensaje(mascotaSeleccionada.nombre + " ha sido dado/a De Alta ");

    } else {
        mostrarMensaje(mascotaSeleccionada.nombre + " ya fue dado/a de alta")
    }

    mostrarMascotas();
}

function mostrarMensaje(texto) {
    document.getElementById("mensaje").textContent = texto;
}

function limpiarFormulario() {
    document.getElementById("mascotaNombre").value = "";
    document.getElementById("mascotaEspecie").value = "";
    document.getElementById("mascotaPropietario").value = "";
    document.getElementById("mascotaEdad").value = "";
    document.getElementById("buscarMascota").value = "";

}

function filtrarPorEstado() {
    
    let estadoSeleccionado = document.getElementById("filtroEstado").value;

    let listaFiltro = document.getElementById("listaFiltroEstado");
    listaFiltro.innerHTML = "";

    let mascotasFiltradas = mascotas.filter(mascota => 
        mascota.estado === estadoSeleccionado
    );

    if (mascotasFiltradas.length === 0) {
        listaFiltro.innerHTML = "No hay mascotas con el estado " + estadoSeleccionado ;
        return;
    }

    mascotasFiltradas.forEach((mascota) => {
        let itemFiltro = document.createElement("li");

        itemFiltro.textContent = mascota.nombre +
            " | Especie: " + mascota.especie +
            " | Dueño: " + mascota.propietario +
            " | Edad: " + mascota.edad +
            " años | Estado: " + mascota.estado;

        listaFiltro.appendChild(itemFiltro);
    });
}


document.getElementById("btnBuscar").addEventListener("click", encontrarMascota);
document.getElementById("btnRegistrar").addEventListener("click", registrarMascota);
document.getElementById("filtroEstado").addEventListener("change", filtrarPorEstado);