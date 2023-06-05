function WatchableTable({ watchlists }) {
  return (
    <div className="p-5">
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
          {watchlists.map((watchlist) => {
            return (
              <tr key={watchlist.id}>
                <td>{watchlist.title}</td>
                {/* <td>
                        <button
                        onClick={(event) => handleDelete(watchable.id)}
                        className='btn-btn-danger'>Delete</button>
                    </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WatchableTable;
