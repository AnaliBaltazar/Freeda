
const windowDir = window.location.href;
console.log(windowDir)
if (windowDir.match('index') != null ) {
  sessionStorage.clear();
}

$(document).ready(function(){
  $("#navbarCollapsible").on("hide.bs.collapse", function(){
    $(".boton-menu").html('<i class="material-icons icono-bm"> menu </i>');
  });
  $("#navbarCollapsible").on("show.bs.collapse", function(){
    $(".boton-menu").html('<i class="material-icons icono-bc"> close </i>');
  });

  //CARRUSEL FREEDA
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
$("#data_activar_token").on("submit", function(event){
  event.preventDefault();
  $("#validar").hide();
  $("#formError").hide();
  let tokenValue = $("#token").val();
  document.querySelector("#cover").style.display="block"
  document.querySelector(".center_container").style.display="block" 
  setTimeout(() => {
    let validation = validateToken(tokenValue);
    if (validation) {
      $("#validar").show();
      
      document.querySelector("#validar").style.zIndex="100"
      setTimeout(() => {
        document.querySelector("#cover").style.display="none"
        document.querySelector(".center_container").style.display="none" 
        window.location="./5-crear-usuario.html"
      }, 2000);
    } else {
      document.querySelector("#cover").style.display="none"
      document.querySelector(".center_container").style.display="none" 
      $("#formError").show();
      $("#nuevo-token").show();
    }
  }, 2000);
  
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
          document.querySelector("#"+parent_idVal_opt+".bubble").classList.toggle('show');
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