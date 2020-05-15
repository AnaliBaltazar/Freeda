"use strict";

window.onload = (event) => {
  const datosCotizador= JSON.parse(sessionStorage.getItem("datosCotizador"))

  document.querySelector(".imagen-casa").src="./img/" + datosCotizador.tipo + ".svg";
  document.querySelector("#tipo-prop").textContent = datosCotizador.tipo.toUpperCase();
  if (datosCotizador.clase == "interes") {
    document.querySelector("#clase-prop").textContent = datosCotizador.clase.toUpperCase() + " SOCIAL";
  } else {
    document.querySelector("#clase-prop").textContent = datosCotizador.clase.toUpperCase();
  }
  
  document.querySelector("#year").textContent = datosCotizador.year;
  document.querySelector("#construida").textContent = datosCotizador.construccion;
  if (datosCotizador.terreno == null) {
    document.querySelector("#terreno").style.display = "none";
    document.querySelector("#terreno").previousElementSibling.style.display = "none";
  } else {
    document.querySelector("#terreno").textContent = datosCotizador.terreno;
  }
};
