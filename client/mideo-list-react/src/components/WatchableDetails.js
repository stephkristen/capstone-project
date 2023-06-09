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
            <div className="flex-container p-5">
                {watchable && (
                    <>
                    <div className="flex-container p-5">
                        <table className="details-table">
                            <div className="m-3">
                                <h1 className="title-white-text">{watchable.title}</h1>
                            </div>
                                <tbody>
                                <tr>
                                    <td id="poster" >
                                        <img
                                            src={watchable.posterURLs[185]}
                                            alt="Poster"
                                            className="poster"
                                        />
                                    </td>
                                    <td id="watchable-details" className="p-3" style={{color: "white"}}>
                                    {watchable.type === "movie" ? (
                                    <h5>Year: {watchable.year}</h5>
                                ) : (
                                    <h5>
                                    Air Year: {watchable.firstAirYear} - {watchable.lastAirYear}
                                    </h5>
                                )}
                                    <p>
                                        {watchable.type === "movie" ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
                                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                            <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                        </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16">
                                                <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/>
                                            </svg>
                                        )
                                    }
                                    </p>
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
                                        <WatchableForm watchable={watchable} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="trailer-cell">
                                        <h6 className="white-text p-1 m-2">Synopsis:</h6>
                                        <div className="p-1 m-2">
                                            <td className="white-text">{watchable.overview}</td>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                <td colSpan="2" className="trailer-cell">
                                    <div className="m-2 d-flex justify-content-center">
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
                                    </div>
                                </td>
                                </tr>
                                </tbody>
                            </table>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default WatchableDetails;