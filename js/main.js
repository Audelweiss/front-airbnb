"use strict";
/***********
 * IMPORTS
 ***********/

import { openCloseMenuMobile } from "./utilities.js";

/***********
 * CODE PRINCIPAL
 ***********/

document
	.querySelector("#nav-primary button[data-collapse-toggle]")
	.addEventListener("click", openCloseMenuMobile);
