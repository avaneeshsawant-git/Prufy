import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Slate from './components/slate'
import Card from './components/card'
import Logpanel from './components/logpanel'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [shifted, setShifted] = useState(false);
  const [activatetaskID, setActivatetaskID] = useState(null)
  const [cardopen, setCardopen] = useState(false)
  const [logsopen, setLogsopen] = useState(false)
  const refer = useRef()

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
    setTasks([...tasks, {
      id: crypto.randomUUID(),
      task: task,
      description: "",
      createdAt: new Date().toISOString().split('T')[0],
      logs: []
    }])
    setTask("");


    refer.current.style.opacity = 0
    refer.current.style.top = `-13rem`
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter(item => item.id !== id))
    setActivatetaskID(null);
    setShifted(false);
    setCardopen(false);
    setLogsopen(false);
  }

  const CardShift = (id) => {
    setShifted(true)
    setActivatetaskID(id)
    setCardopen(true)
    // console.log(activatetaskID)
  };

  const logPanelShift = (id) => {
    setLogsopen(true)
    setShifted(true)
    setActivatetaskID(id)
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

          {tasks.length === 0 && (
            <p className="empty">Add some tasks!</p>
          )}

          {tasks.map(item => {
            return < div key={item.id} >
              {<Slate title={item.task} onClick={() => CardShift(item.id)} onLogsclick={() => logPanelShift(item.id)} /> || "add some tasks!"}
            </div>
          })}

        </div>

        <Card
          task={tasks.find(t => t.id === activatetaskID)}
          isOpen={cardopen}
          onUpdate={(desc) => {
            setTasks(tasks.map(t => t.id === activatetaskID ? { ...t, description: desc } : t));
          }}
          onClick={() => {
            if (logsopen === false) {

              setShifted(false);
              setActivatetaskID(null);
              setCardopen(false);
            } else {
              setCardopen(false);
            }
          }}
          onDelete={() => handleDelete(activatetaskID)}
        />



        <Logpanel
          activelog={tasks.find(t => t.id === activatetaskID)}
          logid={tasks.find(t => t.id === activatetaskID)?.logs?.[0]?.id}
          isOpen={logsopen}
          onUpdateLog={(newLog) => {
            setTasks(prevTasks =>
              prevTasks.map(t =>
                t.id === activatetaskID
                  ? { ...t, logs: [...(t.logs || []), newLog] }
                  : t
              )
            );
          }}

          onCloseClick={() => {
            if (cardopen === false) {
              setShifted(false);
              setActivatetaskID(null);
              setLogsopen(false);
            } else {
              setLogsopen(false);
            }
          }}
        />

      </div>
    </div>
  )
}

export default App
