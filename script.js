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

function validarFormulario() {
    if (mascota.nombre === "") {
        return "Debe ingresar Nombre de la Mascota";
    }
    if (mascota.especie === "") {
        return "Debe ingresar la especie de la mascota";
    }
    if (mascota.propietario === "") {
        return "Debe ingresar el nombre del propietario";
    }
    if (mascota.edad < 0 || isNaN(mascota.edad)) {
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
            " | Especie: " + mascotas.especie +
            " | Dueño: " + mascotas.propietario +
            " | Edad: " + mascotas.edad +
            " años | Estado: " + mascotas.estado;

        
    });
}

function limpiarFormulario() {
    document.getElementById("mascotaNombre").value = "";
    document.getElementById("mascoEspecie").value = "";
    document.getElementById("mascotaPropietario").value = "";
    document.getElementById("mascotaEdad").value = "";

}

document.getElementById("btnRegistrar").addEventListener("click", registrarMascota);