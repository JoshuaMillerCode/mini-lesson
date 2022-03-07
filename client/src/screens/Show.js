import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Show = () => {
  // grabbing the param passed to us in the route using the useParams Hook
  const { id } = useParams()
  // Component state that will hold our data
  const [showData, setShowData] = useState({})
  // Navigation Hook to navigate from page to page 
  const navigate = useNavigate()

  // useEffect to collect our data upon page load
  useEffect(() => {
    (async () => {
      try {
        // Assign our axios response to a variable. Use the id from params to get our speciifc task
        const {data} = await axios.get(`http://localhost:3000/tasks/${id}`)
        // Set the showData state to the data we recieved from our server. 
        setShowData(data)
      } catch (err) {

        console.log(err)
      }
    })()
  },[])

  // Function that makes a request to delete route on our server with the speciifc id receive from params 
  const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:3000/tasks/${id}`)
    } catch (err) {
      console.log()
    } finally {
      navigate(-1)
    }
  }

  return(
    <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Link to="/">Home</Link>
      <div style={{width: "70vw", height: "60vh", border: "1px solid black", backgroundColor: "azure", display: "inherit", justifyContent: "inherit", alignItems: "inherit", flexDirection: "column"}}> 
        <h1>Entry: {showData.entry}</h1>
        <p>Status: {showData.status}</p>
        <button onClick={handleDelete}>Delete 🔴  </button>
      </div>
    </div>
  )
}

export default Show