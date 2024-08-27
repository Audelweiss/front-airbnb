"use strict";

class Host {
	id;
	biography;
	firstname;
	lastname;
	createdAt;

	constructor(datas) {
		for (const prop in datas) {
			if (this.hasOwnProperty(prop)) {
				this[prop] = datas[prop];
				if (prop == "createdAt") {
					this[prop] = new Date(this[prop]);
				}
			}
		}
	}
}
export default Host;
