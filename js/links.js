function newInsurancePolicy() {
    sessionStorage.setItem('nuevaPoliza', true)
    window.location="./6-iniciar-sesion.html"
}

function previousPage() {
    window.history.back();
}
function toActivateToken(event) {
    
    event.preventDefault();
    
    const campos = document.querySelectorAll("input")
    campos.forEach(campo => {validateInputValue(campo);})
    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        
        if (campo.value == "") {
            alert ("Todos los campos son obligatorios.")
            return false
        }else if ( campo.classList.contains("invalid")) {
            alert("Verifica que la información ingresada sea válida")
            return false
        }
    }
    
    //  Calcular edad
    let isAgeValid = ageCalc();
    if (!isAgeValid){
        return isAgeValid
    }

    const regForm = document.querySelector("#data_registro");
    const regFormElements = regForm.elements;

    
    let data = { ["UserData"]: {} };
    let day,month,year;
    for (const element of regFormElements) {
        if (element.name.length > 0 && element.name != "birthday_day" && element.name != "birthday_month" && element.name != "birthday_year") {
            data["UserData"][element.name] = element.value;
        }else if (element.name.length > 0 && element.name == "birthday_day") {
            day = (element.value.length == 1) ? "0" + element.value : element.value;
        }else if (element.name.length > 0 && element.name == "birthday_month") {
            month = (element.value.length == 1) ? "0" + element.value : element.value;
        }else if (element.name.length > 0 && element.name == "birthday_year") {
            year = element.value;
        }
    }
    data["UserData"].birthday = day + "/" + month + "/" + year;
        
    sessionStorage.setItem("UserData", JSON.stringify(data["UserData"]));
    window.location = "./3-activar-token.html";
}





function ageCalc() {
    const diaNac=parseInt(document.querySelector("select#day").value);
    const mesNac=parseInt(document.querySelector("select#month").value);
    const anioNac=parseInt(document.querySelector("select#year_date").value);
    let edad, dateage;
    if (diaNac != 0 && mesNac != 0 && anioNac != 0) {
        const birthday = new Date(anioNac,mesNac-1,diaNac);
        dateage = new Date(Date.now() - birthday);
        edad = Math.abs(dateage.getUTCFullYear() - 1970);
        if (edad < 18) {
            alert("No cumples con la edad para contratar un seguro.")
            return false
        }
        return true
    } else {
        alert("Selecciona tu fecha de nacimiento")
        return false
    }
}

function toValidateToken(event) {
    event.preventDefault();
    let data = { ["UserData"]: {} };
    const phone=document.querySelector("#telefono");
    if (phone.value == "") {
        phone.classList.add("invalid");
        appendText("Esta información es necesaria",phone.parentNode.querySelector('.bottom-label1'));
        return false;
    }else if (phone.classList.contains("invalid")){
        return false;
    }else {
        data["UserData"] = JSON.parse(sessionStorage.getItem("UserData"));
        data["UserData"].cellPhone = phone.value;
        sessionStorage.setItem("UserData",JSON.stringify(data["UserData"]))
        window.location="./4-validar-token.html"
    }
    

}

function validatePassword(event) {
    event.preventDefault();
    let password1 = document.querySelector('#pass');
    let password2 = document.querySelector('#pass2');
    let mail=document.querySelector("#correo")
    let data = { ["UserData"]: {} };

    if (mail.classList.contains("valid") && password2.classList.contains("valid") && password2.value == password1.value) {

        document.querySelector("#cover").style.display="block";
        document.querySelector(".center_container").style.display="block";
        document.querySelector("#bar_loader").style.width="0";
        document.querySelector("#caption_loader").textContent="";

        const regForm = document.querySelector("#data_crear_usua");
        const regFormElements = regForm.elements;

        data["UserData"] = JSON.parse(sessionStorage.getItem("UserData"))
        for (const element of regFormElements) {
            if (element.name.length && element.name != "pass2") {
                data["UserData"][element.name] = element.value;
            }
        }
        sessionStorage.setItem("UserData", JSON.stringify(data["UserData"]));


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
        
    } else if(mail.classList.contains("invalid")){
        alert("Escribe una cuenta de correo válida.")
        return false
    } else if(password1.value == "" || password2.value == "" || mail.value == ""){
        alert("Todos los campos son necesarios.")
        return false
    }else if(password2.value != password1.value){
        alert("Las contraseñas no coinciden.")
        return false
    }
}

function cpNext() {
    const cp_element=document.querySelector("#cp");
    if (cp_element.classList.contains("valid")) {
        let datosCotizador={
            codigopostal: cp_element.value
        }
        sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
        window.location = "./8-analisis-comp.html";
    }
}
function toPropiedad() {
    window.location = "./9-tipo-propiedad.html";
}
function toClase(elmnt) {
    let datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
    datosCotizador.tipo = elmnt.id;
    sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
    window.location = "./10-clase-inmueble.html";
}

function toSup() {
    const years_element=document.querySelector("#year")
    if (years_element.classList.contains("valid")) {
        let datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
        datosCotizador.year = years_element.value;
        sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
        window.location = "./12-superficie.html";
    }
}
function toTerrain() {
    const sup_element=document.querySelector("#superficie")
    if (sup_element.classList.contains("valid")) {
        let datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
        datosCotizador.construccion = sup_element.value;
        if (datosCotizador.tipo == "departamento") {
            datosCotizador.terreno = "--";
            sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
            window.location = "./14-contratar.html";
        } else {
            sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
            window.location = "./13-terreno.html";
        }
        
    }
}
function toContratar() {
    const terr_element=document.querySelector("#terreno")
    if (terr_element.classList.contains("valid")) {
        let datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
        datosCotizador.terreno = terr_element.value;
        sessionStorage.setItem('datosCotizador',JSON.stringify(datosCotizador));
        window.location = "./14-contratar.html";
    }
}
function toInsured() {
    window.location = "./15-datos-asegurado.html";
}

function toConfirm(event) {
    event.preventDefault();
    const form = event.target;
    const formElements = form.elements;

    const cpelmnt = document.querySelector("#cp");
    const edoelmnt = document.querySelector("#estado");
    const mpoelmnt = document.querySelector("#municipio");
    const calleelmnt = document.querySelector("#calle");
    const cpval = cpelmnt.value;
    const edoval = edoelmnt.value;
    const mpoval = mpoelmnt.value;
    const calleval = calleelmnt.value;
    const coloniaval = document.querySelector("#colonia_inmueble").value;
   

    if (cpval == "" || edoval=="" || mpoval=="" || calleval=="" || coloniaval=="selecciona") {    //Si el campo esta vacío = INVALIDO
        alert("Toda la información es necesaria")
        
    }else if (cpelmnt.classList.contains("invalid") || edoelmnt.classList.contains("invalid") || mpoelmnt.classList.contains("invalid") || calleelmnt.classList.contains("invalid")){
        alert("La información proporcionada no es válida")
    }else{
        data = getInmData(formElements);
        sessionStorage.setItem("PropertyData", JSON.stringify(data["PropertyData"])); 
        window.location="./15-confirmar-datos.html"
    }

}

const getInmData = (formElements) => {
    let data = { ["PropertyData"]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
    for (const element of formElements) {
      if (element.name.length > 0) {
        data["PropertyData"][element.name] = element.value;
      }
    }
    return data;
};


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
                            const date = new Date();
                            
                            const fechaContratación = {
                                day : date.getDate(),
                                month : date.getMonth(),
                                year : date.getFullYear(),
                            }
                            sessionStorage.setItem("fechaContratacion", JSON.stringify(fechaContratación));
                            window.location="./17-dashboard-1.html"
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
}

//Para boton de 18-SUMA-ASEGURADA.HTML
function toPayment() {
    window.location = "./16-pago.html";
}

function userRecover(event) {
    event.preventDefault();
    let email = document.querySelector("#correo");
    if (email.value == "") {    //Si el campo esta vacío = INVALIDO
        alert("Toda la información es necesaria")
        return false
        
    }else if (email.classList.contains("invalid") ){
        alert("Escribe un correo electrónico válido.")
        return false
    }else{
         
        window.location="./6-iniciar-sesion.html"
    }
}
