"use strict";

window.onload = (event)=>{
    const datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
    const datosAsegurado = JSON.parse(sessionStorage.getItem("InsuredData"));
    const datosInmueble = JSON.parse(sessionStorage.getItem("PropertyData"));

    document.querySelector("#calle_inmueble").value = datosInmueble.calle_inmueble.toUpperCase();
    document.querySelector("#cp_inmueble").value = datosInmueble.cp_inmueble.toUpperCase();
    document.querySelector("#colonia_inmueble").value = datosInmueble.colonia_inmueble.toUpperCase();
    document.querySelector("#municipio_inmueble").value = datosInmueble.municipio_inmueble.toUpperCase();
    document.querySelector("#estado_inmueble").value = datosInmueble.estado_inmueble.toUpperCase();
    document.querySelector("#rfc_aseg").value = datosAsegurado.rfc.toUpperCase();
    document.querySelector("#namec_aseg").value = datosAsegurado.nombre.toUpperCase(); + " " + datosAsegurado.paterno.toUpperCase() + " " + datosAsegurado.materno.toUpperCase();;
    document.querySelector("#type").value = datosCotizador.tipo.toUpperCase();

    if (datosCotizador.clase == "interes") {
        document.querySelector("#clase_aseg").value = datosCotizador.clase.toUpperCase() + " SOCIAL";
      } else {
        document.querySelector("#clase_aseg").value = datosCotizador.clase.toUpperCase();
      }
    
    document.querySelector("#years_inm").value = datosCotizador.year.toUpperCase();
    document.querySelector("#superficie_inm").value = datosCotizador.construccion.toUpperCase();
    document.querySelector("#terreno_inm").value = datosCotizador.terreno.toUpperCase();
    
}