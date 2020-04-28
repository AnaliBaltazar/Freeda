function validarUsuario() {
    const validado = true;

    let usuario = document.querySelector('#login');
    let password = document.querySelector('#password');
    if (usuario.value.length > 0 && password.value.length > 0) {
        console.log(usuario.value.length)
        return true
    } else {
        document.querySelector(".texto_area_login#error").style.display = "block";
        return false
    }
}


