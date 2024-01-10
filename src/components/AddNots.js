import React, { useState, useEffect } from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import '../style/AddNots.css'
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import img1 from '../assets/nots-docs2.png'


export default function AddNots({ addnots, mode,  modehandle }) {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const [showNotsForm, setshowNotsFrom] = useState(false)
  const haddleOnclick = () => {
    setshowNotsFrom(current => !current)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  const [notsData, setnotsData] = useState({ title: '', content: '', checkbox: '', file: "", selectColor: '#00BFFF', selectedDate: formattedDate })

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setnotsData({ ...notsData, title: e.target.value.slice(0, 76) })
    } else if (e.target.name === 'selectColor') {
      setnotsData({ ...notsData, selectColor: e.target.value })
    } else if (e.target.name === 'checkbox') {
      setnotsData({ ...notsData, checkbox: !notsData.checkbox })
    } else if (e.target.name === 'file') {
      setnotsData({ ...notsData, file: URL.createObjectURL(e.target.files[0]) })
    } else if (e.target.name === 'dateInput') {
      setnotsData({ ...notsData, dateInput: e.target.value })
    } else {
      setnotsData({ ...notsData, content: e.target.value })
    }
  }

  const colorOptions = [
    { label: 'pink', value: '#FF1493' },
    { label: 'Blue', value: '#00BFFF' },
    { label: 'lightcoral', value: '	#F08080' },
    { label: 'lawngreen', value: '#7cfc00' },
    { label: 'DarkOrange ', value: '#FF8C00' },
    { label: 'Yellow', value: '#FFFF00' },
    { label: 'magenta', value: '#FF00FF' },
  ];


  const handleAddNots = () => {
    setnotsData({ title: "", content: '', })
    addnots(notsData)
    setshowNotsFrom(false)
    console.log(notsData)
  }

  const closehandle = () => {
    setshowNotsFrom(false)
  }
  
  const [div1Visible, setDiv1Visible] = useState();
  const [div2Visible, setDiv2Visible] = useState();
  const [div3Visible, setDiv3Visible] = useState();
  useEffect(() => {

    const showDiv1 = setTimeout(() => {
      setDiv1Visible(true);
    }, 2000); 
    const hideDiv1 = setTimeout(() => {
      setDiv1Visible(false);
    }, 3500);
    
    const showDiv2 = setTimeout(() => {
      setDiv2Visible(true);
    }, 4000); 
    const hideDiv2 = setTimeout(() => {
      setDiv2Visible(false);
    }, 5500);

    const showDiv3 = setTimeout(() => {
      setDiv3Visible(true);
    }, 6000); 
    const hideDiv3 = setTimeout(() => {
      setDiv3Visible(false);
    }, 7500);

    return () => {
      clearTimeout(showDiv1);
      clearTimeout(showDiv3);
      clearTimeout(showDiv2);
      clearTimeout(hideDiv1);
      clearTimeout(hideDiv2);
      clearTimeout(hideDiv3);
    };
  }, []);

  return (
    <>


     

      <div className='addnots-button z-[100]  fixed grid gap-1 top-5 right-3 justify-center'>
      <span className='  rounded-full  w-14 h-14 flex justify-center item-center '>
                    <img src={img1} alt=" erf dsrfrt" className=' ' />
                    </span>
        <div className="tooltip">
          <button onClick={haddleOnclick} 
          className="button bg-red-600 rounded-full p-3 flex justify-center item-center text-3xl"><MdOutlineAdd  />
          </button>
           {div1Visible && <span className={`tooltiptext div1 ${div1Visible ? 'visible' : 'hidden'}`}>Add your nots</span> }
        </div>

        <div className="tooltip">
          <button onClick={haddleOnclick}
           className="button bg-sky-600 rounded-full p-3 flex justify-center item-center text-3xl"><FaCloudUploadAlt  />
          </button>
          {div2Visible && <span  className={`tooltiptext div2 ${div2Visible ? 'visible' : 'hidden'}`}> Upload image option</span> }
        </div>
        <div className="tooltip">
          <button onClick={modehandle} className="button rounded-full p-3 flex justify-center item-center text-3xl " 
          style={{ backgroundColor: mode === 'dark' ? '#bac4c8' : '#334555', color: mode === 'dark' ? 'black' : 'white' }}>{mode === 'dark' ? <MdSunny  /> : <BsFillMoonStarsFill  />}
          </button>
          {div3Visible && <span  className={`tooltiptext div3 ${div3Visible ? 'visible' : 'hidden'}`}>Change theme light into Dark</span> }
        </div>
      </div>

      
      {showNotsForm && (
        <>
          <div className='flex justify-center '>
            <form className='addnots absolute top-5  z-[10]  w-[57%] text-white overflow-hidden resize p-5 rounded-lg  max-h-max border-x-4 border-t-4' style={{ backgroundColor: mode === 'dark' ? '#00008B' : '#F8FBF8', color: mode === 'dark' ? 'white' : 'black', borderColor: notsData.selectColor }} >
              {notsData.checkbox ? <h1 className='absolute top-0 right-0 bg-red-600 pr-5 pl-7 border-solid  border-2 border-red-500 rounded-bl-full tracking-wider text-2xl'>important</h1> : notsData.checkbox === 'null'}

              <div className='closebutton top-0 absolute left-0 bg-sky-700 p-1 text-3xl rounded-br-lg' style={{ backgroundColor: mode === 'dark' ? '#020B1E' : '#E6E6FA', color: mode === 'dark' ? 'white' : 'black' }} onClick={closehandle}><IoCloseCircleOutline /></div>

              <header className='flex justify-center text-2xl mb-5'>Add Nots/Content</header>
              <div className='mb-1'>
                <label htmlFor="dateInput">Today Date: </label>
                <input
                  style={{ backgroundColor: mode === 'dark' ? '#00008B' : '#F8FBF8', color: mode === 'dark' ? 'white' : 'black' }}
                  type="date"
                  id="dateInput"
                  name="dateInput"
                  value={notsData.selectedDate}
                  onChange={handleChange}
                  maxLength={15}
                />
              </div>

              <input className='w-[100%] px-3 py-2 text-xl text-black mb-2 rounded-sm'
                style={{ backgroundColor: mode === 'dark' ? '#020B1E' : '#E6E6FA', color: mode === 'dark' ? 'white' : 'black' }}
                type="text"
                placeholder='Title'
                name='title'
                value={notsData.title}
                onChange={handleChange} required />

              <textarea className='w-[100%] px-3 py-2 text-xl text-black rounded-sm '
                style={{ backgroundColor: mode === 'dark' ? '#020B1E' : '#E6E6FA', color: mode === 'dark' ? 'white' : 'black' }}
                type="text"
                cols="30"
                rows="5"
                placeholder='Your Content'
                name='content'
                value={notsData.content}
                onChange={handleChange} />
              <span className='border-dashed border-2 border-sky-500 w-[100%]  flex justify-center px-3 py-2 mb-3 rounded-sm bg-white text-black' style={{ backgroundColor: mode === 'dark' ? '#020B1E' : '#E6E6FA', color: mode === 'dark' ? 'white' : 'black' }}>

                {notsData.file ? <img src={notsData.file} alt='' className='w-[100%] max-h-65 h-60 mb-2' /> : <input type="file"
                  name='file'
                  accept="image/*"
                  className='cursor-pointer'
                  onChange={handleChange} />}
              </span>

              <div className='flex justify-between mb-3'>
                <div className='item-center'>
                  <input type="checkbox" id="vehicle1" name="checkbox" checked={notsData.checkbox} value={notsData.checkbox} onChange={handleChange} />
                  <label htmlFor="vehicle1"> Add Important Tag</label>
                </div>


                <select name='selectColor' onChange={handleChange} value={notsData.selectColor} className='text-black p-2 w-max' style={{ backgroundColor: '#E6E6FA' }} >
                  <option value="" >Select a card color</option>
                  {colorOptions.map((colorOption, index) => (
                    <option key={index} value={colorOption.value} style={{ backgroundColor: colorOption.value }}>
                      {colorOption.label}
                    </option>
                  ))}
                </select>

              </div>

              <div className='flex justify-center  mb-5 '>
                <button className='w-[30%]  bg-red-600 text-xl py-2 rounded-lg' onClick={handleAddNots}>Submit</button>
              </div>

              <div className="footer absolute bottom-0 w-full left-0 items-center">
                <div className={`tag py-3 `} style={{ backgroundColor: notsData.selectColor }}></div>
              </div>
            </form>
          </div>
        </>
      )}

    </>
  )
}
