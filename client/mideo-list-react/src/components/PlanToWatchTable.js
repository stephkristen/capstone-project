import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { findByUserId, findByType } from "../services/watchlist";

function PlanToWatchTable() {
  const { user } = useContext(AuthContext);
  const [watchables, setWatchables] = useState([]);
  const navigate = useNavigate();
  const padding = { padding: '15px'};

  useEffect(() => {
    findByType(user.id, "Plan%20to%20Watch")
      .then(setWatchables)
      .catch(() => navigate("/error"));
  }, []);

  const allWatchables = watchables.watchables;

  return (
    <div className="p-5">
      {allWatchables && (
        <>
          <div>
            <h2 className="mb-4" style={{ textAlign: "center", color: "white"  }}>Plan to Watch List</h2>
          </div>
          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th scope="col" style={padding}>Title</th>
                <th scope="col" style={padding}>Release Year</th>
                <th scope="col" style={padding}>Genre</th>
                <th scope="col" style={padding}>Your Rating</th>
                <th scope="col" style={padding}>Update</th>
                <th scope="col" style={padding}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allWatchables.map((watchable) => {
                return (
                  <tr key={watchable.id}>
                    <td className="p-4">{watchable.title}</td>
                    <td className="p-4">{watchable.year ? watchable.year : watchable.firstAirYear }</td>
                    <td className="p-2">{watchable.genres.map((genre) => <li>{genre}</li>)}</td>
                    <td className="p-4">{watchable.personalRating}/100</td>
                    <td>
                        <button
                        className='btn btn-primary'>Update</button>
                    </td>
                    <td>
                        <button
                        className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <div>
        <button className='btn btn-info'>Find a Movie to Add to List</button>
      </div>
    </div>
  );
}

export default PlanToWatchTable;
