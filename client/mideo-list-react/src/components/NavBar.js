import { NavLink,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function NavBar() {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	function handleLogout() {
		logout();
		navigate('/');
	}
	return (
		<nav id='navbar' className='navbar navbar-expand-lg bg-body-tertiary fixed-top shadow p-2 mb-5 rounded navbar-dark'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand' aria-current='page' to='/'>
					MideoList
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink className='nav-link' aria-current='page' to='/'>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' aria-current='page' to='/aboutus'>
								About Us
							</NavLink>
						</li>
						{user && (
							<>
								<li className='nav-item'>
									<NavLink className='nav-link' to='/watchlist'>
										WatchLists
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link' to='/search' end>
										Search
									</NavLink>
								</li>
							</>
						)}
						{!user && (
							<>
								<li className='nav-item'>
									<NavLink className='nav-link' to='/signup'>
										Sign Up
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link' to='/login'>
										Log In
									</NavLink>
								</li>
							</>
						)}
					</ul>
					{user && (
						<>
							<span className='navbar-text mx-2'>Hello, {user.firstName}!</span>
							<button className='btn btn-dark' onClick={handleLogout}>
								Log Out
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);



}

	
export default NavBar;