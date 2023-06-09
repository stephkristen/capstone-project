import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { authenticate } from "../services/auth";
import AuthContext from "../contexts/AuthContext";
import { generateWatchlists } from "../services/auth";
import { findByUserId } from "../services/watchlist";

const INITIAL_USER = {
  username: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    authenticate(user)
    .then((loggedInUser) => {
      login(loggedInUser);

      if (!loggedInUser.watchlists || loggedInUser.watchlists.length === 0) {
        findByUserId(loggedInUser.id) 
          .then((foundWatchlists) => {
            if (!foundWatchlists || foundWatchlists.length === 0) {
              generateWatchlists(loggedInUser.id)
                .then(() => {
                  navigate("/");
                })
                .catch(() => setError(true));
            } else {
              navigate("/");
            }
          })
          .catch(() => setError(true));
      } else {
        navigate("/");
      }
    })
    .catch(() => setError(true));
}

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      setUser(INITIAL_USER);
    }
  }, [location.state]);

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="container w-75 py-5">
        <form
          onSubmit={handleSubmit}
          className="container-fluid p-4 rounded-3"
          style={{ backgroundColor: "rgba(140, 191, 248, 0.521)" }}>
          <h3 className="text-center pb-3">Log In</h3>
          {location.state?.msg && (
            <div className="alert alert-success" role="alert">
              {location.state.msg}
            </div>
          )}
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-3 col-form-label">
              Username
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username"
              ></input>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
              ></input>
            </div>
          </div>
          <div className="py-2 d-flex justify-content-end">
            <button className="btn btn-primary shadow-sm" type="submit">
              Login
            </button>
            <Link className="btn btn-secondary mx-3 shadow-sm" to="/">
              Cancel
            </Link>
          </div>
          <div className="py-2 d-flex justify-content-end">
            <p id="sign-up-prompt">
              No Account? Click <Link to="/signup" id="here">here</Link> to sign up!
            </p>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              No user was found with that username and password combination. Please
              try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
