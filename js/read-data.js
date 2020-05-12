"use strict";

window.onload = (event) => {
  let tipoPropiedad = sessionStorage.getItem("tipo_propiedad")
  let clasePropiedad = sessionStorage.getItem("clase_propiedad")
  let year = sessionStorage.getItem("year")
  let construccion = sessionStorage.getItem("construccion")
  let terreno = sessionStorage.getItem("terreno")

  document.querySelector(".imagen-casa").src="./img/" + tipoPropiedad + ".svg";
  document.querySelector("#tipo-prop").textContent = tipoPropiedad.toUpperCase();
  document.querySelector("#clase-prop").textContent = clasePropiedad.toUpperCase();
  document.querySelector("#year").textContent = year;
  document.querySelector("#construida").textContent = construccion;
  if (terreno == null) {
    document.querySelector("#terreno").style.display = "none";
    document.querySelector("#terreno").previousElementSibling.style.display = "none";
  } else {
    document.querySelector("#terreno").textContent = terreno;
  }
};
