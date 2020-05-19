"use strict";

window.onload = (event)=>{
    const datosAsegurado = JSON.parse(sessionStorage.getItem("InsuredData"));
    const datosInmueble = JSON.parse(sessionStorage.getItem("PropertyData"));

    if (datosAsegurado.mismos_cobro == "on") {
        document.querySelector("#nombre").value = datosAsegurado.nombre.toUpperCase() + " " + datosAsegurado.paterno.toUpperCase() + " " + datosAsegurado.materno.toUpperCase();
    } else {
        console.log(typeof dastosAsegurado.mismos_cobro)
    }
}