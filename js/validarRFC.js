// EVENTO SELECCION DE CAMPOS DE TEXTO
const inputElement=document.querySelector('input#rfcA')
let tipoPersona;

    //EVENTO ONFOCUSOUT
    inputElement.addEventListener("focusout", validateRFCValue); // AL SALIR DE LA SELECCION SE VALIDA LA INFORMACIÓN
    //////////////////////////////////////////////////////////////

    //EVENTO ONFOCUSIN - INVIERTE LA CLASE VALID-INVALID DEL CAMPO SELECCIONADO
    inputElement.addEventListener("focusin", cleanInput);

$('#rfcA').on("change keyup paste", function(){
    document.querySelector("#rfcA").classList.remove("valid");
    document.querySelector("#rfcA").classList.remove("invalid");
    document.querySelector("#nombre").classList.remove("valid");
    document.querySelector("#nombre").classList.remove("invalid");
    document.querySelector("#paterno").classList.remove("valid");
    document.querySelector("#paterno").classList.remove("invalid");
    document.querySelector("#materno").classList.remove("valid");
    document.querySelector("#materno").classList.remove("invalid");
    
    document.querySelector("#nombre").value = "";
    document.querySelector("#paterno").value = "";
    document.querySelector("#materno").value = "";
    document.querySelector('#day [value="' + 0 + '"]').selected = true;
    document.querySelector('#month [value="' + 0 + '"]').selected = true;
    document.querySelector('#year_date [value="' + 0 + '"]').selected = true;
    document.querySelectorAll("input").forEach(function(input){
        if (input.id != "rfcA") {
            input.disabled=true
        }else{
            input.disabled=false
        } 
    }) 
    document.querySelectorAll("select").forEach(select => select.disabled=true)
    
})

function cleanInput() {
    this.classList.remove("valid");
    this.classList.remove("invalid");
}

function validateRFCValue(element){
    if (element.target) {
        element=this;
    }
    document.querySelector("#cover").style.display="block"
    document.querySelector(".center_container").style.display="block"
    document.querySelector("#progress_loader").style.display="none"
    document.querySelector("#caption_loader").style.display="none"
    const elmnt_value = element.value.toUpperCase();
    let regF, regM, resultF, resultM, cautionTxt;
    if (elmnt_value == "") {    //Si el campo esta vacío = INVALIDO
        element.classList.add("invalid");
        appendText("Esta información es necesaria",element.parentNode.querySelector('.bottom-label1'));
        document.querySelector("#cover").style.display="none"
        document.querySelector(".center_container").style.display="none"
    } else {
        regF=/^[A-Z,Ñ,&]{4}[0-9]{2}(0[1-9]|1[0-2])((0[1-9]|[12][0-9]|3[01]))([A-Z,0-9][A-Z,0-9][0-9,A-Z])/g;
        regM=/^[A-Z,Ñ,&]{3}[0-9]{2}(0[1-9]|1[0-2])((0[1-9]|[12][0-9]|3[01]))([A-Z,0-9][A-Z,0-9][0-9,A-Z])/g;
        resultF = elmnt_value.match(regF);
        resultM = elmnt_value.match(regM);
        cautionTxt = "El RFC ingresado no es válido";
        
        if (resultF != null) {
            element.classList.add("valid");
            element.classList.remove("invalid");
            setTimeout(() => {
                element.value=resultF;
                let busqueda = searchRFC(elmnt_value);
                if (busqueda != null) {
                    setRFCData(busqueda);
                }else{
                    document.querySelector("#nombre").disabled = false;
                    document.querySelector("#paterno").disabled = false;
                    document.querySelector("#materno").disabled = false;
                    document.querySelector("#day").disabled = false;
                    document.querySelector("#month").disabled = false;
                    document.querySelector("#year_date").disabled = false;
                }
                document.querySelector("#cover").style.display="none"
                document.querySelector(".center_container").style.display="none"
                document.querySelector("#progress_loader").style.display="block"
                document.querySelector("#caption_loader").style.display="block"
                
            },1500);
            
            tipoPersona = "fisica";
        }else if(resultM){
            alert('POR EL MOMENTO SOLO PUEDES CONTRATAR UN SEGURO SI ERES PERSONA FÍSICA')
            cautionTxt = "Solo personas físicas";
            element.classList.add("invalid");
            element.classList.remove("valid");
            appendText(cautionTxt,element.parentNode.querySelector('.bottom-label1'));
            document.querySelector("#nombre").disabled = true;
            document.querySelector("#paterno").disabled = true;
            document.querySelector("#materno").disabled = true;
            document.querySelector("#day").disabled = true;
            document.querySelector("#month").disabled = true;
            document.querySelector("#year_date").disabled = true;
            document.querySelector("#cover").style.display="none"
            document.querySelector(".center_container").style.display="none"

        }else{
            element.classList.add("invalid");
            element.classList.remove("valid");
            appendText(cautionTxt,element.parentNode.querySelector('.bottom-label1'));
            document.querySelector("#cover").style.display="none"
            document.querySelector(".center_container").style.display="none"
        } 
    }
}

function appendText(texto, elemento){   //Funcion para agregar o modificar el texto del elemento dado
    elemento.textContent=texto;
}

function setRFCData(data){
    document.querySelector("#rfcA").value = data.rfc;
    document.querySelector("#rfcA").classList.add("valid");
    document.querySelector("#rfcA").classList.remove("invalid");
    document.querySelector("#nombre").value = data.nombre;
    document.querySelector("#nombre").classList.add("valid");
    document.querySelector("#nombre").classList.remove("invalid");
    document.querySelector("#nombre").disabled = true;
    document.querySelector("#paterno").value = data.a_paterno;
    document.querySelector("#paterno").classList.add("valid");
    document.querySelector("#paterno").classList.remove("invalid");
    document.querySelector("#paterno").disabled = true;
    document.querySelector("#materno").value = data.a_materno;
    document.querySelector("#materno").classList.add("valid");
    document.querySelector("#materno").classList.remove("invalid");
    document.querySelector("#materno").disabled = true;
    document.querySelector('#day [value="' + data.dia + '"]').selected = true;
    document.querySelector("#day").disabled = true;
    document.querySelector('#month [value="' + data.mes + '"]').selected = true;
    document.querySelector("#month").disabled = true;
    document.querySelector('#year_date [value="' + data.year + '"]').selected = true;
    document.querySelector("#year_date").disabled = true;
    
}

function searchRFC(value){
    
        let rfc_data = {
            rfc : 'CAPM990520HA1',
            nombre : 'MANUEL',
            a_paterno : 'CHAVEZ',
            a_materno : 'PEREZ',
            dia : 20,
            mes : 5,
            year : 1999
        }

        if (rfc_data.rfc.includes(value)) {
            return rfc_data;
        } else {
            return null;
        }
}

/**
 * Function "getFormData" gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * returns {Object}
 */
const formId = "data_registro2"; // ID of the form
const url = location.href; //  href for the page

const form = document.querySelector("#data_registro2")
const formElements = form.elements;


const getFormData = () => {
    let data = { ["InsuredData"]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
    for (const element of formElements) {
      if (element.name.length > 0) {
        data["InsuredData"][element.name] = element.value;
      }
    }
    data["InsuredData"]["tipoPersona"] = tipoPersona;
    return data;
};

form.addEventListener('submit', toLoader)
function toLoader(evt) {
    evt.preventDefault();

    const rfcelmnt = document.querySelector("#rfcA");
    const nameelmnt = document.querySelector("#nombre");
    const patelmnt = document.querySelector("#paterno");
    const matelmnt = document.querySelector("#materno");
    const rfcval = rfcelmnt.value;
    const nameval = nameelmnt.value;
    const patval = patelmnt.value;
    const matval = matelmnt.value;
    const diaval = document.querySelector("#day").value;
    const mesval = document.querySelector("#month").value;
    const yearval = document.querySelector("#year_date").value;

    if (rfcval == "" || nameval=="" || patval=="" || matval=="" || diaval=="0" || mesval =="0" || yearval == "0") {    //Si el campo esta vacío = INVALIDO
        alert("Toda la información es necesaria")
        
    }else if (rfcelmnt.classList.contains("invalid") || nameelmnt.classList.contains("invalid") || patelmnt.classList.contains("invalid") || matelmnt.classList.contains("invalid")){
        alert("La información proporcionada no es válida")
    }else{
        let isAgeValid = ageCalc();
        if (!isAgeValid){
            return isAgeValid
        }
        data = getFormData();
        sessionStorage.setItem("InsuredData", JSON.stringify(data["InsuredData"]));
        window.location="./15-datos-inmueble.html"
    }
}