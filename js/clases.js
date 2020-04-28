"use strict";

const class_btns = document.querySelectorAll(".button_sel");
class_btns.forEach(btn => btn.addEventListener('click', changeStyle));

function changeStyle(){     // CAMBIA LOS ESTILOS DE LOS BOTONES PARA SELECCION DE CLASE 
    //OTHER BUTTONS
    class_btns.forEach(button => {
        if(button.querySelector('.activeHover') == null) button.classList.add("activeHover");
        button.style.backgroundColor="white";
        button.style.borderColor="#C7C7C7"
        button.querySelector('h3').style.color="#989A9B";
        if(button.querySelector('h5') != null) button.querySelector('h5').style.color="#989A9B";
        const svgs = button.querySelectorAll("svg .cls-1");//Line 11 to 12 change SVG color to #707070
        svgs.forEach(element => element.style.fill="#989A9B");
        removeText(button);
    });
    //SELECTED BUTTON
    this.classList.remove("activeHover");
    this.style.backgroundColor="#912F46";
    this.style.borderColor="#F9919C"
    this.querySelector('h3').style.color="white";
    if(this.querySelector('h5') != null) this.querySelector('h5').style.color="white";
    const svgs = this.querySelectorAll("svg .cls-1"); //Line 19 to 20 change SVG color to 'white'
    svgs.forEach(element => element.style.fill="white");
    addText(this);

    /* nextPage(this); */
}

function addText (element){     // AGREGA TEXTO EN CLASE DE INMUEBLE
    let textElement = document.createElement("P");
    let acceptButton = document.createElement("button");
    let buttonText = document.createTextNode("ACEPTAR");
    let textContainer = document.createElement("DIV");
    textContainer.appendChild(textElement);
    textContainer.classList.add("textoContenedor")
    textContainer.appendChild(acceptButton);
    acceptButton.appendChild(buttonText);
    acceptButton.classList.add("Continuar");
    acceptButton.classList.add("Small");
    acceptButton.id="to_year";
    acceptButton.addEventListener('click', function(){
        toYear(element);
    });
    // acceptButton.addEventListener('click',nextPage);
    if (element.id === "interes" && element.parentNode.querySelector('.textoContenedor')==null) {
        const textContent=document.createTextNode("Vivienda construida en grupos. Acabados y materiales económicos.");
        textElement.appendChild(textContent);
        textElement.classList.add("textoClase");
        element.parentNode.insertBefore(textContainer,element.nextSibling);
        let altura = element.offsetHeight;
        let altura2 = element.parentNode.querySelector('.textoContenedor').offsetHeight;
        element.parentNode.style.height = altura + altura2 + "px";
    }
    if (element.id === "medio" && element.parentNode.querySelector('.textoContenedor')==null) {
        const textContent=document.createTextNode("Vivienda individual, Espacios diferenciados por sus usos: (sala, comedor, recámaras, cocina, baño). Acabados irregulares (mezclan acabados económicos, medios y altos)");
        textElement.appendChild(textContent);
        textElement.classList.add("textoClase");
        element.parentNode.insertBefore(textContainer,element.nextSibling);
        let altura = element.offsetHeight;
        let altura2 = element.parentNode.querySelector('.textoContenedor').offsetHeight;
        element.parentNode.style.height = altura + altura2 + "px";
    }
    if (element.id === "semilujo" && element.parentNode.querySelector('.textoContenedor')==null) {
        const textContent=document.createTextNode("Espacios diferenciados por sus usos: (sala, comedor, recámaras, cocina, baño). Acabados uniformes (únicamente acabados de semilujo).");
        textElement.appendChild(textContent);
        textElement.classList.add("textoClase");
        element.parentNode.insertBefore(textContainer,element.nextSibling);
        let altura = element.offsetHeight;
        let altura2 = element.parentNode.querySelector('.textoContenedor').offsetHeight;
        element.parentNode.style.height = altura + altura2 + "px";
    }
    if (element.id === "residencial" && element.parentNode.querySelector('.textoContenedor')==null) {
        const textContent=document.createTextNode("Espacios diferenciados por sus usos: (sala, comedor, recámaras, cocina, baño). Espacios extras para cubrir necesidades adicionales. Acabados uniformes (unicamente acabados de lujo).");
        textElement.appendChild(textContent);
        textElement.classList.add("textoClase");
        element.parentNode.insertBefore(textContainer,element.nextSibling);
        let altura = element.offsetHeight;
        let altura2 = element.parentNode.querySelector('.textoContenedor').offsetHeight;
        element.parentNode.style.height = altura + altura2 + "px";
    }
}

function removeText(element){   // REMUEVE EL ELEMENTO DE TEXTO EN LA CLASE DE INMUEBLE
    if (element.parentNode.querySelector('.textoContenedor') != null){
        element.parentNode.removeChild(element.parentNode.querySelector('.textoContenedor'));
        let altura = element.offsetHeight;
        element.parentNode.style.height = altura + "px";
    }
    
}
function toYear(elmnt) {
    localStorage.setItem('clase_propiedad',elmnt.id)
    window.location = "./11-años.html"
}