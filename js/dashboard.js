"use strict";
window.onload = function(){
    const userData= JSON.parse(sessionStorage.getItem("InsuredData")); // get and parse the saved data from localStorage
    const fechaContratación = JSON.parse(sessionStorage.getItem("fechaContratacion"));
    const datosCotizador = JSON.parse(sessionStorage.getItem("datosCotizador"));
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    
    
    document.querySelector("#vigenciaI").innerHTML = "12 horas del<br>" + (fechaContratación.day + 1) + " de " + months[fechaContratación.month] + " del " + fechaContratación.year;
    document.querySelector("#vigenciaF").innerHTML = "12 horas del<br>" + (fechaContratación.day + 1) + " de " + months[fechaContratación.month] + " del " + (fechaContratación.year + 1);
    document.querySelector("#session-name").textContent=userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + "..."
    document.querySelector("#clientName").textContent = userData.nombre.toUpperCase() + " " + userData.paterno.toUpperCase() + " " + userData.materno.toUpperCase(); 
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

function cleanInput() {
    this.classList.remove("valid");
    this.classList.remove("invalid");
}

function validateInputValue(element){
    if (element.target) {
        element= this;
    }     
    const elmnt_value = element.value;
    let reg, result, cautionTxt;
    if (elmnt_value == "") {    //Si el campo esta vacío = INVALIDO
        element.classList.add("invalid");
        appendText("Esta información es necesaria",element.parentNode.querySelector('.bottom-label1'));
    } else {
        if (element.id == "clabe"){
            reg=/^\d{18}/g; //solo acepta 10 digitos
            result = elmnt_value.match(reg);
            cautionTxt = "Escribe los 18 digitos de tu cuenta CLABE";
        }else{  
            reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
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
let temblo= true;
let reporte_listo=false;
let transfer=false;

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
        document.querySelector("#siniestro-listo").style.display="block"
        document.querySelector("#info-reporte").style.display="block"
        document.querySelector("#reembolsobtn-container").style.display="block"
        document.querySelector("#siniestro").style.color="#912f46" //
        document.querySelector("#poliza").style.color="#707070" //
    }
}

function showReembolso() {
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="block"
    document.querySelector("#total-daños").style.display="block"
}

function showFirma() {
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
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
    transfer = true;
    showTransfer()
});
const transferNO_btn=document.querySelector("#no")
transferNO_btn.addEventListener('click', addBankAccount)

function showTransfer() {
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
    document.querySelector("p.texto-trans").innerHTML= "Se ha transferido a la cuenta " + "<br/>" + sessionStorage.getItem("clabe") + "<br/>" + " el monto de " + sessionStorage.getItem("total-indemnizar");
    document.querySelector("#datos-poliza").style.display="block"
    document.querySelector("#transfer-msg").style.display="block"
}

//Selección Póliza
const poliza_btn=document.querySelector("#poliza");
poliza_btn.addEventListener('click', showPoliza)

function showPoliza() {
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
    document.querySelector("#siniestro").style.color="#707070"
    document.querySelector("#poliza").style.color="#912f46"
}

//Boton VER POLIZA de popup Todo Listo
const ver_dash_btn= document.querySelector("#verseguro");
ver_dash_btn.addEventListener('click', function(){
    document.querySelector("#cover").style.display="none";
    document.querySelector("#allset_screen").style.display="none";
})
