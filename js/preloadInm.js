"use strict";

window.onload = (event) => {
    const datosCotizador= JSON.parse(sessionStorage.getItem("datosCotizador"));
    const cp_input = document.querySelector("#cp");
    const edo_input = document.querySelector("#estado");
    const mpo_input = document.querySelector("#municipio");
    const colonia_input = document.querySelector("#colonia_inmueble");
    const calle_input = document.querySelector("#calle");
    let cpData;

    cp_input.disabled = true;
    edo_input.disabled = true;
    mpo_input.disabled = true;

    cp_input.value=datosCotizador.codigopostal;

    cpData = searchCP(datosCotizador.codigopostal);
    if (cpData != null) {
        edo_input.value = cpData.estado;
        mpo_input.value = cpData.municipio;
        setColonias(cpData.colonias)
    } else {
        
    }
    console.log(cpData);

    cp_input.addEventListener("focusout", function(){
        cpData = searchCP(this.value);
        if (cpData != null) {
            edo_input.value = cpData.estado;
            edo_input.classList.add("valid")
            edo_input.classList.remove("invalid")
            mpo_input.value = cpData.municipio;
            mpo_input.classList.add("valid")
            mpo_input.classList.remove("invalid")
            setColonias(cpData.colonias)
        } else {
            edo_input.value = "";
            edo_input.classList.remove("invalid")
            mpo_input.value = "";
            mpo_input.classList.remove("invalid")
        }
    })
}

function searchCP(code){
    const cpTest ={
        cp: "01550",
        estado: "Ciudad de México",
        municipio: "Álvaro Obregón",
        colonias: [
            "Ampliación Tepeaca",
            "Rinconada Las Cuevitas",
            "Tepeaca"
        ]
    }

    if (code == cpTest.cp) {
        return cpTest
    } else {
        return null
    }
}

function setColonias(colonias){
        //Buscar la cantidad de colonias en el CP y guardarlo en colonias_num
        const select = document.querySelector("#colonia_inmueble");
        const colonias_num=colonias.length;
        
        for (let i = 0; i < colonias_num; i++) {
            let opt = colonias[i];
            let el=document.createElement("option");
            el.textContent=opt;
            select.appendChild(el);
        }
}

/**
 * Function "getFormData" gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * returns {Object}
 */
/* const formId = "data_inmueble"; // ID of the form
const url = location.href; //  href for the page

const form = document.querySelector("#data_inmueble")
const formElements = form.elements;
console.log(formElements)

const getFormData = () => {
    let data = { ["propertyData"]: {} }; // create an empty object
    for (const element of formElements) {
        if (element.name.length > 0) {
            data["propertyData"][element.name] = element.value;
        }
    }
    return data;
}; */
