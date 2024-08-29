"use strict";
import AJAX from "./class/ajax.js";

export function openCloseMenuMobile() {
	document
		.querySelector("#" + this.dataset.collapseToggle)
		.classList.toggle("hidden");
}

/**
 * Calcule la note moyenne pour une annonce
 * @param {object[]} reviews liste des reviews retournées brutes par l'API
 * @returns {number} Note moyenne pour la maison
 */
export function avgReviews(reviews) {
	//sommes des notes
	const reviewsFormatted = reviews.reduce(
		(previous, current) => previous + current.attributes.note,
		0
	);
	//retourne la moyenne arrondie à l'entier le plus proche
	return Math.round(reviewsFormatted / reviews.length);
}

/**
 * Génère l'affichage des notes d'une annonce
 * @param {number} moy
 * @returns {string} HTML de l'affichage de la note soit sous forme de message soit les étoiles
 */
export function generateRating(moy, color = "bg-slate-100") {
	let html = "<small><i>Pas encore de note</i></small>";
	if (!isNaN(moy)) {
		html = "";

		for (let i = 0; i < 5; i++) {
			html += `<span
										class="mask mask-star-2 ${color} w-6 aspect-square inline-block ${
				moy > i ? "" : "opacity-50"
			}"
									></span>`;
		}
	}
	return html;
}

/**
 * Générer une notification en bas de page qui disparait après 3 secondes
 * @param {string} message
 * @param {string} mode
 * @returns {HTMLDivElement} La balise html à injecter dans le contenu
 */
export function generateHtmlNotif(message, mode = "info") {
	//------création des différentes balises
	//toast container
	const divToast = document.createElement("div");
	divToast.classList.add("toast");
	//div à l'intérieur qui va contenir le contenu
	const divAlert = document.createElement("div");
	divAlert.classList.add("alert", `alert-${mode}`);
	//contenu de la notification
	const progress = document.createElement("progress");
	progress.classList.add("progress", "w-full");
	progress.value = 100;
	progress.max = 100;
	const span = document.createElement("span");
	span.textContent = message;
	//injection des balises les unes dans les autres
	divAlert.appendChild(progress);
	divAlert.appendChild(span);
	divToast.appendChild(divAlert);

	//------ animation/disparition de la notif
	//dégression de la progressbar
	const idInterval = setInterval(() => (progress.value -= 1), 30);
	//disparition de la notif
	setTimeout(() => {
		clearInterval(idInterval);
		divToast.remove();
	}, 3000);

	return divToast;

	// return `<div class="toast">
	// 					<div class="alert alert-${mode}">
	// 					<progress class="progress w-full" value="0" max="100"></progress>
	// 						<span>${message}</span>
	// 					</div>
	// 				</div>`;
}

//objet qui va nous permettre de faire les appels AJAX
export const ajax = new AJAX("http://localhost:1337/api/");
