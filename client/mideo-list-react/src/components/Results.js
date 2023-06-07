import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultList from "./ResultList"
import API_KEY from "./config";

function Results() {
    const [watchables, setWatchables] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search');

    async function getWatchables() {
        const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchQuery}&country=us&output_language=en`;
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
                setWatchables(json.result);
            }
        } catch (error) {
            console.error(error);
        }
    }

	useEffect(() => {
        getWatchables();
    }, []);

    if (!watchables.length) {
        return (
            <div
                className="d-flex justify-content-center"
                style={{ height: '90vh', alignItems: 'center' }}>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container p-5 mt-4">
            <h2 className="white-text">Search Results</h2>
            <table className="table">
                <tbody>
                    {watchables.map((watchable, index) => (
                        <ResultList watchable={watchable} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;