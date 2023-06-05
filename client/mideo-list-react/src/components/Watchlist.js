import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import Watchables from "./Watchables";
import { useNavigate } from "react-router-dom";
import { findAll } from '../services/watchlist';
import WatchableTable from "./WatchableTable";

function Watchlist() {
  const { user } = useContext(AuthContext);
  const [watchlists, setWatchlists] = useState([]);
//   const [view, setView] = useState('Table');
const navigate = useNavigate();

useEffect(() => {
    findAll()
        .then(setWatchlists)
        .catch(() => navigate('/error'));
}, []);

  return (
    <div className="container p-5">
      {user && (
        <>
          <h1 className="p-4" style={{ textAlign: "center" }}>
            Welcome, {user.firstName}!
          </h1>
        </>
      )}
      <div>
        <h2>Your Lists</h2>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Choose list
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button">
            Completed Movies
          </button>
          <button className="dropdown-item" type="button">
            Completed Series
          </button>
          <button className="dropdown-item" type="button">
            Plan to Watch
          </button>
        </div>
      </div>
      <div>
      <WatchableTable watchlists={watchlists}></WatchableTable>) 
      </div>
    </div>
  );
}

export default Watchlist;
