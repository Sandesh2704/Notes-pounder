import React from 'react'
import img1 from '../assets/nots-docs2.png'
import '../style/Background.css'

export default function Background({ mode }) {
    return (
        <>
            <div className='background fixed top-0 z-[0] w-full h-full ' style={{ backgroundColor: mode === 'dark' ? '#001B35' : '#E6E6FA' }}>
                <div className="absolute w-full p-5 flex justify-center  text-lg font-semibold border-none" style={{ color: mode === 'dark' ? '#bac4c8' : '#334555' }}>Documents.</div>

                <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] "
                    style={{ color: mode === 'dark' ? '#bac4c8' : '#334555' }}>
                    <span className='flex justify-center'>
                        <img src={img1} alt=" erf dsrfrt" className='h-44 w-44 mb-5' />
                    </span>
                    <h1 className='text-[13vw] leading-none tracking-tighter font-semibold text-center'>Notes<span style={{color:'red' }}>Bot</span></h1>
                    <p className='backround-text-desktop text-center font-medium text-[2vw] mt-10 leading-10'>Capture your Thoughts or Detailed notes. <br /> Your notes are always up to date on <br />  any device and on the web</p>
                    <p className='backround-text-moblie text-center font-medium text-[2vw] mt-10 leading-10'>Capture your Thoughts or Detailed notes. Your notes are always up to date on any device and on the web</p>
                </div>
            </div>
        </>
    )
}
