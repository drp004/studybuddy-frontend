import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ImageToNotes } from './pages/ImageToNotes';
import { AudioToNotes } from './pages/AudioToNotes';
import { VideoToNotes } from './pages/VideoToNotes';
import { CreatePPT } from './pages/CreatePPT';
import { CareerPath } from './pages/CareerPath';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-to-notes" element={<ImageToNotes />} />
          <Route path="/pdf-to-notes" element={<ImageToNotes />} />
          <Route path="/document-to-notes" element={<ImageToNotes />} />
          <Route path="/audio-to-notes" element={<AudioToNotes />} />
          <Route path="/video-to-notes" element={<VideoToNotes />} />
          <Route path="/create-ppt" element={<CreatePPT />} />
          <Route path="/career-path" element={<CareerPath />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;