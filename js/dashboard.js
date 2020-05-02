"use strict";
window.onload = function(){
    if(localStorage.getItem("clabe")){
        document.querySelector("#numCuenta").textContent = localStorage.getItem("clabe");
    }else{
        document.querySelector("#numCuenta").textContent = "No hay una cuenta dada de alta.";
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

// EVENTO SELECCION DE CAMPOS DE TEXTO
const inputElements=document.querySelectorAll('input');
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
        localStorage.setItem("clabe", account_value.replace(/\d(?=\d{4})/g,"*"))
        document.querySelector("#numCuenta").textContent = account_value.replace(/\d(?=\d{4})/g,"*")
        document.querySelector("#cover").style.display="none";
        document.querySelector("#ready_screen1").style.display="none";
    }
}

function closePopup(){
    document.querySelector("#cover").style.display="none";
    document.querySelector("#ready_screen1").style.display="none";
}