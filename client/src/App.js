import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"

function App() {
  // State that will hold our data
  const [tasks, setTasks] = useState({})
  // Toggle to rerender upon form submission
  const [didSubmit, setDidSubmit] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)
  // Ref Hook for form 
  const entry = useRef(null)
  const status = useRef(null)

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('http://localhost:3000/tasks/table')
        await setTasks(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [didSubmit, buttonPressed])

  const handleButtons = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`http://localhost:3000/tasks/${id}`, {
        status: statusChange
      })
      // if (status === 200) {
      //   const formattedData = await tasks.map((task) => {
      //     if (task._id === id) {
      //       task.status = statusChange
      //     }
      //     return task
      //   })
      //   setTasks(formattedData)
      if (status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log("Something went wrong")
      }
      
      // } else {
      //   console.log('Something went wrong')
      // }
      
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    
    try {
      await axios.post('http://localhost:3000/tasks', {
        entry: entry.current.value,
        status: status.current.value.toUpperCase()
      })
      setDidSubmit(!didSubmit)
      entry.current.value = ""
    } catch (err) {
      console.log(err)
    }


  }

  return (
    <div className="App">
      <div className="container">
      <div id="to-do" className="section">
          <h2>To-Do</h2>
          <div className="list">
            {
              tasks["TO-DO"] ?
              tasks["TO-DO"].map((item, i) => {
                return(
                  <div className="task" key={i}> 
                    <Link to={`/${item._id}`}>{item.entry}</Link>
                    <div>
                      
                      <button className="button" onClick={() => { handleButtons("COMPLETED", item._id) }}><AiOutlineArrowLeft /></button>
                      <button className="button" onClick={() => { handleButtons("PENDING", item._id) }}><AiOutlineArrowRight /></button>
                    </div>
                  </div>
                )
              })
              : 
              ""
            }
          </div>
      </div>
      <div id='pending' className="section">
        <h2>Pending</h2>
        <div className="list">
          {
            tasks["PENDING"] ?
            tasks["PENDING"].map((item, i) => {
              return(
                <div className="task" key={i}> 
                 <Link to={`/${item._id}`}>{item.entry}</Link>
                  <div>
                      
                      <button className="button" onClick={() => { handleButtons("TO-DO", item._id) }}><AiOutlineArrowLeft/></button>
                      <button className="button" onClick={() => { handleButtons("COMPLETED", item._id) }}><AiOutlineArrowRight /></button>
                    </div>
                </div>
              )
            })
            : 
            ""
          }
        </div>
      </div>
      <div id='completed'className="section" >
        <h2>Completed</h2>
        <div className="list">
          {
            tasks["COMPLETED"] ?
            tasks["COMPLETED"].map((item, i) => {
              return(
                <div className="task" key={i}> 
                  <Link to={`/${item._id}`}>{item.entry}</Link>
                  <div>
                      <button className="button" onClick={() => { handleButtons("PENDING", item._id) }}><AiOutlineArrowLeft /></button>
                      <button className="button" onClick={() => { handleButtons("TO-DO", item._id) }}><AiOutlineArrowRight /></button>
                    </div>
                </div>
              )
            })
            : 
            ""
          }
        </div>
      </div>
      </div>
      <div className="formContainer">
        <form className="form">
          <label>Entry: <input ref={entry} type="text" /></label>
          <label>Status: 
            <select ref={status}>
              <option value="to-do">
                To-Do
              </option>
              <option value="pending">
                Pending
              </option>
              <option value="completed">
                Completed
              </option>
            </select>
          </label>
          <button className='submit' onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
