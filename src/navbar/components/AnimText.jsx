import { motion } from "framer-motion";
import React, { useState } from "react";

export default function AnimText({ title }) {
  const [isHovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative  cursor-pointer overflow-hidden "
    >
      <AnimatedWord2
        title={title}
        animation={letterAnimation}
        isHovered={isHovered}
      />
      <div className="absolute top-0">
        <AnimatedWord2
          title={title}
          animation={letterAnimationTwo}
          isHovered={isHovered}
        />
      </div>
    </motion.div>
  );
}

const letterAnimation = {
  rest: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
  hover: {
    y: -20,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};
const letterAnimationTwo = {
  rest: {
    y: 20,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
  hover: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};

const AnimatedWord2 = ({ title, animation, isHovered }) => {
  return (
    <motion.span
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      className="whitespace-nowrap relative "
    >
      <motion.span
        variants={animation}
        className="relative inline-block whitespace-nowrap"
      >
        {title}
      </motion.span>
    </motion.span>
  );
};
