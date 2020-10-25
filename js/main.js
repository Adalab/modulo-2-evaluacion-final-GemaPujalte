"use strict";

"use strict";
const btnSearch = document.querySelector(".js-btn-search");
const generalContainer = document.querySelector(".js-generalList-container");
const favoritesContainer = document.querySelector(".js-favorites-container");

let generalList = [];
let favoritesList = [];

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
btnSearch.addEventListener("click", fetchData);

//Función para pintar los resultados de la búsqueda

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
    console.log(generalList[i].show.id);
  }
  generalContainer.innerHTML = html;
}
//funcion para escuchar el evento click sobre cada item del array principal.
function listenFavorites() {
  const listItems = document.querySelectorAll(".js-listItem");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favoritesItems);
  }
}

//FUNCION PARA SELECCIONAR LAS SERIES FAVORITAS

function favoritesItems(event) {
  const clickedElement = event.currentTarget;
  clickedElement.classList.toggle("favoriteColor-items");
  console.log(clickedElement);

  let idElement = clickedElement.getAttribute("id");

  //Recorro el array principal
  for (let i = 0; i < generalList.length; i++) {
    if (generalList[i].show.id === parseInt(idElement)) {
      favoritesList.push(generalList[i]);
      paintFavorites();
    }
    setLocalStorage();
    //To DO LocalStorage
  }
}

function setLocalStorage() {
  localStorage.setItem("favoritesSeries", JSON.stringify(favoritesList));
}

function paintFavorites() {
  let htmlFavorites = "";

  for (let i = 0; i < favoritesList.length; i++) {
    htmlFavorites += `<li class= "js-listItem" id="${favoritesList[i].show.id}">`;
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
