const WATCHLIST_API_URL = 'http://localhost:8080/watchlist';

export async function findAll() {
	const response = await fetch(WATCHLIST_API_URL);
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject();
	}
}

export async function findByUserId(userId) {
	const response = await fetch(`${WATCHLIST_API_URL}/byUserId/${userId}`);
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject();
	}
}

export async function findByType(userId, type) {
	const response = await fetch(`${WATCHLIST_API_URL}/byType/${userId}/${type}`);
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject();
	}
}