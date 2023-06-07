const WATCHLIST_API_URL = "http://localhost:8080/watchlist";

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
  } else if (response.status === 404) {
    const errs = await response.json();
    return Promise.reject(errs);
  } else {
    return Promise.reject();
  }
}

export async function deleteWatchableById(watchableId) {
  const init = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };
  const response = await fetch(`${WATCHLIST_API_URL}/${watchableId}`, init);
  if (response.ok) {
    return Promise.resolve();
  } else if (response.status === 404) {
    const errs = await response.json();
    return Promise.reject(errs);
  } else {
    return Promise.reject();
  }
}
