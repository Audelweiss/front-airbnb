"use strict";

import { avgReviews, generateRating, ajax } from "../utilities.js";
import Home from "../class/home.js";

/*************
 * VARIABLES
 *************/
let home;
/*************
 * FONCTIONS
 *************/

/**
 * Génère le breadcrumb avec le lien vers la liste des annonces par région
 */
function displayBreadcrumb() {
	document.querySelector(".breadcrumbs ul").insertAdjacentHTML(
		"beforeend",
		`<li><a href="list.html?region=${home.region.id}">${home.region.name}</a></li>
					<li>${home.title}</li>`
	);
}

/**
 * Affichage du titre et de la photo
 */
function displayTitle() {
	document.querySelector("h1").textContent = home.title;
	document.querySelector("figure img").src =
		"http://localhost:1337" + home.cover.src;
	document.querySelector("figure img").alt = home.cover.alt;
	if (home.cover.alt == "Photo de couverture de l'annonce") {
		document.querySelector("figcaption").innerHTML = "";
	} else {
		document.querySelector("figcaption").textContent = home.cover.alt;
	}
}

function displayHost() {
	const hostInfos = document.querySelector(".host-infos");
	hostInfos.querySelector("h4").textContent =
		home.host.firstname + " " + home.host.lastname.toUpperCase();
	hostInfos.querySelector("p").textContent = home.host.biography;
	hostInfos.querySelector("small span").textContent =
		home.host.createdAt.toLocaleDateString(undefined, {
			month: "long",
			year: "numeric",
		});
}

/**
 * Récupération de toutes les notes et affichage dans le HTML
 */
async function review() {
	const datasReviews = await ajax.get(
		"reviews?filters[home][id][$eq]=" + home.id
	);
	//affichage des étoiles
	document.querySelector("ul#avg").innerHTML = generateRating(
		avgReviews(datasReviews.data),
		"bg-slate-900"
	);
}

/**
 * Récupération des données de l'annonce
 */
async function load() {
	const datas = await ajax.get(`homes/${id}?populate=*`);
	home = new Home({ ...datas.data.attributes, id: datas.data.id });
	console.log(home);
	//gestion de l'affichage
	displayBreadcrumb();
	displayTitle();
	displayHost();
	review();
	document.querySelector("article>p:last-child").innerHTML = home.description;
}

/*************
 * CODE PRINCIPAL
 *************/
//récupération de l'ID dans l'URL
const id = new URLSearchParams(window.location.search).get("id");

load();
