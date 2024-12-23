import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='bg-slate-800 text-white  bottom-0  w-full flex flex-col justify-center items-center m mt-10'>
        <div className=' logo text-2xl text font-bold'>
          <span className='text-green-600'>
            &lt;
          </span>
          <span>
            Pass
          </span>
          <span className='text-green-600'>
            OP/&gt;
          </span>
        </div>

        <div className='flex justify-center items-center'>
          <span>Created with</span>
          <img className='w-8 m-2' src="src/assets/heart.png" alt="heart" />
          <span>by Brijmohan</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
