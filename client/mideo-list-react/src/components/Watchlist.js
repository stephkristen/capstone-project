import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import CompletedMoviesTable from "./CompletedMoviesTable";
import PlanToWatchTable from "./PlanToWatchTable";
import CompletedSeriesTable from "./CompletedSeriesTable";

function Watchlist() {
  const [list, setList] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [CompletedMoviesVisible, setCompletedMoviesVisible] = useState(false);
  const [CompletedSeriesVisible, setCompletedSeriesVisible] = useState(false);
  const [PlanToWatchVisible, setPlanToWatchVisible] = useState(false);

  useEffect(() => {
    list === "Completed Movies"
      ? setCompletedMoviesVisible(true)
      : setCompletedMoviesVisible(false);
    list === "Completed Series"
      ? setCompletedSeriesVisible(true)
      : setCompletedSeriesVisible(false);
    list === "Plan to Watch"
      ? setPlanToWatchVisible(true)
      : setPlanToWatchVisible(false);
  }, [list]);

  const handleOnChange = (e) => {
    setList(e.target.value);
  };

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
      <div className="mt-4">
        <select className="form-select" value={list} onChange={handleOnChange}>
          <option>Select your list to view</option>
          <option value="Completed Movies">Completed Movies</option>
          <option value="Completed Series">Completed Series</option>
          <option value="Plan to Watch">Plan to Watch</option>
        </select>
      </div>
      {CompletedMoviesVisible && <CompletedMoviesTable />}
      {CompletedSeriesVisible && <CompletedSeriesTable />}
      {PlanToWatchVisible && <PlanToWatchTable />}
    </div>
  );
}

export default Watchlist;
