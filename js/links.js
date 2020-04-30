function toToken() {
    window.location = "./3-activar-token.html";
}

function validatePassword() {
    let password1 = document.querySelector('#pass');
    let password2 = document.querySelector('#pass2');
    if (password2.classList.contains("valid") && password2.value == password1.value) {
        return true
    } else {
        alert("Las contraseñas no coinciden.")
        return false
    }
}

function cpNext() {
    const cp_element=document.querySelector("#cp")
    if (cp_element.classList.contains("valid")) {
        localStorage.setItem('codigopostal',cp_element.value)
        window.location = "./8-analisis-comp.html";
    }
}
function toPropiedad() {
    window.location = "./9-tipo-propiedad.html";
}
function toClase(elmnt) {
    localStorage.setItem('tipo_propiedad',elmnt.id)
    window.location = "./10-clase-inmueble.html";
}

function toSup() {
    const years_element=document.querySelector("#year")
    if (years_element.classList.contains("valid")) {
        localStorage.setItem('year',years_element.value)
        window.location = "./12-superficie.html";
    }
}
function toTerrain() {
    const sup_element=document.querySelector("#superficie")
    if (sup_element.classList.contains("valid")) {
        localStorage.setItem('construccion',sup_element.value)
        window.location = "./13-terreno.html";
    }
}
function toContratar() {
    const terr_element=document.querySelector("#terreno")
    if (terr_element.classList.contains("valid")) {
        localStorage.setItem('terreno',terr_element.value)
        window.location = "./14-contratar.html";
    }
}

function toPayment() {
    window.location = "./15-Pago.html";
}
function toDataInsured() {

}
