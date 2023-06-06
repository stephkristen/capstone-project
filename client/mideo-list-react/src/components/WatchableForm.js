import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function WatchableForm({ watchable }) {
    const [selectedList, setSelectedList] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const navigate = useNavigate();

	const handleCancel = () => {
        navigate("/");
    };

    const handleListChange = (event) => {
        setSelectedList(event.target.value);
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Selected List: ', selectedList);
        console.log('Selected Rating: ', selectedRating);

        // navigate("/watchlist");
    };

    return (
        <div className="white-text container">
            <h2>Add</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="watchableType">Watchable List:</label>
                    <select id="watchableType" value={selectedList} onChange={handleListChange} required>
                        <option value=''>Select a List Type</option>
                        <option value="Completed Movies">Completed Movies</option>
                        <option value="Completed Series">Completed Series</option>
                        <option value="Plan to Watch">Plan to Watch</option>                        
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