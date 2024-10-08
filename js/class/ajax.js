"use strict";

class AJAX {
	host;
	options;
	constructor(host) {
		this.host = host;
	}

	reset() {
		this.options = {
			method: "GET",
		};
	}

	async get(endpoint) {
		this.reset();
		try {
			const response = await fetch(this.host + endpoint);
			return await response.json();
		} catch (error) {
			throw new Error(error);
		}
	}

	async post(endpoint, datas, json = false) {
		try {
			this.options.method = "POST";
			if (json) {
				this.options.headers = {
					"Content-Type": "application/json",
				};
			}
			this.options.body = datas;

			const response = await fetch(this.host + endpoint, this.options);
			return await response.json();
		} catch (error) {
			console.log("err");
			throw new Error(error);
		}
	}
}
export default AJAX;
