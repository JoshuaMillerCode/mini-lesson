import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {
  // State that will hold our data
  const [data, setData] = useState([])
  // Toggle to rerender upon form submission
  const [didSubmit, setDidSubmit] = useState(false)
  // Ref Hook for form 
  const entry = useRef(null)
  const status = useRef(null)

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('http://localhost:3000/tasks')
        
        setData(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [didSubmit])

  const handleButtons = async (statusChange, id) => {
    try {
      const formattedData = await data.map((task) => {
        if (task._id === id) {
          task.status = statusChange
        }
        return task
      })
      const { status } = await axios.put(`http://localhost:3000/tasks/${id}`, {
        status: statusChange
      })
      if (status === 200) {
        setData(formattedData)
      } else {
        console.log('Something went wrong')
      }
      
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:3000/tasks', {
        entry: entry.current.value,
        status: status.current.value.toUpperCase()
      })
      setDidSubmit(!didSubmit)
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
              data.filter(x => x.status === "TO-DO").map((item) => {
                return(
                  <div style={{display: 'flex', justifyContent: "space-evenly"}}> 
                    <Link to={`/${item._id}`}>{item.entry}</Link>
                    <div>
                      Change to:
                      <button onClick={() => { handleButtons("PENDING", item._id) }}>Pending</button>
                      <button onClick={() => { handleButtons("COMPLETED", item._id) }}>Completed</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
      </div>
      <div id='pending' className="section">
        <h2>Pending</h2>
        <div className="list">
          {
            data.filter(x => x.status === "PENDING").map((item) => {
              return(
                <div style={{display: 'flex', justifyContent: "space-evenly"}}> 
                 <Link to={`/${item._id}`}>{item.entry}</Link>
                  <div>
                      Change to:
                      <button onClick={() => { handleButtons("TO-DO", item._id) }}>To-Do</button>
                      <button onClick={() => { handleButtons("COMPLETED", item._id) }}>Completed</button>
                    </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div id='completed'className="section" >
        <h2>Completed</h2>
        <div className="list">
          {
            data.filter(x => x.status === "COMPLETED").map((item) => {
              return(
                <div style={{display: 'flex', justifyContent: "space-evenly"}}> 
                  <Link to={`/${item._id}`}>{item.entry}</Link>
                  <div>
                      Change to:
                      <button onClick={() => { handleButtons("PENDING", item._id) }}>Pending</button>
                      <button onClick={() => { handleButtons("TO-DO", item._id) }}>To-DO</button>
                    </div>
                </div>
              )
            })
          }
        </div>
      </div>
      </div>
      <div style={{marginTop: "20px"}}>
        <form style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column"}}>
          <label>Entry: <input ref={entry} type="text" /></label>
          <label>Status: <input ref={status} type="text" /></label>
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
