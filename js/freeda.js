$(document).ready(function(){
  $("#navbarCollapsible").on("hide.bs.collapse", function(){
    $(".boton-menu").html('<i class="material-icons icono-bm"> menu </i>');
  });
  $("#navbarCollapsible").on("show.bs.collapse", function(){
    $(".boton-menu").html('<i class="material-icons icono-bc"> close </i>');
  });
});


//CARRUSEL FREEDA
$(document).ready(function(){
  // Activate Carousel
  $("#myCarousel").carousel();
    
  // Enable Carousel Indicators
  $(".item1").click(function(){
    $("#myCarousel").carousel(0);
  });
  $(".item2").click(function(){
    $("#myCarousel").carousel(1);
  });
  $(".item3").click(function(){
    $("#myCarousel").carousel(2);
  });
  $(".item4").click(function(){
    $("#myCarousel").carousel(3);
  });
    
  // Enable Carousel Controls
  $(".carousel-control-prev").click(function(){
    $("#myCarousel").carousel("prev");
  });
  $(".carousel-control-next").click(function(){
    $("#myCarousel").carousel("next");
  });
});


//7-validar-token.html

//Event listener del boton de validación
$("#enviar").on("click", function(){
  $("#validar").hide();
  $("#formError").hide();
  let tokenValue = $("#token").val();
  let validation = validateToken(tokenValue);
  if (validation) {
    $("#validar").show();
  } else {
    $("#formError").show();
  }
});

//Función para validar el token ingresado
function validateToken(value) {
  let tokenBD = "123456" //Aqui guardar el número de token original
  let validation = value == tokenBD;
  return validation;
}
/*$(document).ready(Principal);
    function Principal(){
        var flag1 = true;
        $(document).on('keyup','[id=inputime1]',function(e){
            if($(this).val().length == 2 && flag1) {
                $(this).val($(this).val()+":");
                flag1 = false;
            }
        });
    }*/

    /* var tokenBD = "123456"
    var tokenInput = "123456"

    var validation = tokenInput == tokenBD;

    //CONDICION 
    if(validation == true){
        document.getElementById("validar");
    }else{
        document.getElementById("formError");
    } */

/*
function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
*/


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
    acceptButton.addEventListener('click',nextPage);
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





function addUnits(){   // AGREGA LAS UNIDADES DE SUPERFICIE AL SALIR DEL CAMPO DE TEXTO
    
    switch(inputElement.id) {
        case "superficie": //id="superficie" del INPUT de superficie.html
            inputElement.value=inputElement.value + " m²";
            break;
        case "terreno":
            inputElement.value=inputElement.value + " m²";
            break;
        default:
          // code block
    }
}