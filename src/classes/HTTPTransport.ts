const METHODS = {
	GET: "GET",
	PUT: "PUT",
	POST: "POST",
	DELETE: "DELETE",
};

const queryStringify = (data: { [index: string]: string }) => {
	const arr = Object.entries(data);
	return arr.reduce(
		(sum, [key, val], index) =>
			`${sum}${key}=${val}${index < arr.length - 1 ? "&" : ""}`,
		"?"
	);
};

class HTTPTransport {
	get(
		url: string,
		options: {
			data?: { [index: string]: string };
			timeout?: number;
			headers?: { [index: string]: string };
		} = {}
	) {
		let newUrl = url;
		if (options.data) {
			newUrl += queryStringify(options.data);
		}
		return this.request(newUrl, { ...options, method: METHODS.GET });
	}

	put(
		url: string,
		options: {
			data?: { [index: string]: string };
			timeout?: number;
			headers?: { [index: string]: string };
		} = {}
	) {
		return this.request(url, { ...options, method: METHODS.PUT });
	}

	post(
		url: string,
		options: {
			data?: { [index: string]: string };
			timeout?: number;
			headers?: { [index: string]: string };
		} = {}
	) {
		return this.request(url, { ...options, method: METHODS.POST });
	}

	delete(
		url: string,
		options: {
			data?: { [index: string]: string };
			timeout?: number;
			headers?: { [index: string]: string };
		} = {}
	) {
		return this.request(url, { ...options, method: METHODS.DELETE });
	}

	request(
		url: string,
		options: {
			method: string;
			data?: { [index: string]: string };
			timeout?: number;
			headers?: { [index: string]: string };
		}
	) {
		const { method, data, headers = {}, timeout = 5000 } = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			Object.entries(headers).forEach((v) => xhr.setRequestHeader(...v));

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}

export default HTTPTransport;
