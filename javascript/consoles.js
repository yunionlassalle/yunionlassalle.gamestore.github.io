// variable para etiqueta ul content
var contenido;
// variable para saber que consola elegimos
var consolaId;

// ---------------------------------------------------------------------------

function inicializarConsolas() {
    // variable para etiqueta ul content
    contenido = document.getElementById('content');
    var request = requestJSON('jsons/game.json');

    request.onload = function () {
        var game = request.response;
        mostrarConsolas(game['console']);
        addclickConsolas(game['console']);

        if (getCookie("consola_id") == 0) {
            // game['console] obtiene arreglo de consolas + [0] obtiene estructura juego  +
            // ['game'] obtiene arreglo de juegos            
            mostrarJuegos(game['console'][0]['game'], 0);
        } else if (getCookie("consola_id") == 1) {
            mostrarJuegos(game['console'][1]['game'], 1);
        } if (getCookie("consola_id") == 2) {
            mostrarJuegos(game['console'][2]['game'], 2);
        }
    }
}

// ---------------------------------------------------------------------------
function mostrarConsolas(consolas) {
    consolas.forEach(function (consola, index) {
        // crear li dentro del ul
        var lista = crearLista(consola.id, 'game');
        // crear cada elemento dentro del li
        crearElemento(lista, 'img', 'img');
        crearElemento(lista, 'p', 'name');
        crearElemento(lista, 'p', 'descripcion');

        // arreglo con todos los li de clase game que representan las consolas DOM
        var game = document.getElementsByClassName('game');

        // asignar a cada variable un elementro dentro de la lista de consola DOM
        var img = game[index].getElementsByClassName('img');
        var name = game[index].getElementsByClassName('name');
        var descripcion = game[index].getElementsByClassName('descripcion');

        // rellenar datos de elementos de la lista de consola
        img[0].src = "images/console_" + consola.id + ".jpg";
        name[0].innerHTML = consola.name;
        descripcion[0].innerHTML = consola.descripcion;
    });
}
// ---------------------------------------------------------------------------

function addclickConsolas(consolas) {
    // lista de consola existente en DOM para agregar evento onclick
    var consolaHTML = document.getElementsByClassName("game");

    consolas.forEach(function (consola, index) {
        // asignamos evento click a cada lista de consola
        consolaHTML[index].addEventListener("click", function () {
            // console.log ('consolas');//array de consolas
            // console.log (consolas);
            // console.log ('consola');// cada elemento del array consolas (elemento consola)
            // console.log (consola);
            // console.log ('games');//array de juegos dentro de elemento consola
            // console.log (consola['game']);
            mostrarJuegos(consola['game'], index);
        });
    });
}

// ---------------------------------------------------------------------------

function mostrarJuegos(games, index) {
    // guardamos indice de la consola clickeada
    consolaId = index;
    // vaciamos la lista ul class=game
    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }
    // recorremos cada elemnto del arreglo juego
    games.forEach(function (juego, index) {
        // creamos li por cada juego dentro de ul
        var lista = crearLista(juego.id, 'game');
        console.log(lista);
        // arreglo que contiene los juegos
        var game = document.getElementsByClassName('game');
        // asignamos una variable id para cada juego
        var id = juego.id;
        if (juego.id < 10) {
            id = "0" + id;
        }
        // creamos cada elemento dentro del li
        console.log('contenido');
        console.log(contenido);
        var img = crearElemento(lista, 'img', 'img');
        var name = crearElemento(lista, 'p', 'name');
        var favorite = crearElemento(lista, 'div', 'favorite');
        favorite.setAttribute("id", "favorite_" + id);
        crearInput(favorite.id, 'checkbox', 'favorite' + id);
        var genre = crearElemento(lista, 'p', 'genre');
        var year = crearElemento(lista, 'p', 'year');
        var price = crearElemento(lista, 'p', 'price');
        var descripcion = crearElemento(lista, 'p', 'descripcion');

        // rellenamos los datos de cada lista de juegos 
        img.src = "images/game_0" + consolaId + "_" + id + "_01.jpg";
        name.innerHTML = juego.name;
        genre.innerHTML = juego.genre;
        year.innerHTML = juego.year;
        price.innerHTML = juego.price;
        descripcion.innerHTML = juego.description;
    });
    addclickGames(games);
}

// ---------------------------------------------------------------------------

function addclickGames(games) {
    //console.log(games);
    // lista de consola existente en DOM para agregar evento onclick
    var gamesHTML = document.getElementsByClassName("game");

    games.forEach(function (game, index) {
        // asignamos evento click a cada lista de game
        gamesHTML[index].addEventListener("click", function () {
            // console.log(games); //array de juegos
            // console.log(game); //el juego
            mostrarDetallesJuego(game, index);
        });
    });

}

// ---------------------------------------------------------------------------

function mostrarDetallesJuego(game) {
    // quitar css anterior game.css
    var head = document.getElementsByTagName("head")[0]; // var etiqueta head
    var gamecss = document.getElementById('gamecss'); // var etiqueta game css
    head.removeChild(gamecss);

    // asignar nuevo css game_description.css
    CargarCSS("css/game_description.css");

    // vaciamos la lista ul class=game
    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }

    // borramos titulo
    document.getElementById('titulo').remove();

    // creamos li para cada campo del juego
    //dar formato 0x donde (x = id)
    var id = game.id;
    if (game.id < 10) {
        id = "0" + id;
    }

    //name del juego
    var name = crearElemento(contenido, 'li', 'name'); {
        // titulo h1 name
        var name_titulo = crearElemento(name, 'h1', 'titulo');
    }
    var ratings = crearElemento(contenido, 'li', 'ratings'); {
        // 5 span ratings          
        var ratings_score = game.ratings[0]['score'];
        var ratings_count = game.ratings[0]['count'];
        var star1 = crearElemento(ratings, 'span', 'fa fa-star');
        var star2 = crearElemento(ratings, 'span', 'fa fa-star');
        var star3 = crearElemento(ratings, 'span', 'fa fa-star');
        var star4 = crearElemento(ratings, 'span', 'fa fa-star');
        var star5 = crearElemento(ratings, 'span', 'fa fa-star last');
        // console.log ("score: " + ratings_score + " count: " + ratings_count);
        // console.log (star1.className);
        //asignar de acuerdo a las valoraciones
        if (ratings_score >= 1) {
            star1.className += ' checked';
        }
        if (ratings_score >= 2) {
            star2.className += ' checked';
        }
        if (ratings_score >= 3) {
            star3.className += ' checked';
        }
        if (ratings_score >= 4) {
            star4.className += ' checked';
        }
        if (ratings_score >= 5) {
            star5.className += ' checked';
        }
        // console.log(ratings);
        // console.log(ratings.firstChild);
        // console.log(ratings.lastChild);
    }
    var genre = crearElemento(contenido, 'li', 'genre');
    var year = crearElemento(contenido, 'li', 'year');
    var linea = crearElemento(contenido, 'li', 'linea')
    var img = crearElemento(contenido, 'img', 'img');
    var descripcion = crearElemento(contenido, 'li', 'descripcion'); {
        var desc_p = crearElemento(descripcion, 'p', 'desc');
    }

    // rellenamos los datos de cada lista de juegos 
    name_titulo.innerHTML = game.name;
    console.log(game.ratings);
    ratings.innerHTML += ratings_count + " Ratings";
    genre.innerHTML = game.genre;
    year.innerHTML = game.year;
    linea.innerHTML = '<hr>';
    var path_img = "images/game_0" + consolaId + "_" + id + "_02.jpg";
    img.src = path_img;
    desc_p.innerHTML = game.long_description;

    // creamos boton absoluto para ir atras
    var atras_div = crearElemento(name, 'div', 'back-div'); {
        var atras = crearElemento(atras_div, 'img', 'back-btn');
        atras.src = "images/back.svg";
    }

    atras.onclick = function () {
        if (consolaId == 0) {
            document.cookie = "consola_id = 0";
        } else if (consolaId == 1) {
            document.cookie = "consola_id = 1";
        } else if (consolaId == 2) {
            document.cookie = "consola_id = 2";
        } else {        
        document.cookie = "consola_id = -1";
    }
    location.reload();
}
}

// ---------------------------------------------------------------------------

function requestJSON(json_path) {
    var json = new XMLHttpRequest();
    json.open('GET', json_path);
    json.responseType = 'json';
    json.send();
    return json;
}

// ---------------------------------------------------------------------------

function crearLista(id, clase) {
    var li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('class', clase);
    contenido.appendChild(li);
    return li;
}

// ---------------------------------------------------------------------------

function crearElemento(padre, tipo, clase) {
    //var padre = document.getElementById(padreid);
    var elemento = document.createElement(tipo);
    elemento.setAttribute('class', clase);
    if (clase === 'span') {
        elemento.innerHTML = "aaaa";
    }
    padre.appendChild(elemento);
    return elemento;
}

// ---------------------------------------------------------------------------

function crearInput(padreid, tipo, name) {
    var padre = document.getElementById(padreid);
    var label = document.createElement('label');
    var elemento = document.createElement('input');
    elemento.setAttribute('type', tipo);
    elemento.setAttribute('id', name);
    label.setAttribute('for', name);
    padre.appendChild(elemento);
    padre.appendChild(label);
}

// ---------------------------------------------------------------------------

function CargarCSS(css_file) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", css_file);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

// ---------------------------------------------------------------------------

function calcStars(score, count, new_score) {
    //console.log ("score: " + score + " count: " + count + " new score: " + new_score);
    var temp = score * count;
    //console.log ("temp: " + temp);
    return (temp + new_score) / (count + 1);
}

// ---------------------------------------------------------------------------

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

 // ---------------------------------------------------------------------------