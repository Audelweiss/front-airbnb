"use strict";

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
