import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
         <div className='logo'>
            <span className='font-bold text-x1 mx-8'>Task</span>
         </div>
         <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Task</li>
           
         </ul>
    </nav>
  )
}

export default Navbar