"use strict";
const btnSearch = document.querySelector(".js-btn-search");
const generalContainer = document.querySelector(".js-generalList-container");
const favoritesContainer = document.querySelector(".js-favorites-container");

btnSearch.addEventListener("click", fetchData);

let generalList = [];
let favoritesList = [];
getLocalStorage();
paintFavorites();

//Función para conectar con la API y recoger los datos que necesitamos

function fetchData() {
  const textElement = document.querySelector(".js-text").value;

  fetch(`//api.tvmaze.com/search/shows?q=${textElement}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      generalList = data;
      paintData();
      listenFavorites();
    });
}

//Función para pintar los resultados de la búsqueda en el html.

function paintData() {
  let html = "";
  for (let i = 0; i < generalList.length; i++) {
    html += `<li class= "js-listItem" id="${[generalList[i].show.id]}">`;
    html += `<h3 >${generalList[i].show.name}</h3>`;
    if (generalList[i].show.image === null) {
      html += `<img src="//via.placeholder.com/210x296/f0ffff/00008b/?text=No+image+available"/>`;
    } else {
      html += `<img  src="${generalList[i].show.image.medium}"/>`;
    }
    html += "</li>";
  }
  generalContainer.innerHTML = html;
}

//Función para escuchar el evento click sobre cada item del array principal.
function listenFavorites() {
  const listItems = document.querySelectorAll(".js-listItem");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favoritesItems);
  }
}

//Función para seleccionar las series favoritas a través del atributo id.

function favoritesItems(event) {
  const clickedElement = event.currentTarget;
  clickedElement.classList.toggle("favoriteColor-items");

  let idElement = clickedElement.getAttribute("id");

  //Llamo a la función pasandole por parámetro el id del elemento clicado.
  let existSerie = exitsFavorites(idElement);
  if (!existSerie) {
    for (let i = 0; i < generalList.length; i++) {
      if (generalList[i].show.id === parseInt(idElement)) {
        favoritesList.push(generalList[i]);
        paintFavorites();
      }
      setLocalStorage();
    }
  }
}

//Evalúa si el id de la serie seleccionada está seleccionada como favorita.
function exitsFavorites(id) {
  let exist = false;
  for (let i = 0; i < favoritesList.length; i++) {
    if (favoritesList[i].show.id == id) {
      exist = true;
    }
  }
  return exist;
}

function setLocalStorage() {
  localStorage.setItem("favoritesSeries", JSON.stringify(favoritesList));
}
function getLocalStorage() {
  favoritesList = JSON.parse(localStorage.getItem("favoritesSeries"));
  if (favoritesList === null) {
    favoritesList = [];
  }
  console.log(favoritesList);
}

//Función para pintar las series favoritas en el html.
function paintFavorites() {
  let htmlFavorites = "";

  for (let i = 0; i < favoritesList.length; i++) {
    htmlFavorites += `<li class= "js-listItem js-listenFavorites " id="${favoritesList[i].show.id}">`;
    htmlFavorites += `<h3 >${favoritesList[i].show.name}</h3>`;
    if (favoritesList[i].show.image === null) {
      htmlFavorites += `<img src="//via.placeholder.com/210x296/f0ffff/00008b/?text=No+image+available"/>`;
    } else {
      htmlFavorites += `<img  src="${favoritesList[i].show.image.medium}"/>`;
    }
    htmlFavorites += "</li>";
  }
  favoritesContainer.innerHTML = htmlFavorites;
}

function reset() {
  // favoritesList.splice(0, 1);
  favoritesList = [];
  paintFavorites();
  localStorage.removeItem("favoritesSeries");
}
const resetBtn = document.querySelector(".js__btn-reset");
resetBtn.addEventListener("click", reset);
