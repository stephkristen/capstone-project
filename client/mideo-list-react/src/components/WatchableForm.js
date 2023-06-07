import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthContext";
import { save } from "../services/watchlist";
import { saveWatchable } from "../services/watchable";
import { findByType, findByUserId } from "../services/watchlist";
import { useEffect, useContext } from "react";

function WatchableForm({ watchable }) {
    const { user } = useContext(AuthContext);
    const [watchlist, setWatchlist] = useState([])
    const [selectedList, setSelectedList] = useState("Completed Movies");
    const [selectedRating, setSelectedRating] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const genreNames = watchable.genres.map((genre) => genre.name);
        const streamingServiceNames = watchable.streamingInfo && watchable.streamingInfo.us ? Object.keys(watchable.streamingInfo.us) : [];
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
            await addWatchableToWatchlist(addedWatchable.id);
        } catch (error) {
        }

        navigate("/watchlist");
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
    
        if (!response.ok) {
          throw new Error("Failed to add watchable to watchlist");
        }
      };

    return (
        <div className="white-text container">
            <h2>Add To WatchList</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="watchableType">Watchable List:</label>
                    <select id="watchableType" value={selectedList} onChange={handleListChange} required>
                        <option value="Completed Movies" selected={selectedList === "Completed Movies"}>Completed Movies</option>
                        <option value="Completed Series" selected={selectedList === "Completed Series"}>Completed Series</option>
                        <option value="Plan to Watch" selected={selectedList === "Plan to Watch"}>Plan to Watch</option>                        
                    </select>
                </div>

                <div>
                    <label htmlFor="watchableRating">Rating: </label>
                    <input
                        type="number"
                        id="watchableRating"
                        min={1}
                        max={100}
                        step={1}
                        value={selectedRating}
                        onChange={handleRatingChange}
                    />
                </div>

                <div className="button-container">
                    <button className="btn btn-primary" type="submit">
                        Add
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WatchableForm;