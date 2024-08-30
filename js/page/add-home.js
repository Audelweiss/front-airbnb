"use strict";
import { ajax, generateHtmlNotif } from "../utilities.js";

/****************
 * VARIABLES
 ****************/
const form = document.querySelector("form");
const ulRegions = form.querySelector("#regions");
/****************
 * FONCTIONS
 ****************/

/**
 * Récupération des régions et affichage dans la `<select>`
 */
async function displayRegions() {
	const regions = await ajax.get("regions");
	let html = "";
	regions.data.forEach((region) => {
		html += `<option value="${region.id}">${region.attributes.label}</option>`;
	});
	ulRegions.innerHTML += html;
}

/**
 * Gestion de la prévisualisation de l'image
 * @param {File[]} file
 * @param {HTMLImageElement} outImage
 */
function loadimg(file, outImage) {
	if (FileReader && file && file.length) {
		const fr = new FileReader();
		fr.onload = function () {
			outImage.src = fr.result;
		};
		fr.readAsDataURL(file[0]);
	}
}

/**
 * Récupération des données du formulaire et envoi à l'api
 * @param {SubmitEvent} event
 */
async function submitForm(event) {
	event.preventDefault();
	try {
		const formdatas = new FormData();
		const file = form.elements.cover.files[0];
		formdatas.append(`files.cover`, file, file.name);
		formdatas.append(
			"data",
			JSON.stringify({
				title: form.elements.title.value,
				bed: form.elements.bed.value,
				description: form.elements.description.value,
				region: form.elements.region.value,
				host: 1, //en dur tant qu'on a pas l'authent
			})
		);
		//ajouter la vérification des données avant de faire l'AJAX
		const result = await ajax.post("homes", formdatas);
		if (result.data != null) {
			form.reset();
			document.body.insertAdjacentElement(
				"beforeend",
				generateHtmlNotif("Votre annonce a bien été ajoutée.")
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
		document.body.insertAdjacentElement(
			"beforeend",
			generateHtmlNotif(
				"Un problème est survenu, veuillez réessayer ultérieurement.",
				"warning"
			)
		);
		console.error(error);
	}
}

/****************
 * CODE PRINCIPAL
 ****************/

displayRegions();

//gestion de la soumission du formulaire
form.addEventListener("submit", submitForm);

//Gestion de la prévisualisation pour chaque élément du formulaire
//Pour Pierre : complexification via une boucle en prévision d'un formulaire avec beaucoup plus de champs 😅✌️
Array.from(document.querySelector("form").elements).forEach((element) => {
	const type =
		element.tagName.toLowerCase() == "input"
			? element.type.toLowerCase()
			: element.tagName.toLowerCase();
	document
		.querySelector(`#${element.id}`)
		.addEventListener("input", (event) =>
			document
				.querySelectorAll(`.${element.id}Preview`)
				.forEach((elementPreview) => {
					switch (type) {
						case "select":
							elementPreview.textContent =
								event.target.options[
									event.target.selectedIndex
								].textContent;
							break;
						case "file":
							loadimg(event.target.files, elementPreview);
							break;
						default:
							elementPreview.textContent = event.target.value;
					}
				})
		);
});
