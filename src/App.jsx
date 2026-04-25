import { useState, useRef, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Slate from './components/slate'
import Card from './components/card'
import Logpanel from './components/logpanel'
import Login from './components/login.jsx'
import Sidesearch from './components/sidesearch.jsx'
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query, orderBy, serverTimestamp, addDoc, getDocs, deleteDoc, doc, updateDoc, where } from 'firebase/firestore';


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [shifted, setShifted] = useState(false);
  const [activatetaskID, setActivatetaskID] = useState(null)
  const [cardopen, setCardopen] = useState(false)
  const [logsopen, setLogsopen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const [logs, setLogs] = useState([])
  const refer = useRef()
  const [on, setOn] = useState(false)
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewingUserId, setViewingUserId] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchText.trim()) {
        setUsers([]);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("username", ">=", searchText),
        where("username", "<=", searchText + "\uf8ff")
      );

      const snapshot = await getDocs(q);

      const result = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(u => u.id !== user?.uid);

      setUsers(result);
    };

    fetchUsers();
  }, [searchText]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const userToLoad = viewingUserId || user.uid;

    const q = query(
      collection(db, "users", userToLoad, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsubTasks = onSnapshot(q, (snapshot) => {
      let liveTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // if (viewingUserId) {
      //   liveTasks = liveTasks.filter(task => task.isPublic);
      // }

      setTasks(liveTasks);
    });

    return () => unsubTasks();
  }, [user, viewingUserId]);

  const taskId = activatetaskID;
  const isowner = !viewingUserId;

  useEffect(() => {
    if (!user || !taskId) return;


    const userToLoad = viewingUserId || user.uid;

    const q = query(
      collection(db, "users", userToLoad, "tasks", taskId, "logs"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const liveLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(liveLogs);
    });

    return () => unsub();
  }, [user, taskId, viewingUserId]);

  const addlog = async (taskId, newLog) => {
    if (!isowner) return;
    if (!user || !taskId) return;
    await addDoc(
      collection(db, "users", user.uid, "tasks", taskId, "logs"),
      {
        title: newLog.title,
        fileUrl: newLog.fileUrl || null,
        filename: newLog.fileName || null,
        createdAt: serverTimestamp()
      }
    );
  }

  const deleteLog = async (taskId, logId) => {
    if (!isowner) return;
    if (!user || !taskId || !logId) return;

    await deleteDoc(
      doc(db, "users", user.uid, "tasks", taskId, "logs", logId)
    )
  }



  const handle = () => {
    refer.current.style.top = `1.1rem`;
    refer.current.style.opacity = 100;

  };

  const handlechange = (e) => {
    setTask(e.target.value)
    // setTasks([...tasks, {task }])
  }

  const handlesubmit = async () => {
    if (!isowner) return;
    if (!task.trim() || !user) return;

    await addDoc(collection(db, "users", user.uid, "tasks"), {
      task,
      description: "",
      createdAt: serverTimestamp(),
      isPublic: true,
      logs: []
    });

    setTask("");
    refer.current.style.opacity = 0;
    refer.current.style.top = "-13rem";
  };

  const handleDelete = async (id) => {
    if (!isowner) return;
    if (!user || !id) return;


    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteDoc(
        doc(db, "users", user.uid, "tasks", id)
      );
      setActivatetaskID(null);
      setShifted(false);
      setCardopen(false);
      setLogsopen(false);
    }
  };

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

  // console.log("USER:", user?.uid);
  // console.log("TASK:", task?.id);
  // console.log("LOG:", log);


  useEffect(() => {
    setShifted(false);
    setCardopen(false);
    setLogsopen(false);

  }, [viewingUserId, user?.uid]);


  let count = tasks.length;
  useEffect(() => {
    count = tasks.length;
  }, [tasks]);
  
  useEffect(() => {
    setViewingUserId(null);
  }, [user]);

  if (loading) return null;

  return (
    <div className="main">
      {!user ? <Login />
        : <>
          <Navbar
            ison={on}
            onupdate={(val) => setOn(val)}
            onSearch={(text) => setSearchText(text)}
            count={count}
          />

          <div className="body">

            <h1 className='page_title'>{viewingUserId ? `Viewing ${users.find(u => u.id === viewingUserId)?.username || 'User'}'s work` : "your work & tasks!"}</h1>
            <div className={`inside_box ${shifted ? "shifted" : ""}`}>
              {viewingUserId && (
                <button className='Back' onClick={() => setViewingUserId(null)}>
                  Back to My Tasks
                </button>
              )}
              <button className='Add_but' onClick={handle} disabled={!isowner}>ADD</button>
              <input ref={refer} disabled={!isowner} onChange={handlechange} onKeyDown={(e) => e.key === "Enter" && handlesubmit()}
                value={task} className='Add_title' type='text' placeholder='Add Task' />

              {tasks.length === 0 && (
                <p className="empty">Add some tasks!</p>
              )}

              {tasks.map(item => {
                if(viewingUserId && item.isPublic === false) return null;
                return < div key={item.id} >
                  {<Slate title={item.task} isPublic={item.isPublic} onCardsclick={() => CardShift(item.id)} onLogsclick={() => logPanelShift(item.id)} /> || "add some tasks!"}
                </div>
              })}

            </div>

            <Card
              task={tasks.find(t => t.id === activatetaskID)}
              isOpen={cardopen}
              onUpdatePvt={async(val)=>{
                if(!isowner) return;
                if(!user || !activatetaskID) return;

                await updateDoc(
                  doc(db,"users",user.uid,"tasks",activatetaskID),
                  {isPublic: val}
                )
              }}

              onUpdate={async (desc) => {
                if (!isowner) return;
                if (!user || !activatetaskID) return;

                await updateDoc(
                  doc(db, "users", user.uid, "tasks", activatetaskID),
                  { description: desc }
                );
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
              onDelete={(id) => handleDelete(id)}
            />



            <Logpanel
              logs={logs}
              taskId={activatetaskID}
              addlog={addlog}
              logid={tasks.find(t => t.id === activatetaskID)?.logs?.[0]?.id}
              isOpen={logsopen}
              deleteLog={deleteLog}
              viewingUserId={viewingUserId}


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

            <Sidesearch
              ison={on}
              users={users}
              onUserSelect={(id) => {
                setViewingUserId(id);
                setActivatetaskID(null);
                setCardopen(false);
                setLogsopen(false);
                setShifted(false);
              }}
            />

          </div>
        </>}
      <ToastContainer />
    </div>
  )
}

export default App
