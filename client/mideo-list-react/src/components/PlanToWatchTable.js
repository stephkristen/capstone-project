import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { findByUserId, findByType } from "../services/watchlist";

function PlanToWatchTable() {
  const { user } = useContext(AuthContext);
  const [watchables, setWatchables] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const padding = { padding: "15px" };

  useEffect(() => {
    findByType(user.id, "Plan%20to%20Watch")
      .then(setWatchables)
      .catch(() => navigate("/error"));
  }, []);

  const allWatchables = watchables.watchables;
  const watchlistId = watchables.id;

  const handleSort = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);

    // Sort the watchables based on the selected option
    let sortedWatchables = [...allWatchables];
    switch (selectedSortBy) {
      case "title (a-z)":
        sortedWatchables.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
        );
        break;
      case "title (z-a)":
        sortedWatchables.sort((a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
        );
        break;
      case "year (new)":
        sortedWatchables.sort((a, b) => b.year - a.year);
        break;
      case "year (old)":
        sortedWatchables.sort((a, b) => a.year - b.year);
        break;
      case "score (low)":
        sortedWatchables.sort((a, b) => a.personalRating - b.personalRating);
        break;
      case "score (high)":
        sortedWatchables.sort((a, b) => b.personalRating - a.personalRating);
        break;
      default:
        break;
    }
    setWatchables({ ...watchables, watchables: sortedWatchables });
  };

  return (
    <div className="p-5">
      {allWatchables && (
        <>
          <div>
            <h2
              className="mb-4"
              style={{ textAlign: "center", color: "white" }}
            >
              Plan to Watch List
            </h2>
          </div>

          <div className="mb-3 white-text">
            <label htmlFor="sortSelect" className="form-label">
              Sort By:
            </label>
            <select
              id="sortSelect"
              className="form-select"
              value={sortBy}
              onChange={handleSort}
            >
              <option value="">None</option>
              <option value="title (a-z)">Title (A-Z)</option>
              <option value="title (z-a)">Title (Z-A)</option>
              <option value="year (new)">Year (New)</option>
              <option value="year (old)">Year (Old)</option>
              <option value="score (low)">Score (Low)</option>
              <option value="score (high)">Score (High)</option>
            </select>
          </div>

          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th scope="col" style={padding}>
                  Title
                </th>
                <th scope="col" style={padding}>
                  Release Year
                </th>
                <th scope="col" style={padding}>
                  Genre
                </th>
                <th scope="col" style={padding}>
                  Your Rating
                </th>
                <th scope="col" style={padding}>
                  Update
                </th>
                <th scope="col" style={padding}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {allWatchables.map((watchable) => {
                return (
                  <tr key={watchable.id}>
                    <td className="p-4">{watchable.title}</td>
                    <td className="p-4">
                      {watchable.year ? watchable.year : watchable.firstAirYear}
                    </td>
                    <td className="p-2">
                      {watchable.genres.map((genre) => (
                        <li>{genre}</li>
                      ))}
                    </td>
                    <td className="p-4">{watchable.personalRating}/100</td>
                    <td>
                      <button className="btn btn-primary">Update</button>
                    </td>
                    <td>
                      <Link
                        to={`/watchlist/delete/${watchlistId}/${watchable.id}`}
                        className="btn btn-danger mx-2"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default PlanToWatchTable;
