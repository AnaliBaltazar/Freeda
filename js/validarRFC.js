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
    document.querySelector("#cover").style.display="block"
    document.querySelector(".center_container").style.display="block"
    document.querySelector("#progress_loader").style.display="none"
    document.querySelector("#caption_loader").style.display="none"
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
                document.querySelector("#cover").style.display="none"
                document.querySelector(".center_container").style.display="none"
                document.querySelector("#progress_loader").style.display="block"
                document.querySelector("#caption_loader").style.display="block"
            },1500);
            
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

const form = document.querySelector("#data_registro")
form.addEventListener('submit', toLoader)
function toLoader(evt) {
    evt.preventDefault();
    const rfcval = document.querySelector("#rfc").value;
    const nameval = document.querySelector("#nombre").value;
    const patval = document.querySelector("#paterno").value;
    const matval = document.querySelector("#materno").value;
    const diaval = document.querySelector("#day").value;
    const mesval = document.querySelector("#month").value;
    const yearval = document.querySelector("#year").value;

    if (rfcval == "" || nameval=="" || patval=="" || matval=="" || diaval=="0" || mesval =="0" || yearval == "0") {    //Si el campo esta vacío = INVALIDO
        alert("Toda la información es necesaria")
        
    }else{
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
}