// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
function Home() {

    // get watchable object from rapidapi
    // get list or one object?
    // extract/access youtube link in JSON
    // randomize the process
        // how to get random ids?
        // or randomize title key word and make type "all" (line 9 const url)

        // Returns List:
        //     const url = 'https://streaming-availability.p.rapidapi.com/v2/search/title?title=batman&country=us&show_type=all&output_language=en';
        // const options = {
        // 	method: 'GET',
        // 	headers: {
        // 		'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
        // 		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        // 	}
        // };

        // try {
        // 	const response = await fetch(url, options);
        // 	const result = await response.text();
        // 	console.log(result);
        // } catch (error) {
        // 	console.error(error);
// }

const [trailer, setTrailer] = useState('');
const [title, setTitle] = useState('');
const [trailerId, setTrailerId] = useState('');


async function getWatchableFromAPI() {
  const url =
    'https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830&output_language=en';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
        
        const data = await response.json();
        console.log(data);
        
        // console.log(data.result.youtubeTrailerVideoLink);

        const trailerLink = data.result.youtubeTrailerVideoLink;

        const watchableTitle = data.result.title;

        const trailerId = data.result.youtubeTrailerVideoId;

        setTrailer(trailerLink);
        setTitle(watchableTitle);
        setTrailerId(trailerId);
    }
   
  } catch (error) {
    console.error(error);
  }
}

// console.log(getWatchableFromAPI());

useEffect(() => {
  getWatchableFromAPI();

  const intervalId = setInterval(getWatchableFromAPI, 24 * 60 * 60 * 1000); // Fetch a new trailer every 24 hours

  return () => {
    clearInterval(intervalId);
  };
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
                    
                    {/* <p>
                         Just add any "watchables" to a list. Watchables can be a movie or show.
                    </p> */}
                        </div>
                        <div className='text-center'><button className='btn btn-light'>Learn More</button></div>
                    {/* Learn more links to a div down below that explains what the site is about next to featured trailer*/}
                    {/* <button className='btn btn-info'>Sign Up</button>
                <button className='btn btn-info'>Log in</button> */}
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-transparent rounded p-5'>
                <div className="container p-5 col-12 text-center" style={{ color: 'white'}}>
                    <p className='lead'>Have you seen this trailer? Check it out!</p>
                </div>
                <div style={{ margin: '0 auto', width: 'fit-content' }}>
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