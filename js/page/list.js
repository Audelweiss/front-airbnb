"use strict";
/**********
 * IMPORTS
 **********/
import Home from "../class/home.js";
/**********
 * VARIABLES
 **********/

const UL = document.querySelector("#home-list");
/**********
 * FONCTIONS
 **********/

/**
 * Calcule la note moyenne pour une annonce
 * @param {object[]} reviews liste des reviews retournées brutes par l'API
 * @returns {number} Note moyenne pour la maison
 */
function avgReviews(reviews) {
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
function generateRating(moy) {
	let html = "<small><i>Pas encore de note</i></small>";
	if (!isNaN(moy)) {
		html = "";

		for (let i = 0; i < 5; i++) {
			console.log(moy > i);
			html += `<span
										class="mask mask-star-2 bg-slate-100 w-6 aspect-square inline-block ${
											moy > i ? "" : "opacity-50"
										}"
									></span>`;
		}
	}
	return html;
}

/**********
 * CODE PRINCIPAL
 **********/

fetch("http://localhost:1337/api/homes?populate=*")
	.then((response) => response.json())
	.then(async (homes) => {
		//récupération des notes
		const reviewsResponse = await fetch(
			"http://localhost:1337/api/reviews?populate=*"
		);
		const reviewsDatas = await reviewsResponse.json();

		//création du tableau avec les objets formatés grâce à la classe Home
		const formattedHomes = homes.data.map(
			(home) => new Home({ ...home.attributes, id: home.id })
		);
		let html = "";
		for (const home of formattedHomes) {
			//récupère les reviews de la maison
			const homeReviews = reviewsDatas.data.filter(
				(review) => review.attributes.home.data.id == home.id
			);

			//Génération du HTML
			html += `<li class="card-home w-1/2 md:w-1/4 lg:w-1/5 px-3">
						<a
							href="home.html?id=${home.id}"
							class="w-full h-full flex items-end text-white bg-[url('http://localhost:1337${
								home.cover.src
							}')] overflow-hidden rounded-lg"
						>
							<article
								class="pt-8 p-4 bg-gradient-to-b from-transparent to-neutral-950 w-full"
							>
								<h2>${home.title}</h2>
								<div class="rating">
									${generateRating(avgReviews(homeReviews))} 
								</div>
								<div class="host">
									<div class="avatar placeholder mr-1">
										<div
											class="bg-neutral text-neutral-content w-6 rounded-full"
										>
											<span class="text-xs">${
												home.host.firstname.charAt(0) +
												home.host.lastname.charAt(0)
											}</span>
										</div>
									</div>
									<span>Hôte : ${home.host.firstname}</span>
								</div>
							</article>
						</a>
					</li>`;
		}
		//injection du HTML dans la liste UL
		UL.innerHTML = html;
		console.log(" ==== Maisons formatées ====", formattedHomes);
	});
