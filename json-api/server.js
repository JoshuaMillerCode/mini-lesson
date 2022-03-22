require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const taskRouter = require('./controllers/task')


app.use(cors())
app.use(express.json())
app.use("/tasks", taskRouter)





app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})