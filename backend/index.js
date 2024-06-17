import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import  usersRoutes  from './routes/api/usersRoutes.js'
import listingsRoutes from './routes/api/listingsRoutes.js'
import appointmentRoutes from  './routes/api/appointmentRoutes.js'
// import path from 'path'

// const __dirname = path.resolve() 

const app = express()

const database = process.env.DATABASE_URI

const PORT = process.env.PORT || 3500

// Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cors())
app.use(cookieParser())


//Routes
app.use('/users',usersRoutes)
app.use('/listings',listingsRoutes)
app.use('/appointment',appointmentRoutes)

// app.use(express.static(path.join(__dirname,'/client/dist')))

// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname,'client','dist','index.html'))
// })


// error handling
// app.use((err,req,res,next) => {
//     const statuscode = err.statuscode || 500
//     const message = err.message
//     return res.status(statuscode).json({
//         success: false, 
//         statuscode,
//         message
//     })
// })

app.listen(PORT, async () => {
    await mongoose.connect(database)
        .then(() => console.log(`database connected successfully\n Server running on port ${PORT}`))
        .catch((err) => console.log(`database conncetivity failed: ${err.message}`))
})

