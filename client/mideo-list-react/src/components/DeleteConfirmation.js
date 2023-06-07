import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteWatchableById } from '../services/watchlist';

function DeleteConfirmation() {
	const [watchable, setWatchables] = useState(null);
	const navigate = useNavigate();
	const { watchableId } = useParams();

	// async function handleDelete(watchableId) {
	// 	deleteWatchableById(watchableId)
	// 		.then(() => navigate('/watchlist'))
	// 		.catch(() => navigate('/error'));
	// }

	// useEffect(() => {
	// 	findById(watchableId)
	// 		.then(setWatchables)
	// 		.catch(() => navigate('/error'));
	// }, []);

	return (
		<div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="container w-75 py-5">
                <div className='alert alert-danger' role='alert'>
                    <div>
                        <h2>Delete Confirmation</h2>
                    </div>
                    <div>
                        Are you sure you want to delete the following watchable?{' '}
                        <ul>
                            {/* <li>Id: {watchable.id}</li>
                            <li>Title: {watchable.title}</li> */}
                        </ul>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='btn btn-danger'
                            // onClick={(event) => handleDelete(watchableId)}
                                    >
                            Delete
                        </button>
                        <Link to='/watchlist' className='btn btn-secondary mx-2'>
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default DeleteConfirmation;