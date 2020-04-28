// EVENTO SELECCION DE CAMPOS DE TEXTO
const inputElements=document.querySelectorAll('input');
inputElements.forEach(inputElement => {
    //EVENTO ONFOCUSOUT
    inputElement.addEventListener("focusout", validateInputValue); // AL SALIR DE LA SELECCION SE VALIDA LA INFORMACIÓN
    //////////////////////////////////////////////////////////////

    //EVENTO ONFOCUSIN - INVIERTE LA CLASE VALID-INVALID DEL CAMPO SELECCIONADO
    inputElement.addEventListener("focusin", cleanInput)
})

/* const userform=document.querySelector('#data_crear_usua')
userform.addEventListener('submit', validatePassword) */

function cleanInput() {
    if (this.classList.contains("valid") && (this.id == "superficie" || this.id == "terreno")) {
        this.value = parseFloat(this.value);
    }
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
            result = elmnt_value.match(reg);
            cautionTxt = "El código postal no es válido";
        }else if (this.id == "telefono"){
            reg=/^\d{10}/g; //solo acepta 10 digitos
            result = elmnt_value.match(reg);
            cautionTxt = "Escribe tu número celular a 10 digitos";
        }else if (this.id == "correo"){
            reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            result = elmnt_value.match(reg);
            cautionTxt = "La cuenta de correo no es válida";
        }else if (this.id == "pass"){
            reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 
            result = elmnt_value.match(reg);
            cautionTxt = "La contraseña no es válida";
        }else if (this.id == "pass2"){
            if (elmnt_value == document.querySelector("#pass").value && document.querySelector("#pass").value != "")  {
                reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            } else {
                reg=/.^/;
            }
            result = elmnt_value.match(reg);
            cautionTxt = "Las contraseñas no coinciden";
        }else if (this.id == "year") {
            reg=/^\d{4}/g; //acepta 4 o 5 digitos
            result = elmnt_value.match(reg);
            let int_result=parseInt(result);
            let d = new Date();
            let n = d.getFullYear();
            if (result !=null && (int_result <1950 || int_result > n)){
                result = null;
                cautionTxt = "El año de construción debe ser entre 1950 y " + n;
            } else {
                cautionTxt = "La información ingresada no es válida";
            }   
        }else if (this.id == "superficie" || this.id == "terreno"){
            reg=/^\d*$/; //solo acepta numeros
            result = elmnt_value.match(reg);
            if (result != null) {
                this.value = elmnt_value + " m²";
            }
            cautionTxt = "Ingresa solo números para la superficie";
        }else{  /*  */
            reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
            result = elmnt_value.match(reg);
            cautionTxt = "La información ingresada no es válida";
        }

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




