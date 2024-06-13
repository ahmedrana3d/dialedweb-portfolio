import {  Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import Project from "./project/Project";

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;


