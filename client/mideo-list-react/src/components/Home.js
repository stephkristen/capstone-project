// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'
import { useEffect, useState } from 'react';

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
        // Returns 1 item
    //     const url = 'https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830&output_language=en';
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
    //             'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         const result = await response.json();
    //         console.log(result);

    //         const trailerLink = result.youtubeTrailerVideoLink;
    //         console.log(trailerLink);
    //         // setTrailer();
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    
    }
    console.log(getWatchableFromAPI());

    useEffect(() => {
        getWatchableFromAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    </div>
                </div>
            </div>
            <div classname='container-fluid bg-transparent rounded text-dark p-5' style={{ color: 'white'}}>
            {/* <button className='btn btn-info'>Test</button> */}
            <div className="container p-5 col-12 text-center">
                <p className='lead'>Check out this trailer!</p>
            </div>
            <video>
                <source src= { trailer } type='video/webm'/>
                {/* { trailer } */}
                Trailer coming soon!
            </video>
            </div>
        </div>
        
    );

}

export default Home;