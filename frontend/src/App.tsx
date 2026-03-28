import { Routes, Route } from 'react-router-dom';
import GymSelectPage from './pages/GymSelectPage';
import FeedPage from './pages/FeedPage';
import ClimbsPage from './pages/ClimbsPage';
import NavBar from './components/NavBar';
import DifficultyFilter from './components/DifficultyFilter';

function App() {
  return (
    <div className="h-full flex flex-col bg-dark">
      <div className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<GymSelectPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/climbs" element={<ClimbsPage />} />
        </Routes>
        <DifficultyFilter />
      </div>
      <NavBar />
    </div>
  );
}

export default App;
