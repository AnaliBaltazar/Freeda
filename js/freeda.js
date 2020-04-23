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