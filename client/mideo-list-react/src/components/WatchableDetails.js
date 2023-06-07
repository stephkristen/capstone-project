import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom"
import API_KEY from "./config";
import YouTube from 'react-youtube';
import WatchableForm from "./WatchableForm";

function WatchableDetails() {
    const [watchable, setWatchable] = useState(null);
    const { imdbId } = useParams();
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/watchableform');
    };

    async function getDetails() {
        const url = `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${imdbId}&output_language=en`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
          }
        };

        try {
            const response = await fetch(url, options);
            if (response.status === 200) {
                const json = await response.json();
                console.log(json);
                setWatchable(json.result);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getDetails();
    }, [imdbId]);

    let videoId = '';
    if (watchable && watchable.youtubeTrailerVideoLink) {
        videoId = watchable.youtubeTrailerVideoLink.split('v=')[1];
    }

    return (
        <div className="container">
            {watchable && (
                <>
                <h1 className="title-white-text">{watchable.title}</h1>
                <table className="details-table">
                        <tbody>
                        <tr>
                            <td>
                            <img
                                src={watchable.posterURLs[185]}
                                alt="Poster"
                                className="poster"
                            />
                            </td>
                            <td className="white-text">
                            {watchable.type === "movie" ? (
                            <h5>Year: {watchable.year}</h5>
                        ) : (
                            <h5>
                            Air Year: {watchable.firstAirYear} - {watchable.lastAirYear}
                            </h5>
                        )}
                            <p>
                                {watchable.genres.map((genre) => genre.name).join(", ")}    
                            </p>
                            <p>
                                Cast: {''}
                                {watchable.cast.join(", ")}
                            </p>
                            <p>IMDb Rating: {watchable.imdbRating}/100</p>
                            <p>
                                Streaming On: {''}
                                {watchable.streamingInfo.us && Object.keys(watchable.streamingInfo.us).join(', ')}
                            </p>
                            </td>
                            <td>
                                {/* <button className="btn btn-secondary" onClick={handleAddClick}>
                                    Add
                                </button> */}

                                <WatchableForm watchable={watchable} />
                            </td>
                        </tr>
                        <tr>
                            <h6 className="white-text">Synopsis:</h6>
                            <td className="white-text">{watchable.overview}</td>
                        </tr>
                        <tr>
                        <td colSpan="2" className="trailer-cell">
                            {videoId ? (
                                <YouTube
                                    videoId={videoId}
                                    opts={{
                                        width: '560',
                                        height: '315',
                                        playerVars: {
                                            autoplay: 0,
                                        },
                                    }}
                                />
                            ) : (
                                <p className="white-text">No trailer available</p>
                            )}
                        </td>
                        </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>        
    );
}

export default WatchableDetails;