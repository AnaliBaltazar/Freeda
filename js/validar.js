// EVENTO SELECCION DE CAMPOS DE TEXTO
const inputElements=document.querySelectorAll('input');
inputElements.forEach(inputElement => {
    //EVENTO ONFOCUSOUT
    inputElement.addEventListener("focusout", validateInputValue); // AL SALIR DE LA SELECCION SE VALIDA LA INFORMACIÓN
    //////////////////////////////////////////////////////////////

    //EVENTO ONFOCUSIN - INVIERTE LA CLASE VALID-INVALID DEL CAMPO SELECCIONADO
    inputElement.addEventListener("focusin", cleanInput)
})

/*
    if(inputElement.className == 'data_input_usua valid'){
        inputElement.classList.remove("valid");
    }
    if(inputElement.className == 'data_input_usua invalid' ){
        inputElement.classList.remove("invalid");
    }
 */

function cleanInput() {
    this.classList.remove("valid");
    this.classList.remove("invalid");
}

function validateInputValue(){
    const elmnt_value = this.value;
    let reg, result, cautionTxt;
    if (elmnt_value == "") {    //Si el campo esta vacío = INVALIDO
        this.classList.add("invalid");
        appendText("Esta información es necesaria",this.parentNode.querySelector('.bottom-label1'));
    } else {
        if (this.id == "cp") {
            reg=/^\d{4,5}/g; //acepta 4 o 5 digitos
            cautionTxt = "El código postal es incorrecto";
            
        }else if (this.id == "telefono"){
            reg=/^\d{10}/g; //solo acepta 10 digitos
            cautionTxt = "Escribe tu número celular a 10 digitos";
        }else if (this.id == "correo"){
            reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            cautionTxt = "La cuenta de correo no es válida";
        }else if (this.id == "pass"){
            reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 
            cautionTxt = "La contraseña no es válida";
        }else if (this.id == "pass2"){
            if (elmnt_value == document.querySelector("#pass").value && document.querySelector("#pass").value != "")  {
                reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            } else {
                reg=/.^/;
            }
            cautionTxt = "Las contraseñas no coinciden";
        }else{  /*  */
            reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
            cautionTxt = "La información ingresada es incorrecta";
        }
        result = elmnt_value.match(reg);
        if (result != null) {
            this.classList.add("valid");
            this.classList.remove("invalid");
            
        }else{
            this.classList.add("invalid");
            this.classList.remove("valid");
            appendText(cautionTxt,this.parentNode.querySelector('.bottom-label1'));
        } 
    }
}

function appendText(texto, elemento){   //Funcion para agregar o modificar el texto del elemento dado
    elemento.textContent=texto;
}
