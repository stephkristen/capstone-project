import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';

import AddModal from "./components/AddModal";
import FormErrors from "./components/FormErrors";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Error from "./components/Errors";
import Login from "./components/Login";
import Results from "./components/Results";
import Signup from "./components/Signup";
import Search from "./components/Search";
import Watchables from "./components/Watchables";
import WatchableDetails from "./components/WatchableDetails";
import WatchableTable from "./components/WatchableTable";
// import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const login = setUser;

  return (
    <AuthContext.Provider value={{ user, login }}>
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
              <Route path="/watchlist" element={<WatchableTable />} />
              <Route path="/details/:id" element={<WatchableDetails />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/error" element={<Error></Error>}></Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" replace={true} />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
