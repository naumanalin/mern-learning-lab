import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Signup from './components/Signup';
import ContactPage from './pages/ContactPage';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course' element={authUser ? <Courses /> : <Navigate to="/signup" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
