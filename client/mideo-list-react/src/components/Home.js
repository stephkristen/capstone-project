// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

// TODO:
    // Add about section
    // add sign up button
    // add log in button

const trailers = {
    1: 'https://www.youtube.com/watch?v=KAE5ymVLmZg',
    2: 'https://www.youtube.com/watch?v=dz6eBeW19Lg',
    3: 'https://www.youtube.com/watch?v=BoohRoVA9WQ',
    4: 'https://www.youtube.com/watch?v=uHBnrJowBZE',
    5: 'https://www.youtube.com/watch?v=W4DlMggBPvc',
    6: 'https://www.youtube.com/watch?v=hIR8Ar-Z4hw',
    7: 'https://www.youtube.com/watch?v=YLorLVa95Xo',
    8: 'https://www.youtube.com/watch?v=npvJ9FTgZbM',
    9: 'https://www.youtube.com/watch?v=7SlILk2WMTI',
    10: 'https://www.youtube.com/watch?v=3CqymRQ1uUU',
    11: 'https://www.youtube.com/watch?v=JAUoeqvedMo',
    12: 'https://www.youtube.com/watch?v=cx3joJnXydc',
    13: 'https://www.youtube.com/watch?v=dKrVegVI0Us',
    14: 'https://www.youtube.com/watch?v=HSzx-zryEgM',
    15: 'https://www.youtube.com/watch?v=wUn05hdkhjM',
    16: 'https://www.youtube.com/watch?v=xEvV3OsE2WM',
    17: 'https://www.youtube.com/watch?v=ue80QwXMRHg',
    18: 'https://www.youtube.com/watch?v=xjDjIWPwcPU',
    19: 'https://www.youtube.com/watch?v=QwievZ1Tx-8',
    20: 'https://www.youtube.com/watch?v=UUkn-enk2RU',
    21: 'https://www.youtube.com/watch?v=GX33bIOA5aA',
    22: 'https://www.youtube.com/watch?v=AMSITikqKiM',
    23: 'https://www.youtube.com/watch?v=LFoz8ZJWmPs',
    24: 'https://www.youtube.com/watch?v=Fp9pNPdNwjI',
    25: 'https://www.youtube.com/watch?v=8YjFbMbfXaQ',
    26: 'https://www.youtube.com/watch?v=x_me3xsvDgk',
    27: 'https://www.youtube.com/watch?v=1mTjfMFyPi8',
    28: 'https://www.youtube.com/watch?v=Rf8LAYJSOL8',
    29: 'https://www.youtube.com/watch?v=Go8nTmfrQd8',
    30: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
    31: 'https://www.youtube.com/watch?v=5WfTEZJnv_8',
    32: 'https://www.youtube.com/watch?v=AAE5VZktooM',
    };

function Home() {

    const [trailer, setTrailer] = useState('');
    const [title, setTitle] = useState('');
    const [trailerId, setTrailerId] = useState('');

    // hard-coded genreId list from API
    const genreIdList = [1,2,4,5,6,7,12,14,16,18,27,28,35,36,37,53,80,99,878,9648,10402,10749,10751,10752,10763,10764,10767];

    async function getWatchable() {

        function getRandomTrailer() {
            const trailerIds = Object.keys(trailers);
            const randomIndex = Math.floor(Math.random() * trailerIds.length);
            const randomTrailerId = trailerIds[randomIndex];
            return trailers[randomTrailerId];
        }

        const trailerLink = getRandomTrailer();
        const trailerId = trailerLink.split('watch?v=')[1];

        setTrailer(trailerLink);
        setTitle('Trailer');
        setTrailerId(trailerId);
        
        // function getRandomGenreId() {
        //     const random = Math.floor(Math.random() * genreIdList.length);
        //     return genreIdList[random];
        // }
        
        // const randomGenreId = getRandomGenreId();

        // // Returns list of JSON watchable objects:
        // const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=all&genre=${randomGenreId}&show_original_language=en`;

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
        //         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        //     }
        // };
        
        //  try {
        //     const response = await fetch(url, options);
        //     if (response.status === 200) {
        //         // data contains an array with 8 watchable objects
        //         const data = await response.json();
        //         //console.log(data);

        //         function getRandomWatchableObject() {
        //             // how to access watchable obj inside data?
        //             // data.result.array.watchable?
        //             const array = data.result;
        //             // chooses between 1-8
        //             const watchable = array[Math.floor(Math.random() * array.length)];

        //             // console.log(watchable);
        //             return watchable;
        //         }

        //         const randomWatchableObject = getRandomWatchableObject();
        //         const trailerLink = randomWatchableObject.youtubeTrailerVideoLink;
        //         const watchableTitle = randomWatchableObject.title;
        //         const youtubeTrailerVideoId = randomWatchableObject.youtubeTrailerVideoId;

        //         setTrailer(trailerLink);
        //         setTitle(watchableTitle);
        //         setTrailerId(youtubeTrailerVideoId);
        //     } else if (response.status === 400) {
		// 		// display some form errors
		// 		const errors = await response.json();
		// 		console.log(errors);
		// 	} else {
		// 		return Promise.reject(`Unexpected status code: ${response.status}`);
		// 	}
        // } catch (error) {
        //     console.error(error);
        // }
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await getWatchableFromAPI();
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <div className='masthead container-fluid rounded text-dark p-5' style={{ background: `url(${background}) no-repeat center center fixed` }}>
                <div className="container p-5" style={{ color: 'white' }}>
                    <div className="row h-100 align-items-center p-5">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div  id='text-box' className="rounded col-12 text-center">
                                    <h1 className="display-4 p-3">MideoList</h1>
                                    <p className="lead">Keep track of your watching history and plan what you want to watch next. Not sure what you want to watch? Grab a random trailer to help you get started!</p>
                                    <div className="container col-12 p-3">
                                        <button onClick={getWatchable} className='btn btn-light'>Trailer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-transparent rounded p-5'>
                <div style={{ margin: 'auto', width: 'fit-content' }}>
                    <div style={{ position: 'relative' }}>
                            {trailerId && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div>
                                            <div className=" embed-responsive-16by9" style={{ width: '100%', height: '100%' }}>
                                                <YouTube videoId={trailerId} title={title} />
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ position: 'absolute', bottom: -50, left: 0, color: 'white', margin: '10px' }}>
                                        <a href={trailer} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}> Watch the trailer on YouTube {' '}
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