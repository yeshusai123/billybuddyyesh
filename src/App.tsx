
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Community from './pages/Community';
import ChatBot from './components/ChatBot';
import AIBackground from './components/background/AIBackground';
import Statistics from './pages/statistics';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <AIBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/chat" element={
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">Chat with Billy</h2>
                  <ChatBot />
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;