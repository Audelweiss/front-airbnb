"use strict";

import Home from "../class/home.js";

const UL = document.querySelector("#home-list");

fetch("http://localhost:1337/api/homes?populate=*")
	.then((response) => response.json())
	.then((homes) => {
		console.log(homes);
		//création du tableau avec les objets formatés grâce à la classe Home
		const formattedHomes = homes.data.map(
			(home) => new Home({ ...home.attributes, id: home.id })
		);
		//Génération du HTML
		let html = "";
		for (const home of formattedHomes) {
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
									<span
										class="mask mask-star-2 bg-slate-100 w-6 aspect-square inline-block"
									></span>
									<span
										class="mask mask-star-2 bg-slate-100 w-6 aspect-square inline-block"
									></span>
									<span
										class="mask mask-star-2 bg-slate-100 w-6 aspect-square inline-block"
									></span>
									<span
										class="mask mask-star-2 bg-slate-100 opacity-50 w-6 aspect-square inline-block"
									></span>
									<span
										class="mask mask-star-2 bg-slate-100 opacity-50 w-6 aspect-square inline-block"
									></span>
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
		console.log(formattedHomes);
	});
