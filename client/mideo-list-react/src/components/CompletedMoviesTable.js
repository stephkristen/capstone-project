import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { findByUserId, findByType } from "../services/watchlist";

function CompletedMoviesTable() {
  const { user } = useContext(AuthContext);
  const [watchables, setWatchables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    findByType(user.id, "Completed%20Movies")
      .then(setWatchables)
      .catch(() => navigate("/error"));
  }, []);

  console.log(watchables.watchables);
  console.log(user.id);

  return (
    <div className="p-5">
      <div>
        <h2 style={{ textAlign: "center" }}>Completed Movies List</h2>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Release Year</th>
            <th scope="col">Genre</th>
            <th scope="col">Your Rating</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{watchables.title}</td>
            </tr>
          {/* {watchables.map((watchable) => {
            return (
              <tr key={watchable.id}>
                <td>{watchable.title}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedMoviesTable;
