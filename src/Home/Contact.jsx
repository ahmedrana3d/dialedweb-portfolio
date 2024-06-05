import gsap from "gsap";
import React, { useEffect, useRef } from "react";

function Contact({ contact, setContact }) {
  const contactRef = useRef(null);

  useEffect(() => {
    if (contact) {
      gsap.to(contactRef.current, {
        height: "100%",
        duration: 1,
        ease: "circ.in",
      });
    }
    if (contact === false) {
      const tl = gsap.timeline();
      tl.to(contactRef.current, {
        height: "0%",
        duration: 1,
        ease: "power1.in",
      });
    }
  }, [contact]);

  return (
    <div
      ref={contactRef}
      className="  w-full absolute top-0 left-0 bg-black text-white overflow-hidden z-40 transition-all "
      // style={{ height: contact ? "100vh" : "0%" }}
    >
        {/* <div className="container mx-auto my-20 w-1/3 border border-purple-500 bg-white">
  <div className="p-5 space-y-5 shadow-xl">
    <h4 className="text-center text-3xl">Contact Us</h4>

    <form>
      <div className="grid grid-cols-2 gap-5">
        <input
          type="text"
          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="First Name"
        />
        <input
          type="text"
          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="Last Name"
        />
        <input
          type="email"
          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
          placeholder="Email"
        />
        <input
          type="tel"
          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
          placeholder="Phone"
        />
        <textarea
          cols="10"
          rows="5"
          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
          placeholder="Write your message..."
        ></textarea>
      </div>
      <input
        type="submit"
        value="Send Message"
        className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
      />
    </form>
  </div>
</div> */}
     
          <h1
          className=" text-center text-4xl fontHorizon  rounded-full cursor-pointer pt-16 hover:text-orange-400 "
            onClick={() => {
              setContact(false);
            }}
          >
            CLOSE CONTACT
          </h1>
       
    </div>
  );
}

export default Contact;
