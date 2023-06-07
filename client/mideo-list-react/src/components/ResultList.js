import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResultList({ watchable, index }) {
    const imdbId = watchable.imdbId;
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate(`/details/${imdbId}`);
    };
    
    return (
        <tr key={index} color="white">
            <td>
                <img
                    src={watchable.posterURLs.original}
                    alt={watchable.title}
                    style={{ width: "100px", height: "100px" }}
                    className="mb-3"
                />
            </td>
            <td>
                <h5>
                <Link to={`/details/${imdbId}`}>{watchable.title}</Link>
                </h5>
                <p>{watchable.type}</p>
                <p>IMDB Rating: {watchable.imdbRating}/100</p>
            </td>
            <td>
                <p>{watchable.overview}</p>
            </td>
            <td>
                <button className="btn btn-secondary" onClick={handleAddClick}>
                    Add
                </button>
            </td>
        </tr>
    );
}

export default ResultList;