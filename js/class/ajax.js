"use strict";

class AJAX {
	host;
	options;
	constructor(host) {
		this.host = host;
	}

	async get(endpoint) {
		const response = await fetch(this.host + endpoint);
		return await response.json();
	}
}
export default AJAX;
