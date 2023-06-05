function PlanToWatchTable() {
  return (
    <div className="p-5">
        <div>
            <h2 style={{ textAlign: "center" }}>Plan to Watch List</h2>
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
        <tbody></tbody>
      </table>
    </div>
  );
}

export default PlanToWatchTable;
