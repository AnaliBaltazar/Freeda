"use strict";
window.onload = function(){
    const userData= JSON.parse(sessionStorage.getItem("InsuredData")); // get and parse the saved data from localStorage
    const fechaContratacion = JSON.parse(sessionStorage.getItem("fechaContratacion"));
    const datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
    const datosAsegurado = JSON.parse(sessionStorage.getItem("InsuredData"));
    const datosInmueble = JSON.parse(sessionStorage.getItem("PropertyData"));
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]
    const fecha_inicio_vigencia = new Date(fechaContratacion.year,fechaContratacion.month,fechaContratacion.day+1);
    const fecha_termino_vigencia = new Date(fechaContratacion.year+1,fechaContratacion.month,fechaContratacion.day+1);
    const fecha_hoy = new Date();
    
    document.querySelector("#prop_street").innerHTML = datosInmueble.calle_inmueble.toUpperCase();
    document.querySelector("#prop_address").innerHTML = datosInmueble.colonia_inmueble.toUpperCase() + ", " + datosInmueble.estado_inmueble.toUpperCase();
    document.querySelector("#prop_street2").innerHTML = datosInmueble.calle_inmueble.toUpperCase();
    document.querySelector("#prop_address2").innerHTML = datosInmueble.colonia_inmueble.toUpperCase() + ", " + datosInmueble.estado_inmueble.toUpperCase();
    document.querySelector("#vigenciaI-principal").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + fechaContratacion.year;
    document.querySelector("#vigenciaF-principal").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + (fechaContratacion.year + 1);
    document.querySelector("#session-name").textContent=userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + "..."
    document.querySelector("#clientName-principal").textContent = userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + " " + userData.materno.toUpperCase(); 
    
    document.querySelector("#vigenciaI-sin1").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + fechaContratacion.year;
    document.querySelector("#vigenciaF-sin1").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + (fechaContratacion.year + 1);
    document.querySelector("#clientName-sin1").textContent = userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + " " + userData.materno.toUpperCase(); 
    
    document.querySelector("#vigenciaI-transfer").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + fechaContratacion.year;
    document.querySelector("#vigenciaF-transfer").innerHTML = "12 horas del<br>" + (fechaContratacion.day + 1) + " de " + months[fechaContratacion.month] + " del " + (fechaContratacion.year + 1);
    document.querySelector("#clientName-transfer").textContent = userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + " " + userData.materno.toUpperCase(); 

    if(sessionStorage.getItem("clabe")){
        document.querySelector("#numCuenta").textContent = sessionStorage.getItem("clabe").replace(/\d(?=\d{4})/g,"*");
        document.querySelector("#banco-transfer").textContent=sessionStorage.getItem("banco")
        document.querySelector("#cuenta-transfer").textContent=sessionStorage.getItem("clabe")
    }else{
        document.querySelector("#numCuenta").textContent = "Sin registro.";
        document.querySelector("#banco-transfer").textContent="Sin información."
        document.querySelector("#cuenta-transfer").textContent="Sin información."
    }
    if (sessionStorage.getItem('nuevaPoliza')) {
        document.querySelector("#cover").style.display="block";
        document.querySelector("#allset_screen").style.display="block";
    }else{
        document.querySelector("#cover").style.display="none";
        document.querySelector("#allset_screen").style.display="none";
    }
    if (fecha_hoy < fecha_inicio_vigencia || fecha_hoy >= fecha_termino_vigencia) {
        document.querySelector("#estatus-poliza i").textContent = "close";
        document.querySelector("#estatus-poliza h6").textContent = "SIN VIGENCIA";
        document.querySelector("#estatus-poliza").classList.remove("active-policy")
        document.querySelector("#estatus-poliza").classList.add("inactive-policy")
    }else{
        document.querySelector("#estatus-poliza i").textContent = "check";
        document.querySelector("#estatus-poliza h6").textContent = "VIGENTE";
        document.querySelector("#estatus-poliza").classList.add("active-policy")
        document.querySelector("#estatus-poliza").classList.remove("inactive-policy")
    }
}
const addAccount=document.querySelector("#add-btn");
addAccount.addEventListener('click', addBankAccount);

function addBankAccount() {
    document.querySelector("#cover").style.display="block";
    document.querySelector("#ready_screen1").style.display="block";
    document.querySelector("#nombre").value="";
    document.querySelector("#clabe").value="";
    document.querySelector("#select_banco").value="0";
}

// EVENTO SELECCION DE CAMPOS DE TEXTO EN PANTALLA AGREGAR CUENTA BANCARIA
const account_screen=document.querySelector("#ready_screen1");
const inputElements=account_screen.querySelectorAll('input');
inputElements.forEach(inputElement => {
    //EVENTO ONFOCUSOUT
    inputElement.addEventListener("focusout", validateInputValue); // AL SALIR DE LA SELECCION SE VALIDA LA INFORMACIÓN
    //////////////////////////////////////////////////////////////

    //EVENTO ONFOCUSIN - INVIERTE LA CLASE VALID-INVALID DEL CAMPO SELECCIONADO
    inputElement.addEventListener("focusin", cleanInput)
})
const wordElements=document.querySelectorAll('input.word');
wordElements.forEach(wordElement => {
    wordElement.addEventListener("keyup" , function(){
        this.value=removeNumbers(deleteSpecialChar(this.value));
    })
});
function cleanInput() {
    this.classList.remove("valid");
    this.classList.remove("invalid");
}

function validateInputValue(element){
    if (element.target) {
        element= this;
    }     
    const elmnt_value = element.value;
    let reg, reg2, result, result2, cautionTxt;
    if (elmnt_value == "") {    //Si el campo esta vacío = INVALIDO
        element.classList.add("invalid");
        appendText("Esta información es necesaria",element.parentNode.querySelector('.bottom-label1'));
    } else {
        if (element.id == "clabe"){
            reg=/^\d{18}/g; //solo acepta 10 digitos
            reg2=/(\d{9})\1/g;
            result = elmnt_value.match(reg);
            result2 = elmnt_value.match(reg2);
            if (result != null && result2 != null) {
                result = null;
            }
            cautionTxt = "La cuenta ingresada no es válida.";
            
        }else{  
            reg = /^[á-üa-zA-ZÁ-Ü][^0-9_!¡'\¬∞¢ºª°ı•£‰ç?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
            result = elmnt_value.match(reg);
            cautionTxt = "La información ingresada no es válida";
        }

        if (result != null) {
            element.classList.add("valid");
            element.classList.remove("invalid");
            
        }else{
            element.classList.add("invalid");
            element.classList.remove("valid");
            appendText(cautionTxt,element.parentNode.querySelector('.bottom-label1'));
            return true
        } 
    }
}

function appendText(texto, elemento){   //Funcion para agregar o modificar el texto del elemento dado
    elemento.textContent=texto;
}
function deleteSpecialChar(value) {
    return value.replace(/[`~!·€¬@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

function removeNumbers(value) {
    return value.replace(/\d/g, '');
}

// GUARDAR DATOS DE CUENTA BANCARIA
/* const save_btn = document.querySelector("#save-btn");
save_btn.addEventListener('click', saveData) */

function saveData(event) {
    event.preventDefault();
    let name = document.querySelector("#nombre")
    let account = document.querySelector("#clabe")
    let bank = document.querySelector("#select_banco").value
    let account_value=account.value;
    inputElements.forEach(inputElement => {
        validateInputValue(inputElement)
    });
    if (name.classList.contains("invalid") || account.classList.contains("invalid") || bank == "0") {
        return false
    } else {
        sessionStorage.setItem("clabe", account_value)
        sessionStorage.setItem("banco",bank)
        document.querySelector("#numCuenta").textContent = account_value.replace(/\d(?=\d{4})/g,"*")
        document.querySelector("#cover").style.display="none";
        document.querySelector("#ready_screen1").style.display="none";
        document.querySelector("#banco-transfer").textContent=bank
        document.querySelector("#cuenta-transfer").textContent=account_value
    }
}

const cerrar_btns=document.querySelectorAll(".cerrar")
cerrar_btns.forEach( cerrar => cerrar.addEventListener('click', closePopup));

function closePopup(){
    document.querySelector("#cover").style.display="none";
    this.parentNode.parentNode.parentNode.style.display="none";
}

// SECCION SINIESTRO
let temblo= true; //true
let reporte_listo=true; //false
let transfer=false; //false

const siniestro_btn=document.querySelector("#siniestro");
siniestro_btn.addEventListener('click', showSiniestro)
const reembolso_btn=document.querySelector("#reembolso-btn");
reembolso_btn.addEventListener('click',showReembolso)
const firma_btn=document.querySelector("#signature-btn");
firma_btn.addEventListener('click',showFirma)
function showSiniestro() {
    if (transfer == true) {
        showTransfer();
        return
    }
    if (temblo==true && reporte_listo==false) {
        document.querySelector("#cover").style.display="block"
        document.querySelector("#ready_screen2").style.display="block"
    } else if(temblo==true && reporte_listo == true){
        document.querySelector("#poliza-main").style.display="none"
        document.querySelector("#mis-polizas").style.display="none"
        document.querySelector(".seccion-suma").style.display="none"
        document.querySelector(".seccion-epicentro1").style.display="none"
        document.querySelector(".seccion-epicentro2").style.display="none"
        document.querySelector("#siniestro-listo").style.display="block"
        document.querySelector("#info-reporte").style.display="block"
        document.querySelector("#reembolsobtn-container").style.display="block"
        document.querySelector("#siniestro").style.color="#912f46" //
        document.querySelector("#poliza").style.color="#707070" //
    }
    document.querySelector("#siniestro").style.color="#912f46"
    document.querySelector("#coberturas").style.color="#707070"
    document.querySelector("#poliza").style.color="#707070"
}

function showReembolso() {
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#mis-polizas").style.display="none"
    document.querySelector(".seccion-suma").style.display="none"
    document.querySelector(".seccion-epicentro1").style.display="none"
    document.querySelector(".seccion-epicentro2").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="block"
    document.querySelector("#total-daños").style.display="block"
}

function showFirma() {
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#mis-polizas").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector(".seccion-suma").style.display="none"
    document.querySelector(".seccion-epicentro1").style.display="none"
    document.querySelector(".seccion-epicentro2").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="none"
    document.querySelector("#total-daños").style.display="none"
    document.querySelector("#contenedor-top").style.display="block"
    document.querySelector("#canvas").style.display="block"
    document.querySelector("#signature-pad-footer-container").style.display="block"
    resizeCanvas();
}

const transferOK_btn=document.querySelector("#si")
transferOK_btn.addEventListener('click', function(){
    if (sessionStorage.getItem("banco") == null || sessionStorage.getItem("clabe" == null)) {
        alert('Por favor, registra una cuenta para poder continuar.')
        addBankAccount();
    } else {
        transfer = true;
        showTransfer() 
    }
    
});
const transferNO_btn=document.querySelector("#no")
transferNO_btn.addEventListener('click', addBankAccount)

function showTransfer() {
    document.querySelector(".seccion-suma").style.display="none"
    document.querySelector(".seccion-epicentro1").style.display="none"
    document.querySelector(".seccion-epicentro2").style.display="none"
    document.querySelector("#poliza-main").style.display="none";
    document.querySelector("#mis-polizas").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none";
    document.querySelector("#info-reporte").style.display="none";
    document.querySelector("#reembolsobtn-container").style.display="none";
    document.querySelector("#reporte-daños").style.display="none";
    document.querySelector("#total-daños").style.display="none";
    document.querySelector("#contenedor-top").style.display="none";
    document.querySelector("#canvas").style.display="none";
    document.querySelector("#signature-pad-footer-container").style.display="none";
    document.querySelector("#seccion-tran1").style.display="none";
    document.querySelector("#seccion-tran2").style.display="none";
    document.querySelector("#seccion-tran3").style.display="none";
    document.querySelector("#seccion-btn").style.display="none";
    document.querySelector("p.texto-trans").innerHTML= "Será transferido a la cuenta proporcionada" + "<br/>" + sessionStorage.getItem("clabe") + "<br/>" + " el monto de " + sessionStorage.getItem("total-indemnizar") + " en un plazo de 3 a 5 días hábiles";;
    document.querySelector("#datos-poliza").style.display="block";
    document.querySelector("#transfer-msg").style.display="block";
    document.querySelector("#reporte_siniestro").style.display="flex";
    document.querySelector("#indemnizacion").style.display="flex";
}

//Selección Ver Mis Pólizas
const poliza_btn=document.querySelector("#poliza");
poliza_btn.addEventListener('click', showMisPolizas)

//Selección Póliza
const polizas_btns=document.querySelectorAll("table.lista-polizas tbody tr");
polizas_btns.forEach(poliza => poliza.addEventListener('click', showPoliza))

function showPoliza() {
    document.querySelector("#mis-polizas").style.display="none"
    document.querySelector("#poliza-main").style.display="block"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="none"
    document.querySelector("#total-daños").style.display="none"
    document.querySelector("#contenedor-top").style.display="none"
    document.querySelector("#canvas").style.display="none"
    document.querySelector("#signature-pad-footer-container").style.display="none"
    document.querySelector("#seccion-tran1").style.display="none"
    document.querySelector("#seccion-tran2").style.display="none"
    document.querySelector("#seccion-tran3").style.display="none"
    document.querySelector("#seccion-btn").style.display="none"
    document.querySelector("#datos-poliza").style.display="none"
    document.querySelector("#transfer-msg").style.display="none"
    document.querySelector(".seccion-suma").style.display="none"
    document.querySelector(".seccion-epicentro1").style.display="none"
    document.querySelector(".seccion-epicentro2").style.display="none"
    
}

function showMisPolizas() {
    document.querySelector("#mis-polizas").style.display="flex"
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="none"
    document.querySelector("#total-daños").style.display="none"
    document.querySelector("#contenedor-top").style.display="none"
    document.querySelector("#canvas").style.display="none"
    document.querySelector("#signature-pad-footer-container").style.display="none"
    document.querySelector("#seccion-tran1").style.display="none"
    document.querySelector("#seccion-tran2").style.display="none"
    document.querySelector("#seccion-tran3").style.display="none"
    document.querySelector("#seccion-btn").style.display="none"
    document.querySelector("#datos-poliza").style.display="none"
    document.querySelector("#transfer-msg").style.display="none"
    document.querySelector(".seccion-suma").style.display="none"
    document.querySelector(".seccion-epicentro1").style.display="none"
    document.querySelector(".seccion-epicentro2").style.display="none"
    document.querySelector("#siniestro").style.color="#707070"
    document.querySelector("#coberturas").style.color="#707070"
    document.querySelector("#poliza").style.color="#912f46"
}

//Selección Coberturas
const coberturas_btn=document.querySelector("#coberturas");
coberturas_btn.addEventListener('click', showCoberturas)

function showCoberturas() {
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#mis-polizas").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="none"
    document.querySelector("#total-daños").style.display="none"
    document.querySelector("#contenedor-top").style.display="none"
    document.querySelector("#canvas").style.display="none"
    document.querySelector("#signature-pad-footer-container").style.display="none"
    document.querySelector("#seccion-tran1").style.display="none"
    document.querySelector("#seccion-tran2").style.display="none"
    document.querySelector("#seccion-tran3").style.display="none"
    document.querySelector("#seccion-btn").style.display="none"
    document.querySelector("#datos-poliza").style.display="none"
    document.querySelector("#transfer-msg").style.display="none"
    document.querySelector(".seccion-suma").style.display="block"
    document.querySelector(".seccion-epicentro1").style.display="block"
    document.querySelector(".seccion-epicentro2").style.display="block"
    document.querySelector("#siniestro").style.color="#707070"
    document.querySelector("#poliza").style.color="#707070"
    document.querySelector("#coberturas").style.color="#912f46"
}

//Boton VER POLIZA de popup Todo Listo
const ver_dash_btn= document.querySelector("#verseguro");
ver_dash_btn.addEventListener('click', function(){
    sessionStorage.removeItem("nuevaPoliza")
    document.querySelector("#cover").style.display="none";
    document.querySelector("#allset_screen").style.display="none";
})

//Mostrar boton Cerrar sesión 

$("#profile").on( "click", function() {    
    $('.bubble_close').toggle();
});

$("#cerrar-sesion").on( "click", function() {
    sessionStorage.clear()    
    window.location="./index.html"
});

// Click en Iconos de la barra de menus
const header_btns=document.querySelectorAll(".Right i");
header_btns.forEach(icon_button => icon_button.addEventListener('click',changeStyle));

// Cambia el estilo de la seccion seleccionada en la barra de menus y permite visualizar su contenido
function changeStyle(){ 
    const thisId=this.id;
    const parent_idVal= this.parentNode.id; 
    this.classList.toggle('selected');
    this.nextSibling.classList.toggle('selected');
    document.querySelector("#"+parent_idVal+" .bubble").classList.toggle('show');
    // Deshace los cambios de estilo de los elementos que no estan seleccionados y oculta sus opciones
    header_btns.forEach(option => { 
        if(option.classList.contains('selected') && option.id!=thisId){
          option.classList.toggle('selected');
          option.nextSibling.classList.toggle('selected');
          const parent_idVal_opt=option.parentNode.id;
          console.log(parent_idVal_opt)
          document.querySelector("#" + parent_idVal_opt + " .bubble").classList.toggle('show');
        }
    });
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.Right i')) {
      let dropdowns = document.getElementsByClassName("bubble");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
      let options = document.querySelectorAll(".Right i")
      options.forEach(option => {
          if(option.classList.contains('selected')){
            option.classList.toggle('selected');
            option.nextSibling.classList.toggle('selected');
          }
        });
    }
}
