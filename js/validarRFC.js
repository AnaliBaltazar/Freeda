// EVENTO SELECCION DE CAMPOS DE TEXTO
const inputElement=document.querySelector('input#rfc')

    //EVENTO ONFOCUSOUT
    inputElement.addEventListener("focusout", validateInputValue); // AL SALIR DE LA SELECCION SE VALIDA LA INFORMACIÓN
    //////////////////////////////////////////////////////////////

    //EVENTO ONFOCUSIN - INVIERTE LA CLASE VALID-INVALID DEL CAMPO SELECCIONADO
    inputElement.addEventListener("focusin", cleanInput);

$('#rfc').on("change keyup paste", function(){
    document.querySelector("#nombre").value = "";
    document.querySelector("#paterno").value = "";
    document.querySelector("#materno").value = "";
    document.querySelector('#day [value="' + 0 + '"]').selected = true;
    document.querySelector('#month [value="' + 0 + '"]').selected = true;
    document.querySelector('#year [value="' + 0 + '"]').selected = true;
    document.querySelectorAll("input").forEach(input => input.disabled=false)
    document.querySelectorAll("select").forEach(select => select.disabled=false)
})

function cleanInput() {
    this.classList.remove("valid");
    this.classList.remove("invalid");
}

function validateInputValue(){
    const elmnt_value = this.value.toUpperCase();
    let reg, result, cautionTxt;
    if (elmnt_value == "") {    //Si el campo esta vacío = INVALIDO
        this.classList.add("invalid");
        appendText("Esta información es necesaria",this.parentNode.querySelector('.bottom-label1'));
    } else {
        reg=/^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?/g;
        result = elmnt_value.match(reg);
        cautionTxt = "El RFC ingresado no es válido";
        
        if (result != null) {
            this.classList.add("valid");
            this.classList.remove("invalid");
            setTimeout(() => {
                this.value=result;
                let busqueda = searchRFC(elmnt_value);
                if (busqueda != null) {
                    setRFCData(busqueda);
                }
            },2000);
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

function setRFCData(data){
    document.querySelector("#nombre").value = data.nombre;
    document.querySelector("#nombre").classList.add("valid");
    document.querySelector("#nombre").disabled = true;
    document.querySelector("#paterno").value = data.a_paterno;
    document.querySelector("#paterno").classList.add("valid");
    document.querySelector("#paterno").disabled = true;
    document.querySelector("#materno").value = data.a_materno;
    document.querySelector("#materno").classList.add("valid");
    document.querySelector("#materno").disabled = true;
    document.querySelector('#day [value="' + data.dia + '"]').selected = true;
    document.querySelector("#day").disabled = true;
    document.querySelector('#month [value="' + data.mes + '"]').selected = true;
    document.querySelector("#month").disabled = true;
    document.querySelector('#year [value="' + data.year + '"]').selected = true;
    document.querySelector("#year").disabled = true;
    /* document.querySelector("#cover.spinner_cover").style.display="none"
    document.querySelector("#spinner_screen").style.display="none" */
}

function searchRFC(value){
    /* document.querySelector("#cover.spinner_cover").style.display="block"
    document.querySelector("#spinner_screen").style.display="block" */
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
        /*document.querySelector("#cover.spinner_cover").style.display="none"
        document.querySelector("#spinner_screen").style.display="none" */
}