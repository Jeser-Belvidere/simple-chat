const SERVER_URL = import.meta.env.VITE_SERVER_URL

type Params = {
	[key: string]: string
}

async function get(url: string, params: Params = {}) {
	const requestOptions = {
		method: 'GET',
	}
	return await fetch(SERVER_URL + url + new URLSearchParams(params), requestOptions).then(
		handleResponse,
	)
}

async function post<BodyType>(url: string, body: BodyType) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	}
	return await fetch(SERVER_URL + url, requestOptions).then(handleResponse)
}

async function put<BodyType>(url: string, body: BodyType) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	}
	return await fetch(SERVER_URL + url, requestOptions).then(handleResponse)
}

async function _delete(url: string) {
	const requestOptions = {
		method: 'DELETE',
	}
	return await fetch(url, requestOptions).then(handleResponse)
}
//TODO: complete typing
function handleResponse(response: any) {
	console.log(response)
	return
	// return response.text().then((text) => {
	// 	const data = text && JSON.parse(text)
	// 	if (!response.ok) {
	// 		const error = (data && data.message) || response.statusText
	// 		return Promise.reject(error)
	// 	}
	// 	return data
	// })
}

export const Request = {
	get,
	post,
	put,
	delete: _delete,
}
