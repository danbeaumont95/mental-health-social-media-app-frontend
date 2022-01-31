import './App.css';
import Home from './Components/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Tracker from './Components/Tracker';
import Profile from './Components/Profile';
import FriendsList from './Components/FriendsList';
import Friend from './Components/Friend';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={(
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )}
          />
          <Route path="/tracker" element={(
            <PrivateRoute>
              <Tracker />
            </PrivateRoute>
          )}
          />
          <Route path="/profile" element={(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )}
          />
          <Route path="/friends" element={(
            <PrivateRoute>
              <FriendsList />
            </PrivateRoute>
          )}
          />
          <Route path="/friends/:id" element={(
            <PrivateRoute>
              <Friend />
            </PrivateRoute>
          )}
          />
        </Routes>
      </Router>
      <Footer />
    </div>

  );
}

export default App;
