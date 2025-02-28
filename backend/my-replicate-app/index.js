import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes.js'  // Updated path to local directory

dotenv.config()

const app = express()
const port = process.env.PORT || 4000  // Changed to 4000

// Add CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
