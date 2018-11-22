// ---------------------------------------------------------------------------

function register() {

    var name = document.getElementById("user").value,
        apell = document.getElementById("apellido").value,
        email = document.getElementById("email").value,
        pass = document.getElementById("pass").value,
        passconf = document.getElementById("confirm").value;

    if (!isEmpty(name) && !isEmpty(apell) && !isEmpty(email) && !isEmpty(pass) &&
        !isEmpty(passconf)) {
        if (validarEmail() && validarPassword()) {
            if (storeUser()) {
                swal('Todo un éxito!', 'Su usuario ha sido agregado satisfactoriamente', 'success');
                window.location.href = "index.html";
            } else {
                swal('ATENCIÓN!', "Ya existe un usuario registrado con este email", "warning");
            }
        }
    }
    else {
        swal("ERROR!", "Debe llenar todos los datos", "error");
    }

}

// ---------------------------------------------------------------------------

function isEmpty(elemValue) {
    if ((elemValue == "") || (elemValue == null)) {
        return true;
    } else {
        return false;
    }
}

// ---------------------------------------------------------------------------

function validarEmail() {
    email = document.getElementById("email").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        swal("ATENCIÓN!", "Debe introducir una dirrección de correo válida", "warning");
        return false;
    } else {
        return true;
    }
}

// ---------------------------------------------------------------------------

function validarPassword() {
    var pass = document.getElementById("pass").value,
        passconf = document.getElementById("confirm").value;

    if (!(pass.isEmpty && passconf.isEmpty))
        if (pass != passconf) {
            swal("ERROR!", "La contraseña debe coincidir", "error");
            return false;
        } else {
            if (pass.length < 8) {
                swal("Consejo", "Debe asignar una contraseña más larga", "warning");
                return false;
            } else {
                return true;
            }
        }
}

// ---------------------------------------------------------------------------

function storeUser() {
    // console.log("empieza storeUser");
    var name = document.getElementById("user").value,
        apell = document.getElementById("apellido").value,
        email = document.getElementById("email").value,
        pass = document.getElementById("pass").value,
        user = {
            name: name,
            lastname: apell,
            email: email,
            password: pass
        },
        list_users = [];

    // obtenemos lista de usuarios almacenados en local storage
    var list_users = JSON.parse(localStorage.getItem("usuarios"));
    if (list_users == null) {
        list_users = [];
    }

    // verificamos si no hay usuarios registrados con este email
    if (verificarDuplicado(list_users, email)) {
        // console.log("devuelvo valor falso porque no almacene na");
        return false;
    } else {
        // si no esta registrado procedemos a hacerlo
        list_users.push(user);
        var myJSON = JSON.stringify(list_users);
        localStorage.setItem("usuarios", myJSON);
        // console.log("todo esta happy");
        return true;
    }
}
//Storing data:


// ---------------------------------------------------------------------------

function verificarDuplicado(usuario, email) {
    var duplicado = false;
    usuario.some(function (user) {

        if (user.email == email) {
            duplicado = true;
            // console.log("user duplicado");
            return true;
        }
    });
    if (duplicado)
        return true;
    else
        return false;
}

// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------