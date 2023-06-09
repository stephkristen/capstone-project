import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { removeWatchableFromWatchlist } from '../services/watchlist';
import { findWatchableById, saveWatchable } from '../services/watchable';
import AuthContext from "../contexts/AuthContext";
import { findByType, findByUserId, getWatchlistByType } from "../services/watchlist";

function UpdateConfirmation() {
    const { user } = useContext(AuthContext);
    const [watchable, setWatchable] = useState(null);
    const navigate = useNavigate();
    const { watchableId, watchlistId } = useParams();
    const [personalRating, setPersonalRating] = useState('');
    const [selectedList, setSelectedList] = useState('');
    const [watchlists, setWatchlists] = useState([]);

    useEffect(() => {
        findWatchableById(watchableId)
            .then(setWatchable)
            .catch(() => navigate('/error'));
    }, [watchableId]);

    useEffect(() => {
        fetchWatchlists();
    }, []);

    const fetchWatchlists = async () => {
        try {
            const fetchedWatchlists = await findByUserId(user.id);
            if (fetchedWatchlists.length > 0) {
                setSelectedList(fetchedWatchlists[0].type);
            }
            setWatchlists(fetchedWatchlists);
        } catch (error) {
            console.error(error);
        }
    };


    const handleUpdate = async () => {
        if (watchable) {
            const updatedWatchable = { ...watchable, personalRating: parseInt(personalRating, 10) };
            try {
                await saveWatchable(updatedWatchable);
                await removeWatchableFromWatchlist(watchlistId, watchableId);
                await addToWatchlist(updatedWatchable);
                navigate('/watchlist');
            } catch (error) {
                navigate('/error');
            }
        }
    };

    const addToWatchlist = async (watchable) => {
        try {
            const watchlist = await findByType(user.id, selectedList);
            const watchlistId = watchlist ? watchlist.id : null;

            if (watchlistId) {
                const init = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                    body: JSON.stringify(watchable),
                };

                const response = await fetch(
                    `http://localhost:8080/watchlist/${watchlistId}/addWatchable/${watchable.id}`,
                    init
                );

                if (!response.ok) {
                    throw new Error("Failed to add watchable to watchlist");
                }
            } else {
                throw new Error("Watchlist not found");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleListChange = (event) => {
        setSelectedList(event.target.value);
    };

    return (
        <div className="container h-100 d-flex justify-content-center align-items-center p-5">
          <div className="container w-75 py-5">
            {watchable && (
              <>
                <div className='alert alert-info' role='alert'>
                  <div>
                    <h2>Update Confirmation</h2>
                  </div>
                  <div>
                    Are you sure you want to update the personal rating for the following watchable?{' '}
                    <ul>
                      <li>Title: {watchable.title}</li>
                      <li>Type: {watchable.type}</li>
                      <li>Current Personal Rating: {watchable.personalRating}</li>
                    </ul>
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="personalRating">New Personal Rating:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="personalRating"
                        min={1}
                        max={100}
                        step={1}
                        onChange={(event) => setPersonalRating(event.target.value)}
                        />
                    </div>
                    <div className="form-group custom-select">
                      <label htmlFor="selectedList">Select Watchlist:</label>
                      <select
                        className="form-control"
                        id="selectedList"
                        value={selectedList}
                        onChange={handleListChange}
                      >
                        {watchlists.map((list) => (
                          <option key={list.id} value={list.type}>
                            {list.type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='p-1'>
                    <button type="button" className="btn btn-primary my-2" onClick={handleUpdate}>
                        Update
                    </button>
                    <Link to='/watchlist' className='btn btn-secondary mx-2'>
                      Cancel
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
    );
}

export default UpdateConfirmation;