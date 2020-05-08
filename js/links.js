function previousPage() {
    window.history.back();
}
function toActivateToken(event) {
    event.preventDefault();
    window.location = "./3-activar-token.html";
}

function toValidateToken(event) {
    event.preventDefault();
    const phone=document.querySelector("#telefono");
    if (phone.value == "") {
        phone.classList.add("invalid");
        appendText("Esta información es necesaria",phone.parentNode.querySelector('.bottom-label1'));
        return false;
    }else if (phone.classList.contains("invalid")){
        return false;
    }else {
        window.location="./4-validar-token.html"
    }
}

function validatePassword(event) {
    event.preventDefault();
    let password1 = document.querySelector('#pass');
    let password2 = document.querySelector('#pass2');
    let mail=document.querySelector("#email")
    if (password2.classList.contains("valid") && password2.value == password1.value) {

        document.querySelector("#cover").style.display="block";
        document.querySelector(".center_container").style.display="block";
        document.querySelector("#bar_loader").style.width="0";
        document.querySelector("#caption_loader").textContent="";
        
        setTimeout(() => {
            document.querySelector("#bar_loader").style.width="15%";
            document.querySelector("#caption_loader").textContent="Creando cuenta de usuario";
            setTimeout(() => {
                document.querySelector("#bar_loader").style.width="35%";
                setTimeout(() => {
                    document.querySelector("#bar_loader").style.width="75%";
                    document.querySelector("#caption_loader").textContent="Finalizando";
                    setTimeout(() => {
                        document.querySelector("#bar_loader").style.width="100%";
                        setTimeout(() => {
                            window.location="./6-iniciar-sesion.html"
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
        
    } else if(password1.value == "" || password2.value == "" || mail.value == ""){
        alert("Todos los campos son necesarios.")
        return false
    }else if(password2.value != password1.value){
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
/* function closePop() {
    document.querySelector("#ready_screen").style.display="none";
    document.querySelector("#cover2").style.display="none";
} */
