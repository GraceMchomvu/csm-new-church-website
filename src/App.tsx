import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Prophet from './pages/Prophet';
import Photos from './pages/Photos';
import Give from './pages/Give';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/prophet" element={<Prophet />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/give" element={<Give />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
