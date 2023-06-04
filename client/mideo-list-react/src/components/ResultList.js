import React from "react";
import { Link } from "react-router-dom";

function ResultList({ watchable, index }) {
    const imdbId = watchable.imdbId;
    
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
            <td className="white-text">
                <h5>
                <Link to={`/details/${imdbId}`}>{watchable.title}</Link>
                </h5>
                <p>{watchable.type}</p>
                <p>IMDB Rating: {watchable.imdbRating}/100</p>
            </td>
            <td className="white-text">
                <p>{watchable.overview}</p>
            </td>
        </tr>
    );
}

export default ResultList;