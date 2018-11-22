var frame;

// ---------------------------------------------------------------------------

function calcHeight() {

    // reiniciar alto del iframe
    var content = document.getElementById('content');
    content.height = 50;
    console.log("content " + content.height);

    // var for the iframe
    frame = document.getElementById('content');

    //find the height of the internal page  AKI ESTA LA COSA FULA
    var the_height = frame.contentWindow.document.body.scrollHeight;
    console.log("the_height var " + the_height);

    //change the height of the iframe 
    content.height = the_height;
    console.log("content var " + content.height);

    //push footer to bottom
    if (document.body.scrollWidth < 576) {
        var header_height = document.getElementsByTagName("HEADER")[0].offsetHeight;
        document.getElementsByTagName("FOOTER")[0].style.top = the_height + header_height;
    } else {
        document.getElementsByTagName("FOOTER")[0].style.top = the_height;
    }
}

// ---------------------------------------------------------------------------

function activeLink() {
    // Get the container element
    var btnContainer = document.getElementById('cssmenu');

    // Get all buttons with class="btn" inside the container
    var menuItem = btnContainer.getElementsByClassName("item-list");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener("click", function () {
            // obtener elemento con clase 'active' 
            var current = document.getElementsByClassName("active");
            // eliminar clase activa de este elemento
            current[0].className = current[0].className.replace(" active", "");
            // si el elemento es de clase sub-item
            if (this.className.indexOf("sub-item") !== -1) {
                //obtener padre nivel 3
                var parentItem = this.parentElement.parentElement.parentElement.getElementsByClassName("item-list");
                parentItem[0].className += " active";

                // si el id del elemento clickeado es "console" subitem asigna respectivo valor a cookie
                if (this.id == "playstation") {
                    document.cookie = "consola_id = 0";
                } else if (this.id == "xbox") {
                    document.cookie = "consola_id = 1";
                } else if (this.id == "pc") {
                    document.cookie = "consola_id = 2";
                }
            } else {
                this.className += " active";
                document.cookie = "consola_id = -1";
            }
        });
    }
}

// ---------------------------------------------------------------------------

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

// ---------------------------------------------------------------------------

function hover(element) {
    element.setAttribute('src', 'images/user_orange.svg');
}

// ---------------------------------------------------------------------------

function unhover(element) {
    element.setAttribute('src', 'images/user_white.svg');
}

// ---------------------------------------------------------------------------

function imgClick() {
    alert("Su nombre es " + user.name);
}

// ---------------------------------------------------------------------------

