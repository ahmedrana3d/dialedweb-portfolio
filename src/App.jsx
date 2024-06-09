import { Canvas } from "@react-three/fiber";
import Home from "./Home/Home";
import LoadingScreen from "./Home/Components/LoadingScreen";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
