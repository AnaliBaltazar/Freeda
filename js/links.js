function newInsurancePolicy() {
    sessionStorage.setItem('nuevaPoliza', true)
    window.location="./6-iniciar-sesion.html"
}

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
        sessionStorage.setItem('codigopostal',cp_element.value)
        window.location = "./8-analisis-comp.html";
    }
}
function toPropiedad() {
    window.location = "./9-tipo-propiedad.html";
}
function toClase(elmnt) {
    sessionStorage.setItem('tipo_propiedad',elmnt.id)
    window.location = "./10-clase-inmueble.html";
}

function toSup() {
    const years_element=document.querySelector("#year")
    if (years_element.classList.contains("valid")) {
        sessionStorage.setItem('year',years_element.value)
        window.location = "./12-superficie.html";
    }
}
function toTerrain() {
    const sup_element=document.querySelector("#superficie")
    if (sup_element.classList.contains("valid")) {
        sessionStorage.setItem('construccion',sup_element.value)
        if (sessionStorage.getItem('tipo_propiedad') == "departamento") {
            window.location = "./14-contratar.html";
        } else {
            window.location = "./13-terreno.html";
        }
        
    }
}
function toContratar() {
    const terr_element=document.querySelector("#terreno")
    if (terr_element.classList.contains("valid")) {
        sessionStorage.setItem('terreno',terr_element.value)
        window.location = "./14-contratar.html";
    }
}
function toInsured() {
    window.location = "./15-datos-asegurado.html";
}
/* function toPayment() {
    window.location = "./16-pago.html";
} */
function genDashboard(event) {
    event.preventDefault();
    document.querySelector("#cover").style.display="block";
        document.querySelector(".center_container").style.display="block";
        document.querySelector("#bar_loader").style.width="0";
        document.querySelector("#caption_loader").textContent="";
        
        setTimeout(() => {
            document.querySelector("#bar_loader").style.width="15%";
            document.querySelector("#caption_loader").textContent="Enviando datos a servidores";
            setTimeout(() => {
                document.querySelector("#bar_loader").style.width="35%";
                document.querySelector("#caption_loader").textContent="Generando carátula del seguro";
                setTimeout(() => {
                    document.querySelector("#bar_loader").style.width="75%";
                    document.querySelector("#caption_loader").textContent="Designando un número de póliza";
                    setTimeout(() => {
                        document.querySelector("#bar_loader").style.width="100%";
                        document.querySelector("#caption_loader").textContent="Arreglando los últimos detalles";
                        setTimeout(() => {
                            window.location="./17-dashboard-1.html"
                        }, 4000);
                    }, 4000);
                }, 4000);
            }, 4000);
        }, 4000);
}

//Para boton de 18-SUMA-ASEGURADA.HTML
function toPayment() {
    window.location = "./16-pago.html";
}
/*function toDataInsured(event) {
    event.preventDefault();
    window.location = "./16-datos-asegurado.html";
    return false
}*/
/* function closePop() {
    document.querySelector("#ready_screen").style.display="none";
    document.querySelector("#cover2").style.display="none";
} */
