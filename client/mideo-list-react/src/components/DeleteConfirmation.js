import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { removeWatchableFromWatchlist } from '../services/watchlist';
import { findWatchableById } from '../services/watchable';
import AuthContext from "../contexts/AuthContext";

function DeleteConfirmation() {
    const { user } = useContext(AuthContext);
	const [watchable, setWatchable] = useState(null);
	const navigate = useNavigate();
	const { watchableId } = useParams();
    const { watchlistId } = useParams();

	async function handleDelete(watchlistId, watchableId) {
		removeWatchableFromWatchlist(watchlistId, watchableId)
			.then(() => navigate('/watchlist'))
			.catch(() => navigate('/error'));
	}

	useEffect(() => {
		findWatchableById(watchableId)
			.then(setWatchable)
			.catch(() => navigate('/error'));
	}, []);

	return (
		<div className="container h-100 d-flex justify-content-center align-items-center p-5">
            <div className="container w-75 py-5">
                {watchable && (
                <>
                    <div className='alert alert-danger' role='alert'>
                        <div>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div>
                            Are you sure you want to delete the following watchable?{' '}
                            <ul>
                                <li>Title: {watchable.title}</li>
                                <li>Type: {watchable.type}</li>
                            </ul>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={(event) => handleDelete(watchlistId, watchableId)}
                                        >
                                Delete
                            </button>
                            <Link to='/watchlist' className='btn btn-secondary mx-2'>
                                Cancel
                            </Link>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
	);
}

export default DeleteConfirmation;