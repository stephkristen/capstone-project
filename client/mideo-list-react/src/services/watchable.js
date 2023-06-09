const WATCHABLE_API_URL = "http://localhost:8080/watchable";

export async function findAll() {
  const response = await fetch(WATCHABLE_API_URL);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject();
  }
}

async function addWatchable(watchable) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(watchable),
  };

  const response = await fetch(`${WATCHABLE_API_URL}`, init);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else if (response.status === 400) {
    const errs = await response.json();
  } else {
    return Promise.reject();
  }
}

async function updateWatchable(watchableId, updatedWatchable) {
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(updatedWatchable),
  };

  const response = await fetch(`${WATCHABLE_API_URL}/updatePersonalRating/${watchableId}`, init);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else if (response.status === 400) {
    const errs = await response.json();
  } else {
    return Promise.reject();
  }
}

export async function saveWatchable(watchable) {
  if (watchable.id) {
    return updateWatchable(watchable.id, watchable);
  } else {
    return addWatchable(watchable);
  }
}

export async function findWatchableById(watchableId) {
  const response = await fetch(`${WATCHABLE_API_URL}/watchableById/${watchableId}`);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject();
  }
}
