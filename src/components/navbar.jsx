import React from 'react'

const navbar = () => {
  return (
    <nav className='flex md:justify-around bg-slate-800 py-2'>
        <div className="logo">
            <span className='md:font-bold md:text-xl md:mx-8 text-white pl-5'>What To Do</span>
        </div>
        <ul className="flex md:gap-5 md:mx-5  text-white pl-[50px]">
            <li className='cursor-pointer hover:font-bold transition-all pr-3'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
            
        </ul>
    </nav>
  )
}

export default navbar
 