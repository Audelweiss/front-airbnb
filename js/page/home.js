"use strict";

import {
	avgReviews,
	generateRating,
	ajax,
	generateHtmlNotif,
} from "../utilities.js";
import Home from "../class/home.js";

/*************
 * VARIABLES
 *************/
let home;
const RATING = document.querySelector("ul#avg");
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
	RATING.innerHTML = generateRating(
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
	//gestion de l'affichage
	displayBreadcrumb();
	displayTitle();
	displayHost();
	review();
	document.querySelector("article>p:last-child").innerHTML = home.description;
}

/**
 * Gestion du vote de l'utilisateur qui envoie à l'API et affiche une notification
 */
async function vote() {
	const note = parseInt(document.querySelector(".note input:checked").value);
	try {
		const result = await ajax.post(
			"reviews",
			JSON.stringify({
				data: { note: note, home: id },
			}),
			true
		);
		if (result.data != null) {
			review();
			document.body.insertAdjacentElement(
				"beforeend",
				generateHtmlNotif("Votre note a bien été ajoutée.")
			);
		} else {
			document.body.insertAdjacentElement(
				"beforeend",
				generateHtmlNotif(
					"Un problème est survenu, veuillez réessayer ultérieurement.",
					"warning"
				)
			);
		}
	} catch (error) {
		alert("ERROR");
		console.error(
			"Une erreur est survenue dans la fonction vote() du fichier page/home.js : " +
				error
		);
	}
}

/*************
 * CODE PRINCIPAL
 *************/
//récupération de l'ID dans l'URL
const id = new URLSearchParams(window.location.search).get("id");
//affichage de la page
load();
//gestion de l'ajout du vote
document.querySelector("#vote").addEventListener("click", vote);
