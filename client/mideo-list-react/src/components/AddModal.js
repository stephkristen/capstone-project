import React, { useState } from "react";

const ratings = {
    1: 'Appalling',
    2: 'Horrible',
    3: 'Very Bad',
    4: 'Bad',
    5: 'Average',
    6: 'Fine',
    7: 'Good',
    8: 'Very Good',
    9: 'Great',
    10: 'Masterpiece',
  };

function AddModal({ closeModal, watchable }) {
    const [selectedList, setSelectedList] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

	const handleCancel = () => {
        closeModal();
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

        closeModal();
    };

    return (
        <div>
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
                    <select id="watchableRating" value={selectedRating} onChange={handleRatingChange}>
                        <option value="">Select a rating</option>
                        {Object.entries(ratings).map(([value, label]) => (
                        <option key={value} value={value}>
                            {`${value}: ${label}`}
                        </option>
                        ))}
                    </select>
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

export default AddModal;