import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { findByUserId, findByType } from "../services/watchlist";

function PlanToWatchTable() {
  const { user } = useContext(AuthContext);
  const [watchables, setWatchables] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const padding = { padding: "15px" };

  useEffect(() => {
    findByType(user.id, "Plan%20to%20Watch")
      .then(setWatchables)
      .catch(() => setError(true));
  }, []);

  const allWatchables = watchables.watchables;
  const watchlistId = watchables.id;

  if (allWatchables == 0) {
    return (
      <div className="p-4">
        <div className="alert alert-danger" role="alert">
          Your Plan to Watch Watchlist is empty. Click on Find a Watchable to add to
          your list.
        </div>
      </div>
    );
  }

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
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.808)",
              }}
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
                      <Link  
                        to={`/watchlist/update/${watchlistId}/${watchable.id}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/watchlist/delete/${watchlistId}/${watchable.id}`}
                        className="btn btn-danger mx-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Your Plan to Watch Watchlist is empty. Click on Find a Watchable to add to
          your list.
        </div>
      )}
    </div>
  );
}

export default PlanToWatchTable;
