const WATCHLIST_API_URL = 'http://localhost:8080/watchlist';

export async function findAll() {
	const response = await fetch(WATCHLIST_API_URL);
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject();
	}
}

export async function getWatchlistByType(userId, type) {
  try {
    const watchlists = await findByType(userId, type);
    if (watchlists.length > 0) {
      return watchlists[0];
    }
    return null;
  } catch (error) {
    throw new Error("Failed to fetch watchlist by type");
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

async function addWatchableToWatchList(watchlist) {
	const init = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
		body: JSON.stringify(watchlist),
	};

	const response = await fetch(`${WATCHLIST_API_URL}/647f56975d9aa5d43d05ddc6/addWatchable`, init);
	if (response.ok) {
		const data = await response.json();
		return Promise.resolve(data);
	} else if (response.status === 400) {
		const errs = await response.json();
	} else {
		return Promise.reject();
	}
}

export async function save(watchlist) {
	return addWatchableToWatchList(watchlist);
}