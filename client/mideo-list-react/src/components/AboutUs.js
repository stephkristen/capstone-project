import background from "../images/projector-bw.jpg";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  const handleFindButton = () => {
    navigate("/search");
  };

  return (
    <div>
      <div
        className="masthead container-fluid rounded text-dark p-5"
        style={{
          background: `url(${background}) no-repeat center center fixed`,
        }}
      >
        <div className="container p-5" style={{ color: "white" }}>
          <div className="row h-100 align-items-center p-5">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div id="text-box" className="rounded col-20 text-center">
                  <h1 className="display-4 p-3">About Us</h1>
                  <p className="lead">
                    For all movie and TV show fanatics! We knew many people,
                    including ourselves who would utilize and appreciate a
                    website like this. Our application eliminates having to
                    remember which movies and TV shows you've already watched
                    and allow you to view your personal rating on each one.
                  </p>
                  <p className="lead">
                    And with the help of our Search functionality you can look
                    up thousands of movies and TV shows and view trailers, which
                    streaming service carries them and more! Just at the click
                    of a button!
                  </p>
                  <div className="py-3" style={{ textAlign: "center" }}>
                    <button className="btn btn-info" onClick={handleFindButton}>
                      Start Searching Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
