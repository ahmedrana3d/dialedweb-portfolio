import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Stairs from "../transitions/Stair";
import Experience from "./Experience/Experience";

const HtmlComponent = () => {
  useEffect(() => {
    const canvasElement = document.querySelector(".web-gl");
    const app = new Experience(canvasElement);

    // Cleanup if necessary
    return () => {
      // Assuming Experience has a cleanup method
      if (app && typeof app.cleanup === "function") {
        app.cleanup();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/style.css" />
      </Helmet>
      <div>
        <canvas className="web-gl"></canvas>
      </div>
    </>
  );
};

function Project() {
  return (
    <Stairs>
      <HtmlComponent />
    </Stairs>
  );
}

export default Project;
