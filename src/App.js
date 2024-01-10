import { useEffect, useState } from 'react';
import './App.css';
import AddNots from './components/AddNots';
import Background from './components/Background';
import Foreground from './components/Foreground';
import uuid4 from 'uuid4'


function App() {
  const localStorageKey = "nots"
  const [nots, setnots] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey))
      || []
  })


  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(nots))
  }, [nots])

  const addnots = (data) => {
    setnots([...nots, { id: uuid4(), data }])
    console.log(data, 'aad nots data')
  }


  const removeNots = (id) => {
    const updatenots = nots.filter((val) => {
      return val.id !== id
    })
    setnots(updatenots)
  }


  const [mode, setdarkmode] = useState('light')
  const enablemode = () => {
    if (mode === 'dark') {
      setdarkmode('light');
      document.body.style.backgroundColor = 'light';
    }
    if (mode === 'light') {
      setdarkmode('dark');
      document.body.style.backgroundColor = 'light';
    }
  }



  

  return (
    <>


      <div className='relative '>
        <Background mode={mode} />
        <Foreground nots={nots}  removeNots={removeNots} mode={mode} />
        <AddNots addnots={addnots} mode={mode} modehandle={enablemode} />
      </div>
    </>
  );
}

export default App;
