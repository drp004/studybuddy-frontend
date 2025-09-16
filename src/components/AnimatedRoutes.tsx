import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import About from '@/pages/About';
// import Dashboard from '@/pages/Dashboard';
// import Login from '@/pages/Login';
// import SignUp from '@/pages/SignUp';
import Chat from '@/pages/Chat';

export default function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Chat page without layout */}
        <Route path="/chat" element={<Chat />} />
        
        {/* All other pages with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="about" element={<About />} />
          {/* <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} /> */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}