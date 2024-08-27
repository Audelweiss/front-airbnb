"use strict";

import Host from "./host.js";

class Home {
	id;
	title;
	bed;
	cover = { src: "", alt: "" };
	region;
	description;
	createdAt;
	host;

	constructor(datas) {
		for (const prop in datas) {
			if (this.hasOwnProperty(prop)) {
				switch (prop) {
					case "cover":
						this[prop] = {
							alt:
								datas.cover.data.attributes.alternativeText ??
								"Photo de couverture de l'annonce",
							src: datas.cover.data.attributes.url,
						};
						break;
					case "region":
						this[prop] = datas.region.data.attributes.label;
						break;
					case "createdAt":
						this[prop] = new Date(this[prop]);
						break;
					case "host":
						this[prop] = new Host({
							...datas.host.data.attributes,
							id: datas.host.data.id,
						});
						break;
					default:
						this[prop] = datas[prop];
				}
			}
		}
	}
}
export default Home;
