import React from 'react'
import { MyProjects } from '../Components/Projects/MyProjects'

const Work = () => {
  return (
    <section>
    <div className='flex flex-col items-center text-gray-400 mt-10 md:mt-20 text-center mx-auto'>
        <h1 className="font-extrabold text-transparent text-4xl md:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-5 mx-5 md:mx-auto">My Projects</h1>
        <p>Here are some of my works</p>
    </div>
    <MyProjects/>
    </section>
  )
}

export default Work