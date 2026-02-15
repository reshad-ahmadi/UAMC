import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Companies from './pages/Companies';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/members" element={<Companies />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* We can add a contact route later if needed, but for now it's on Home */}
      </Routes>
    </Router>
  );
}

export default App;
