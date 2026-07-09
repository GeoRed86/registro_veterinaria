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
    if (mascotas.nombre === "") {
        return "Debe ingresar Nombre de la Mascota";
    }
    if (mascotas.especie === "") {
        return "Debe ingresar la especie de la mascota";
    }
    if (mascotas.propietario === "") {
        return "Debe ingresar el nombre del propietario";
    }
    if (mascotas.edad < 0 || isNaN(mascotas.edad)) {
        return "Debe ingresar edad mayor a 0";
    }
}