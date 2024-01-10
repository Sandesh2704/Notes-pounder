import React, { useRef, useState, useEffect } from 'react'
import { MdEdit } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiVolumeUp } from "react-icons/hi";
import { HiPlayPause } from "react-icons/hi2";
import '../style/Foreground.css'
import img from '../assets/nots-docs4.jpg'



export default function Foreground(props) {
    const constraintsRef = useRef(null)
    const { nots, removeNots, mode } = props
    const [isPaused, setIsPaused] = useState(false);

    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synthesis.speak(utterance);
            setIsPaused(true)
        } else {
            alert("Sorry, your browser doesn't support the Web Speech API. Try a different browser.");
        }
    };


    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(false)
    };

    const [boxSize, setBoxSize] = useState({ width: 288, height: 288 });
    const [div1Visible, setDiv1Visible] = useState();

    useEffect(() => {
        const increaseSizeTimeout = setTimeout(() => {
            setBoxSize({ width: 360, height: 500 });
            setDiv1Visible(true)
        }, 7500);

        const revertSizeTimeout = setTimeout(() => {
            setBoxSize({ width: 288, height: 288 });
        }, 11000);
        const revertextTimeout = setTimeout(() => {
            setDiv1Visible(false)
        }, 11000);


        return () => {
            clearTimeout(increaseSizeTimeout);
            clearTimeout(revertSizeTimeout);
            clearTimeout(revertextTimeout)
        };
    }, []);





    return (
        <>
            <div ref={constraintsRef} className="container absolute right-0 p-3 gap-3  flex flex-wrap left-0 z-[0] mb-5 hover:border-none border-0">


                <div className='card_tooltip'>
                    <div className={`cards relative  px-5 pb-7 pt-10 overflow-hidden rounded-[40px] resize border-x-2 border-t-2`}
                        style={{
                            backgroundColor: mode === 'dark' ? '#020B1E' : ' #F4F4F6',
                            color: mode === 'dark' ? 'white' : 'black',
                            width: `${boxSize.width}px`,
                            height: `${boxSize.height}px`,
                            transition: 'width 1s, height 1s',
                            borderColor: '#6930A3'
                        }}>

                        <h1 className='absolute top-0 right-0 bg-red-600 pr-7 pl-5 border-solid  border-2 border-red-500 rounded-bl-full tracking-wider'>important</h1>

                        <div className='flex pb-2 pb-3 item-center border-b-2 text-xl border-zinc-600 tracking-wide font-semiblod'>
                            <span className='pr-2 '><FaFileAlt /></span>
                            <h1>Notes Title</h1>
                        </div>

                        <span className=' mb-2 resize'>
                            <img src={img} alt='' className='w-[100%] max-h-65 h-60 ' />
                        </span>

                        <p className='text-base leading-tight w-full py-2 tracking-wider mb-2' >Capture your Thoughts or Detailed notes.Your notes are always up to date on any device and on tne web</p>
                        <div className="footer absolute bottom-0  w-full left-0 items-center">
                            <div className='flex justify-between px-5 py-1 text-white  bg-zinc-700'>
                                <div>Date</div>
                                <div className='flex ' >
                                    <span className='text-lg bg-zinc-900 p-1 rounded-full' onClick={removeNots}><MdDelete /></span>
                                    <span className='text-lg bg-zinc-900  ml-1 p-1 rounded-full'><LuDownload /></span>
                                    <span className='text-lg bg-zinc-900 ml-1 p-1 rounded-full' ><MdEdit /></span>
                                    <span className='text-lg bg-zinc-900  ml-1 p-1 rounded-full'>
                                        {isPaused ? <HiPlayPause onClick={handleStop} /> :
                                            <HiVolumeUp />}
                                    </span>
                                </div>
                            </div>
                            <div className={`tag  py-3`} style={{ backgroundColor: '#6930A3' }}></div>
                        </div>
                    </div>
                    {div1Visible && <span className={`card-text  ${div1Visible ? 'visible' : 'hidden'}`}>Resize Option</span>}
                </div>


                {
                    nots.map((item) => (
                        <>
                            <div
                                key={item.id}
                                className={`nots-cards relative  px-5 pb-7 pt-10 overflow-hidden w-80  min-w-72  min-h-80  h-72  rounded-[40px] resize border-x-2 border-t-2`}
                                style={{ backgroundColor: mode === 'dark' ? '#020B1E' : ' #F4F4F6', color: mode === 'dark' ? 'white' : 'black', borderColor: item.data.selectColor }}>

                                {item.data.checkbox ? <h1 className='absolute top-0 right-0 bg-red-600 pr-7 pl-5 border-solid  border-2 border-red-500 rounded-bl-full tracking-wider'>important</h1> : item.data.checkbox === 'null'}

                                <div className='flex pb-2 pb-3 item-center border-b-2 text-xl border-zinc-600 tracking-wide font-semiblod'>
                                    <span className='pr-2 '><FaFileAlt /></span>
                                    <h1>{item.data.title}</h1>
                                </div>

                                <span className=' mb-2 resize'>
                                    {item.data.file ? <img src={item.data.file} alt='' className='w-[100%] max-h-65 h-60 ' /> : (item.data.file === 'null')}
                                </span>

                                <p className='text-base leading-tight w-full py-2 tracking-wider mb-2' >{item.data.content}</p>

                                <div className="footer absolute bottom-0  w-full left-0 items-center">
                                    <div className='flex justify-between px-5 py-1 text-white  bg-zinc-700'>
                                        <div> {item.data.selectedDate}</div>
                                        <div className='flex ' >
                                            <span className='text-lg bg-zinc-900 p-1 rounded-full' onClick={() => removeNots(item.id)}><MdDelete /></span>
                                            <span className='text-lg bg-zinc-900  ml-1 p-1 rounded-full'><LuDownload /></span>
                                            <span className='text-lg bg-zinc-900 ml-1 p-1 rounded-full' ><MdEdit /></span>
                                            <span className='text-lg bg-zinc-900  ml-1 p-1 rounded-full'>
                                                {isPaused ? <HiPlayPause onClick={handleStop} /> :
                                                    <HiVolumeUp onClick={() => handleSpeak(item.data.title + item.data.content)} />}
                                            </span>

                                        </div>
                                    </div>
                                    <div className={`tag   py-3`} style={{ backgroundColor: item.data.selectColor }}></div>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}
