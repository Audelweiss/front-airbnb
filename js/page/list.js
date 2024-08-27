"use strict";

fetch("http://localhost:1337/api/homes?populate=*")
	.then((response) => response.json())
	.then((homes) => console.log(homes));
