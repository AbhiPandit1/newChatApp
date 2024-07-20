import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signups from './pages/signups/Signups.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext'; // Import useAuthContext hook

function App() {
  const { authUser } = useAuthContext(); // Use useAuthContext hook to access authUser

  return (
    <div className="p-4 h-screen flex items-center justify-center text-red-900">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signups />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
