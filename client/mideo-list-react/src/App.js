import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
import WatchableForm from "./components/WatchableForm"
import FormErrors from "./components/FormErrors";
import UpdateConfirmation from "./components/UpdateConfirmation";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import Login from "./components/Login";
import Results from "./components/Results";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import Watchables from "./components/Watchables";
import WatchableDetails from "./components/WatchableDetails";
import Watchlist from "./components/Watchlist";
import './index.css';
import './App.scss';

import { refresh } from './services/auth';
import DeleteConfirmation from "./components/DeleteConfirmation";
import AboutUs from "./components/AboutUs";

function App() {
  const [user, setUser] = useState(null);
  const login = setUser;

  function logout() {
    setUser(null);
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    refresh()
      .then(setUser)
      .catch(() => logout());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div>
          <header className="mb-3">
            <NavBar />
          </header>
          <main style={{ minHeight: "90vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/results" element={<Results />} />
              <Route path="/watchlist" element={user ? <Watchlist /> : <Navigate to='/login' />} />
              <Route path="/details/:imdbId" element={<WatchableDetails />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/error" element={<Error></Error>}></Route>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace={true} />}/>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/watchlist/update/:watchlistId/:watchableId" element={<UpdateConfirmation />} />
              <Route path="/watchableform" element={<WatchableForm />} />
              <Route path="/watchlist/delete/:watchlistId/:watchableId" element={<DeleteConfirmation />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
