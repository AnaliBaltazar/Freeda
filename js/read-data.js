"use strict";

window.onload = (event) => {
  let tipoPropiedad = localStorage.getItem("tipo_propiedad")
  let clasePropiedad = localStorage.getItem("clase_propiedad")
  let year = localStorage.getItem("year")
  let construccion = localStorage.getItem("construccion")
  let terreno = localStorage.getItem("terreno")

  document.querySelector(".imagen-casa").src="./img/" + tipoPropiedad + ".svg";
  document.querySelector("#tipo-prop").textContent = tipoPropiedad.toUpperCase();
  document.querySelector("#clase-prop").textContent = clasePropiedad.toUpperCase();
  document.querySelector("#year").textContent = year;
  document.querySelector("#construida").textContent = construccion;
  document.querySelector("#terreno").textContent = terreno;
};
