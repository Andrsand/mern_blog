import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express() // создано приложение app
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors()) // позволяет обращаться к bakend с разных ip адресов
app.use(fileUpload())
app.use(express.json()) // данные будут приходить в формате json
app.use(express.static('uploads'))

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(
            //"mongodb + srv://Andrey:<password>@cluster0.oxtaswn.mongodb.net/?retryWrites=true&w=majority"
            //`mongodb + srv://${DB_USER}:${DB_PASSWORD}@cluster0.oxtaswn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            "mongodb+srv://Andrey:1234_Andrey@cluster0.oxtaswn.mongodb.net/mern_blog?retryWrites=true&w=majority"
        )

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()