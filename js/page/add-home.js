"use strict";
import { ajax } from "../utilities.js";

/****************
 * VARIABLES
 ****************/
const ulRegions = document.querySelector("form #regions");
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
		console.log(file, outImage);
		const fr = new FileReader();
		fr.onload = function () {
			outImage.src = fr.result;
		};
		fr.readAsDataURL(file[0]);
	}
}

/****************
 * CODE PRINCIPAL
 ****************/

displayRegions();

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
