"use strict";

import { generateRating } from "../utilities.js";
//affichage des étoile avec la note en dur
document.querySelector("ul#avg").innerHTML = generateRating(3, "bg-slate-900");
