import React, { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="p-2">
      <button
        className="w-full flex justify-between text-white"
        onClick={onClick}
      >
        <span className="text-5xl font-Helvetic mb-3">{title}</span>
        <span>
          <div
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s",
            }}
          >
            <FaArrowAltCircleUp size="30" />
          </div>
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out text-white 
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden font-Helvetic">{content}</div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className="accordion mb-5 p-4 rounded-3xl hover:bg-[#111011] focus:outline-none transition-all duration-500"
        >
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={index === openIndex}
            onClick={() => handleClick(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Accordion;
