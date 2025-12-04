import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
// import AppNavbar from './components/AppNavbar';
// import Home from './pages/Home';

// import Error from './pages/Error';
import Login from './pages/Login';
// import Logout from './pages/Logout';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import UserProvider from './UserContext';

function App() {

    const [user, setUser] = useState({
      id: null
    });

    const unsetUser = () => {

      localStorage.clear();

    };

    useEffect(() => {

    fetch('https://rmantonio-fitnesstrackerserver.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data.user !== "undefined") {

        setUser({
          id: data.user._id
        });

      } else {

        setUser({
          id: null
        });

      }

    })

    }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        {/*<AppNavbar />*/}
        <Container>
          <Routes>
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/*<Route path="/logout" element={<Logout />} />*/}
            {/*<Route path="*" element={<Error />} />*/}
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;