// usuario logeado
var user;

// ---------------------------------------------------------------------------

function loginShowModal() {
    document.getElementById("login-form").style.display = 'block';
}

// ---------------------------------------------------------------------------

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// ---------------------------------------------------------------------------

function login() {
    var list_users = [];

    // obtenemos lista de usuarios almacenados en local storage
    var list_users = JSON.parse(localStorage.getItem("usuarios"));
    if (list_users == null) {
        swal("Por favor Regístrese!", "No hay usuarios registrados.", 'error');
    } else {
        // asignamos variables email y pass para buscar user;
        var email = document.getElementById('user').value,
            pass = document.getElementById('pass').value,
            user_id = buscarUser(list_users, email, pass);
        // console.log(user_id);
        // user_id devuelve la posicion del usuario en la lista o -1 si negativo            
        if (user_id != -1) {
            var usuario = list_users[user_id];
            //localStorage.clear('user');
            localStorage.setItem('user', usuario);
            console.log(usuario);
            var aa = localStorage.getItem("user");                     
            console.log( aa );
            swal('Bienvenido!', usuario.name + ' ' + usuario.lastname, 'success').then((value) => {
                var modal = document.getElementById('login-form');                
                var avatar = document.getElementById('user-container').getElementsByTagName('img')[0];                
                avatar.style.display = "block";                               
                modal.style.display = "none";
            });


        } else {
            swal('Error!', 'Error de inicio de sesión: dirección de correo desconocida o contraseña incorrecta', 'error')
        }
    }

}

// ---------------------------------------------------------------------------

function buscarUser(lista, email, pass) {
    user_id = -1;
    lista.some(function (user, index) {
        if (user.email == email && user.password == pass) {
            user_id = index;
            return true;
        }
    });
    return user_id;
}

// ---------------------------------------------------------------------------

function mostrarUsuario() {
    console.log('show user');
    user = localStorage.getItem('user');
   // user = JSON.parse(user);
   var a = JSON.parse(user.name);
   
    console.log(a);
    console.log(user);
    //swal(user.name);
    //localStorage.setItem('user', null);
    if (user != null) {

    } else {

    }
}

// ---------------------------------------------------------------------------