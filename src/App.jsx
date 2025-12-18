import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Slate from './components/slate'
import Card from './components/card'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [shifted, setShifted] = useState(false);

  const refer = useRef()
  const box = useRef()

  const handle = () => {
    refer.current.style.top = `1.1rem`;
    refer.current.style.opacity = 100;

  };

  const handlechange = (e) => {
    setTask(e.target.value)
    // setTasks([...tasks, {task }])
  }
  const handlesubmit = () => {
    if (!task.trim()) return
    setTasks([...tasks, { task }])
    setTask("");


    refer.current.style.opacity = 0
    refer.current.style.top = `-13rem`
  }

  const Shift = async () => {
    setShifted(true)
    box.current.style.transform=`translateX(0rem)`
    box.current.style.opacity=100
  };
  const unShift = async () => {
    box.current.style.opacity=0
    setShifted(false)
    box.current.style.transform=`translateX(-34rem)`
  }



  return (
    <div className="main">
      <Navbar />
      <div className="body">
        <h1 className='page_title'>your work & tasks!</h1>
        <div className={`inside_box ${shifted ? "shifted" : ""}`}>
          <button className='Add_but' onClick={handle} >ADD</button>
          <input ref={refer} onChange={handlechange} onKeyDown={(e) => e.key === "Enter" && handlesubmit()}
            value={task} className='Add_title' type='text' placeholder='Add Task' />
          {tasks.map(item => {
            return <div>
              <Slate title={item.task} onClick={Shift} />
            </div>
          })}
        </div>
        <Card ref={box} onClick={unShift}/>
      </div>
    </div>
  )
}

export default App
