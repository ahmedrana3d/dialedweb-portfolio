import React from 'react'
import Section from "./Section";

function Page4() {
  return (
    <Section>
       <div className='important justify-center items-center text-white font-Helvetic w-full h-[200px] lg:h-[150px] text-2xl lg:text-4xl text-center opacity-0 hidden'>
              <h1>BUT WHY IS A GREAT WEBSITE SO IMPORTANT!</h1>
            </div>
        <div className='section4 w-full h-screen flex flex-col items-center justify-between font-Helvetic text-white opacity-0  '>
            <div className=' w-full h-[100px] text-2xl lg:text-5xl pt-16 text-center'>
              <h1>OUTSHINE YOUR COMPETITORS</h1>
            </div>
            <div className=' w-full h-[150px] text-2xl lg:text-4xl  text-center'>
              <h1>BUT WHY IS A GREAT WEBSITE SO IMPORTANT!</h1>
            </div>
        </div>
    </Section>
  )
}

export default Page4