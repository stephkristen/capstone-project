import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { authenticate } from '../services/auth';
import AuthContext from '../contexts/AuthContext';

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
        // TODO : fix navigation for after they hit submit button
        navigate("/");
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
    <form onSubmit={handleSubmit} className="p-5">
      <h3>Log In</h3>
      {location.state?.msg && (
        <div className="alert alert-success" role="alert">
          {location.state.msg}
        </div>
      )}
      <div className="mb-3 row">
        <label htmlFor="username" className="col-form-label col-sm-2">
          Username
        </label>
        <div className="col-sm-8">
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
      <div className="mb-2 row">
        <label htmlFor="password" className="form-label col-sm-2">
          Password
        </label>
        <div className="col-sm-8">
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

      <div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <Link className="btn btn-secondary mx-3" to="/">
          Cancel
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          No user was found with that username and password combination. Please try
          again or click <Link to="/signup">here</Link> to sign up!
        </div>
      )}
    </form>
  );
}

export default Login;
