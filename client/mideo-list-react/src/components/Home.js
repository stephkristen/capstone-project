// import background from '../images/reel-bw.jpg';
import background from '../images/projector-bw.jpg'

function Home() {

    async function randTrailer() {
        const url = 'https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830&output_language=en';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29529a668bmsh6a9f62367cbcd5ap1f0a53jsncd59c509341f',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className='jumbotron jumbotron-fluid p-5 mt-5' style={{ background: `url(${background}) no-repeat center center fixed` }}>
                <div className="container" style={{ color: 'white' }}>
                    <div className="row h-100 align-items-center">
                    <div className="col-12 text-center">
                        <h1 className="display-4">Mideo</h1>
                        <p className="lead">Keep track of your watching history and plan what you want to watch next.</p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
            {/* <button className='btn btn-info'>Test</button> */}
            <video>

            </video>
            </div>
        </div>
        
    );

}

export default Home;