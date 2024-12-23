import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-5 md:px-10 py-5 h-14 m mb-2 md:mb-5">


          <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-700'>

              &lt;
            </span>
            <span>

              Pass
            </span>
            <span className='text-green-700'>
              OP/&gt;
            </span>

          </div>

          <button className='bg-green-600 flex flex-row justify-between text-white my-4 mx-2 rounded-full items-center ring-white ring-1'>
            <img className='invert w-10 p-1 ' src="src/assets/github.png" alt="github logo" />
            <span className='font-bold px-2 text-xl' >GitHub</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
