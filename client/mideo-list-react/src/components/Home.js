// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

// TODO:
    // Add learn more section
    // add sign up button
    // add log in button
    // generate random trailer from api

function Home() {

    const [trailer, setTrailer] = useState('');
    const [title, setTitle] = useState('');
    const [trailerId, setTrailerId] = useState('');
    
    // hard-coded genreId list from API
    const genreIdList = [1,2,4,5,6,7,12,14,16,18,27,28,35,36,37,53,80,99,878,9648,10402,10749,10751,10752,10763,10764,10767];
    const genreId = 0;

    function getRandomGenreId() {
        genreId = (genreIdList[(Math.floor(Math.random() * genreIdList.length))]);
    }

    // is the method working?
    console.log(getRandomGenreId);

    async function getWatchableFromAPI() {
    // Returns list of JSON watchable objects:
        const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=all&genre=${genreId}&show_original_language=en`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
        
        // console.log()

        try {
            const response = await fetch(url, options);
            if (response.status === 200) {
                
                const data = await response.json();
                // console.log(data);

                // how to get one object? 
                // dot in to a specific or random position?
                // function getRandomWatchableObject() {
                //     genreId = (genreIdList[(Math.floor(Math.random() * genreIdList.length))]);
                // }

                // get specific trailer
                const trailerLink = data.result.youtubeTrailerVideoLink;
                const watchableTitle = data.result.title;
                const trailerId = data.result.youtubeTrailerVideoId;

                setTrailer(trailerLink);
                setTitle(watchableTitle);
                setTrailerId(trailerId);
            }

    }

// async function getWatchableFromAPI() {
//   const url =
//     'https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830&output_language=en';
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
//       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     if (response.status === 200) {
        
//         const data = await response.json();
        
//         const trailerLink = data.result.youtubeTrailerVideoLink;

//         const watchableTitle = data.result.title;

//         const trailerId = data.result.youtubeTrailerVideoId;

//         setTrailer(trailerLink);
//         setTitle(watchableTitle);
//         setTrailerId(trailerId);
//     }
   
//   } catch (error) {
//     console.error(error);
//   }
// }

useEffect(() => {
  getWatchableFromAPI();

//   const intervalId = setInterval(getWatchableFromAPI, 24 * 60 * 60 * 1000); // Fetch a new trailer every 24 hours

//   return () => {
//     clearInterval(intervalId);
//   };
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
                    <p className='lead'>Have you seen this trailer? Check it out!</p>
                </div>
                <div style={{ marginLeft: 0, marginRight: 'auto', width: 'fit-content' }}>
                    <div style={{ position: 'relative' }}>
                        <p style={{ position: 'absolute', top: -30, left: 0, color: 'white', margin: '10px' }}>
                        <a href={trailer} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                            {title}
                        </a>
                        </p>
                        <div className="embed-responsive embed-responsive-16by9" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '100%' }}>
                                <YouTube videoId={trailerId} title={title} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;