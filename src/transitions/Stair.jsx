import { motion } from "framer-motion";

export default function Stairs({ children }) {
  const anim = (variants, custom) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom,
    };
  };

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
      },
      transitionEnd: {
        height: 0,
        top: 0,
      },
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
      },
    }),
  };

  const overlay = {
    initial: {
      opacity: 0.5,
    },
    enter: {
      opacity: 0,
    },
    exit: {
      opacity: 0.5,
    },
  };

  const noOfColums = 5;
  const array = new Array(noOfColums).fill(null);
  return (
    <div>
      <div className=" h-full w-full fixed top-0 left-0 pointer-events-none flex z-50">
        <motion.div
          {...anim(overlay)}
          className="h-full w-full fixed top-0 left-0 bg-black"
        ></motion.div>
        {array.map((_, i) => {
          return (
            <motion.div
              {...anim(expand, noOfColums - i)}
              key={i}
              className=" relative h-full w-full bg-black"
            />
          );
        })}
      </div>
      {children}
    </div>
  );
}
