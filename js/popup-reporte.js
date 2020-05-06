"use strict";

// EVENTO CLIC EN BOTONES BIENES DEL INQUILINO
const bien_inquilino = document.querySelectorAll('.bien');
bien_inquilino.forEach(bien => bien.addEventListener('click', openValueModifier));

// EVENTO CLIC EN BOTON ACEPTAR
const aceptar_inquilino = document.querySelectorAll('button.Aceptar');
aceptar_inquilino.forEach(aceptar => aceptar.addEventListener('click', updateValue));

 // EVENTO - CLIC EN BOTON INCREMENTAR
 const incButton = document.querySelectorAll('.btn-plus');
 incButton.forEach(inc_button => inc_button.addEventListener('click', incrementar));
 
 // EVENTO - CLIC EN BOTON DECREMENTAR
 const decButton = document.querySelectorAll('.btn-minus');
 decButton.forEach(dec_button => dec_button.addEventListener('click', decrementar));
 
 // CAMBIO DE VALOR EN CUADRO DE TEXTO DE MONTO DE LOS BIENES
 $("input[data-type='currency']").on({
     keyup: function() {
         formatCurrency(this,0);
     }
 });

 //Click en boton cerrar
const cerrarD_btns=document.querySelectorAll("i#close");
if(cerrarD_btns!=null){
    cerrarD_btns.forEach(button => button.addEventListener("click",closePopup));
}

function closePopup(){
    document.querySelector("#cover").style.display="none";
    this.parentNode.style.display="none";
}

function openValueModifier(){  // Activa ventana para editar valor de los bienes del inquilino.

    //OTHER BUTTONS     -  ACTIVAR En caso de querer que solo se muestre el banner del boton seleccionado
    /* bien_inquilino.forEach(button => {
        if(button.querySelector('.activeHover') == null) button.classList.add("activeHover");
        button.querySelector('.banner_inq').style.display = "none";
        button.querySelector('h3').style.color = "#989A9B"
        button.style.borderColor = "#C7C7C7";
    }); */
    this.querySelector('.banner_inq').style.display = "block";
    this.querySelector('h3').style.color = "#912F46"
    this.querySelector('svg').classList.add("ico_selected");
    this.style.borderColor = "#912F46";
    this.classList.remove("activeHover");
    
    document.querySelector('#cover').style.display = "block";
    let bien_id= this.id;
    switch(bien_id){
        case "hospedaje":
            document.querySelector("#screen_hospedaje").style.display="block";
            break;
        case "electrodomesticos":
            document.querySelector("#screen_electrodomesticos").style.display="block";
            break;
        case "cristales":
            document.querySelector("#screen_cristales").style.display="block";
            break;
        case "paredes":
            document.querySelector("#screen_paredes").style.display="block";
            break;
        default:
    }
}
function updateValue(){  //Actualiza el valor en el banner correspondiente al boton seleccionado
    document.querySelector('#cover').style.display = "none";
    let boton_id=this.id;
    let boton_idLast= boton_id.substring(boton_id.length - 1);
    let newVal = this.parentNode.querySelector(".quantity-field").value;
    let newValOK = checkTotal(newVal,boton_idLast);
    if (newValOK) {
        switch(boton_id){
            case "aceptar-h":
                document.querySelector("#banner_val_h").textContent=document.querySelector("#valueQty_h").value
                break;
            case "aceptar-e":
                document.querySelector("#banner_val_e").textContent=document.querySelector("#valueQty_e").value
                break;
            case "aceptar-c":
                document.querySelector("#banner_val_c").textContent=document.querySelector("#valueQty_c").value
                break;
            case "aceptar-p":
                document.querySelector("#banner_val_p").textContent=document.querySelector("#valueQty_p").value
                break;
            default:
        }
    } 
    this.parentNode.style.display="none";
    // setTotal();
}

function checkTotal(newVal, elmntID) {
    const banners=document.querySelectorAll(".banner_inq");
    let valuesbanner=0;
    let valuebanner,actual, actualInt;
    let result, funcresult;
    let intresult=0;
    let reg=/\d+(\.\d{2})?|\.\d{2}/g;
    banners.forEach(banner => {
        if (banner.id != ("banner_val_" + elmntID)) {
            valuebanner=banner.textContent;
            result = valuebanner.match(reg);
            intresult = intresult + parseInt(result.join(""));
        }else{
            actual=banner.textContent;
            actualInt=parseInt(actual.match(reg).join(""));
        }
    });
    let newValINT=parseInt(newVal.match(reg).join(""));

    if ((intresult+newValINT) > 1500) {
        intresult = intresult + actualInt;
        alert("No puedes reportar una cantidad mayor a la indemnización máxima");
        funcresult = false;
    } else {
        intresult = intresult + newValINT;
        funcresult = true;
    }
    let totalBienesC="$ " + formatNumber(intresult.toString());
    document.querySelector('#total-gastos').textContent= "Suma total de gastos: " + totalBienesC;
    return funcresult;
}
function setTotal() {
    const banners=document.querySelectorAll(".banner_inq");
    let valuesbanner=0;
    let valuebanner;
    let decimal_pos;
    let left_side;
    let result;
    let intresult=0;
    let reg=/\d+(\.\d{2})?|\.\d{2}/g;
    banners.forEach(banner => {
        valuebanner=banner.textContent;
        if (valuebanner.indexOf(".") >= 0) {
            decimal_pos = valuebanner.indexOf(".");
            left_side = valuebanner.substring(0, decimal_pos);
        }else{
            left_side=valuebanner;
        }
        result = left_side.match(reg);
        intresult = intresult + parseInt(result.join(""));

    });
    let totalBienesC="$ " + formatNumber(intresult.toString());
    document.querySelector('#total-gastos').textContent= "Suma total de gastos: " + totalBienesC;
}

function incrementar(){  //Incrementa en $1 el valor del bien al presionar el boton "+"
    formatCurrency(this.parentNode.querySelector('input'),10);
}

function decrementar(){  //Decrementa en $1 el valor del bien al presionar el boton "-"
    formatCurrency(this.parentNode.querySelector('input'),-10);
}

function formatCurrency(input, incdec) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.value;
    
    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;
    
    // initial caret position 
    var caret_pos = input.  selectionStart;
    
    // Add $10 if "PLUS" button is clicked
    // Reduce by $10 if "MINUS" button is clicked
    let reg=/\d+(\.\d{2})?|\.\d{2}/g;
    let result = (input_val.match(reg) != null) ? input_val.match(reg) : ["0"];
    let intresult = parseInt(result.join("")) + incdec;
    if (intresult<=0) {
        input.value="$ 0";
        return
    } else if (intresult > 1500){
        intresult=1500;
        alert("No puedes reportar una cantidad mayor a la indemnización máxima")
    }
    input_val=intresult.toString();
    
    // add commas to left side of number
    input_val = formatNumber(input_val);
    
    // join number
    input_val = "$ " + input_val;// + "." + right_side;
    
    // send updated string to input
    input.value=input_val;
            
    // put caret back in the right position
    var updated_len = input_val.length;
    
    if(incdec==0){
        caret_pos = updated_len - original_len + caret_pos;
        input.setSelectionRange(caret_pos, caret_pos);
    }
}

function formatNumber(n) {
    // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/^0+/,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")    
  }