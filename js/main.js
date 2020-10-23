"use strict";

/*
1-Escribir serie en el input (recoger el valor que escriba el usuario?). Preparar evento para el boton con su funcion handler que hará que haga la llamada a la API.
2- Clickar en el boton. 
3- Desencadenar evento y funcion{
  -fetch para obtener datos
  -parsear datos del servidor
  -pintar resultados en la section del listado general.
  -cada elemento del array tiene un fondo de color que debe cambiar al llevarlo a favoritos.
}

4-marcar como favorita la serie seleccionada{
  -escuchar evento click en cada serie
  -guardar las favoritas en un array
  -añadirle la clase de favorita
}

6-Guardar las series favoritas en localStorage.


*/

const btnSearch = document.querySelector(".js-btn-search");

let generalList = [];

//recoge valor del input y pide datos a la api,guardandolos en un array.
function fetchData() {
  const textElement = document.querySelector(".js-text").value;

  fetch(`http://api.tvmaze.com/search/shows?q=${textElement}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        generalList[i] = data[i].show;
      }
      paintData();
    });
}

btnSearch.addEventListener("click", fetchData);

//pintar array en el html
