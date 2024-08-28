"use strict";
/**********
 * IMPORTS
 **********/
import Home from "../class/home.js";
import { avgReviews, generateRating } from "../utilities.js";
/**********
 * VARIABLES
 **********/

const UL = document.querySelector("#home-list");
/**********
 * FONCTIONS
 **********/

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
