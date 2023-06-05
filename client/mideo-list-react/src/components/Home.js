// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

// TODO:
    // Add learn more section
    // add sign up button
    // add log in button

function Home() {

    const [trailer, setTrailer] = useState('');
    const [title, setTitle] = useState('');
    const [trailerId, setTrailerId] = useState('');

    // hard-coded genreId list from API
    const genreIdList = [1,2,4,5,6,7,12,14,16,18,27,28,35,36,37,53,80,99,878,9648,10402,10749,10751,10752,10763,10764,10767];

    async function getWatchableFromAPI() {
        
        function getRandomGenreId() {
            const random = Math.floor(Math.random() * genreIdList.length);
            return genreIdList[random];
        }
        
        const randomGenreId = getRandomGenreId();

        // Returns list of JSON watchable objects:
        const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=all&genre=${randomGenreId}&show_original_language=en`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
        
         try {
            const response = await fetch(url, options);
            if (response.status === 200) {
                // data contains an array with 8 watchable objects
                const data = await response.json();
                //console.log(data);

                function getRandomWatchableObject() {
                    // how to access watchable obj inside data?
                    // data.result.array.watchable?
                    const array = data.result;
                    // chooses between 1-8
                    const watchable = array[Math.floor(Math.random() * array.length)];

                    // console.log(watchable);
                    return watchable;
                }

                const randomWatchableObject = getRandomWatchableObject();
                const trailerLink = randomWatchableObject.youtubeTrailerVideoLink;
                const watchableTitle = randomWatchableObject.title;
                const youtubeTrailerVideoId = randomWatchableObject.youtubeTrailerVideoId;

                setTrailer(trailerLink);
                setTitle(watchableTitle);
                setTrailerId(youtubeTrailerVideoId);
            } else if (response.status === 400) {
				// display some form errors
				const errors = await response.json();
				console.log(errors);
			} else {
				return Promise.reject(`Unexpected status code: ${response.status}`);
			}
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getWatchableFromAPI();
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='container-fluid bg-transparent rounded text-dark p-5' style={{ background: `url(${background}) no-repeat center center fixed` }}>
                <div className="container p-5" style={{ color: 'white' }}>
                    <div className="row h-100 align-items-center">
                        <div id='text-box' className="rounded col-12 text-center">
                            <h1 className="display-4">MideoList
                            </h1>
                            <p className="lead">Keep track of your watching history and plan what you want to watch next.</p>
                        </div>
                        <div className='text-center'><button className='btn btn-light'>Learn More</button></div>
                    {/* Learn more links to a div down below that explains what the site is about next to featured trailer*/}               
                    {/* <p>
                         About MideoList: Our goal is to help people track their movies and series watching history through 3 different lists. Watchables can be a movie or show. Just add any "watchables" to a list. 
                    </p> */}
                    {/* <button className='btn btn-info'>Sign Up</button>
                <button className='btn btn-info'>Log in</button> */}
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-transparent rounded p-5'>
                <div className="container p-5 col-12 text-center" style={{ color: 'white'}}>
                    <p className='lead'>Not sure what you want to watch? Here is a trailer to get you started!</p>
                    {/* <div className='my-3'>
                            <button onClick={getWatchableFromAPI} className='btn btn-light'>Trailer</button>
                        </div> */}
                </div>
                <div style={{ margin: 'auto', width: 'fit-content' }}>
                    <div style={{ position: 'relative' }}>
                            {trailerId && (
                                <>
                                    <div className="embed-responsive embed-responsive-16by9" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <YouTube videoId={trailerId} title={title} />
                                        </div>
                                    </div>
                                    <p style={{ position: 'absolute', bottom: -40, left: 0, color: 'white', margin: '10px' }}>
                                        <a href={trailer} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}> Watch the trailer on YouTube: {' '}
                                            {title}
                                        </a>
                                    </p>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;