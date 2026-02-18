import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Companies from './pages/Companies';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Nav';
import Footer from './components/Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="members" element={<Companies />} />
          {/* We can add a contact route later if needed, but for now it's on Home */}
        </Route>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
