// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import React, { useEffect, useState } from 'react';

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
        
        console.log(data.result.youtubeTrailerVideoLink);

        const trailerLink = data.result.youtubeTrailerVideoLink

        setTrailer(trailerLink); // Update the trailer state

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
                        
                    </div>
                    {/* <button className='btn btn-info'>Sign Up</button>
                <button className='btn btn-info'>Log in</button> */}
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-transparent rounded text-dark p-5' style={{ color: 'white'}}>
            <div className="container p-5 col-12 text-center">
                <p className='lead'>Check out this trailer!</p>
            </div>
            <div className=''>
                <video controls>
                    <source src={trailer} type="video/webm" />
                    Your browser does not support the video tag.
                </video>

                <p>
                We can't show you the trailer here, but if you'd still like to see it, click
                here:{" "}
                    <a href={trailer} target="_blank" rel="noopener noreferrer">
                    link to the video
                    </a>
                    .
                </p>

            </div>
            </div>
        </div>
        
    );

}

export default Home;