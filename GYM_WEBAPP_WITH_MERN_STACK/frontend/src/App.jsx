import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Hero from './components/Hero';
import WorkoutSection from './components/WorkoutSection';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import BMICalculator from './components/BMICalculator';

function App() {
  return (
    <Router>
      <Hero />
      <WorkoutSection />
      <Gallery />
      <Pricing />
      <Contact />
      <BMICalculator />
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
}

export default App;
