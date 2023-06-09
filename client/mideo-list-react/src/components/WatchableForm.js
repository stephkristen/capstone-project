import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import FormErrors from "./FormErrors";
import { save } from "../services/watchlist";
import { saveWatchable } from "../services/watchable";
import { findByType, findByUserId } from "../services/watchlist";
import { useEffect, useContext } from "react";

function WatchableForm({ watchable }) {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedList, setSelectedList] = useState("Completed Movies");
  const [selectedRating, setSelectedRating] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    findByUserId(user.id)
      .then(setWatchlist)
      .catch(() => navigate("/error"));
  }, []);

  const handleCancel = () => {
    navigate("/");
  };

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleAdd = () =>{
    navigate('/watchlist');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const genreNames = watchable.genres.map((genre) => genre.name);
    const streamingServiceNames =
      watchable.streamingInfo && watchable.streamingInfo.us
        ? Object.keys(watchable.streamingInfo.us)
        : [];
    const watchableToAdd = {
      type: watchable.type,
      title: watchable.title,
      overview: watchable.overview,
      imdbRating: watchable.imdbRating,
      genres: genreNames,
      posterPath: watchable.posterPath,
      cast_members: watchable.cast,
      imdbId: watchable.imdbId,
      personalRating: selectedRating,
    };

    if (watchable.type === "series") {
      watchableToAdd.firstAirYear = watchable.firstAirYear;
      watchableToAdd.lastAirYear = watchable.lastAirYear;
    } else {
      watchableToAdd.year = watchable.year;
    }

    if (streamingServiceNames.length > 0) {
      watchableToAdd.streamingServices = streamingServiceNames;
    }

    if (watchable.youtubeTrailerVideoLink) {
      watchableToAdd.trailerLink = watchable.youtubeTrailerVideoLink;
    }

    try {
      const addedWatchable = await saveWatchable(watchableToAdd);
      const data = await addWatchableToWatchlist(addedWatchable.id);

      Promise.resolve(data).then(() => handleAdd());
    } catch (errors) {
      if (errors) {
        setErrors(errors);
      }
    }
  };

  const addWatchableToWatchlist = async (watchableId) => {
    // Replace `watchlistId` with the actual ID of the selected watchlist
    const watchlist = await findByType(user.id, selectedList);
    const watchlistId = watchlist.id;

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    const response = await fetch(
      `http://localhost:8080/watchlist/${watchlistId}/addWatchable/${watchableId}`,
      init
    );
    if (response.ok) {
      const data = await response.json();
      return Promise.resolve(data).then(() => navigate('/watchlist'));
    } else if (response.status === 400) {
      const errs = await response.json();
      return Promise.reject(errs);
    } else {
      return Promise.reject();
    }
  };

  return (
    <div>
      <div id="watchlist-form" className="white-text rounded container p-3">
        <div className="flex-container p-1">
          <h2 className="m-1">
             {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg> */}
            Add To WatchList</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="p-1 m-1" htmlFor="watchableType">
                Watchable List:
              </label>
              <select
                id="watchableType"
                className="p-1 m-2"
                value={selectedList}
                onChange={handleListChange}
                required
              >
                <option
                  value="Completed Movies"
                  selected={selectedList === "Completed Movies"}
                >
                  Completed Movies
                </option>
                <option
                  value="Completed Series"
                  selected={selectedList === "Completed Series"}
                >
                  Completed Series
                </option>
                <option
                  value="Plan to Watch"
                  selected={selectedList === "Plan to Watch"}
                >
                  Plan to Watch
                </option>
              </select>
            </div>
            <div>
              <label className="p-1 m-1" htmlFor="watchableRating">
                Rating:{" "}
              </label>
              <input
                className="m-2"
                type="number"
                id="watchableRating"
                min={1}
                max={100}
                step={1}
                value={selectedRating}
                onChange={handleRatingChange}
              />
            </div>
            <div className="button-container p-2">
              <div className="button-container-child">
                <button className="btn btn-info" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                  </svg>
                </button>
              </div>
              <div className="button-container-child">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="py-3">
        {errors.length > 0 && <FormErrors errors={errors} />}
      </div>
    </div>
  );
}

export default WatchableForm;
