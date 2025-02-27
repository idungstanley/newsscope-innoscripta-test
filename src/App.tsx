import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Loader } from "./components/Loader";

// Lazy loading the pages
const Home = lazy(() => import("./pages/Home"));

const App: React.FC = () => {
  return (
      <Router>
      <Navbar />
      <div className="min-h-screen">
        {/* Suspense to show loader while loading components */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
