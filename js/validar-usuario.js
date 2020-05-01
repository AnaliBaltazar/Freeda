function validarUsuario(event) {
    event.preventDefault();
    const validado = true;

    let usuario = document.querySelector('#login');
    let password = document.querySelector('#password');
    document.querySelector("#cover").style.display="block";
    document.querySelector(".center_container").style.display="block";
    setTimeout(() => {
        if (usuario.value.length > 0 && password.value.length > 0) {

            window.location="./7-cp.html";
        } else {
            document.querySelector(".texto_area_login#error").style.display = "block";
        }
        document.querySelector("#cover").style.display="none";
        document.querySelector(".center_container").style.display="none";
    }, 3000);
    
}


