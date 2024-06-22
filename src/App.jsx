import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import Project from "./project/Project";
import Contact from "./contact/Contact";
import ProjectBody from "./project/ProjectsBody";

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/baba" element={<ProjectBody />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
