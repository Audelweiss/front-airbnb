"use strict";

export function openCloseMenuMobile() {
	document
		.querySelector("#" + this.dataset.collapseToggle)
		.classList.toggle("hidden");
}
