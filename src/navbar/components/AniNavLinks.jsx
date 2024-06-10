import { motion } from "framer-motion";
import React, { useState } from "react";

export default function AniNavLink({ title }) {
  const [isHovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative  cursor-pointer overflow-hidden"
    >
      <AnimatedWord2
        title={title}
        animation={letterAnimation}
        isHovered={isHovered}
      />
      <div className="absolute top-0">
        <AnimatedWord
          title={title}
          animation={letterAnimationTwo}
          isHovered={isHovered}
        />
      </div>
    </motion.div>
  );
}

const titleAnimation = {
  rest: {
    transition: {
      staggerChildren: 0.009,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterAnimation = {
  rest: {
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
  hover: {
    y: -30,
    rotateX: 90,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};
const letterAnimationTwo = {
  rest: {
    y: 90,
    rotateX: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
  hover: {
    y: 0,
    color: "#FF8F00",
    fontFamily: "circular",
    shadowBlur: 10,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};

const AnimatedWord = ({ title, animation, isHovered }) => {
  return (
    <motion.span
      variants={titleAnimation}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      className="whitespace-nowrap relative "
    >
      {title.split("").map((character, i) =>
        character === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <motion.span
            key={i}
            variants={animation}
            className="relative inline-block whitespace-nowrap"
          >
            {character}
          </motion.span>
        )
      )}
    </motion.span>
  );
};

const AnimatedWord2 = ({ title, animation, isHovered }) => {
  return (
    <motion.span
      variants={titleAnimation}
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
      {/* {title.split("").map((character, i) =>
        character === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
        )
      )} */}
    </motion.span>
  );
};
