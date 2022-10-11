// входной файл сервера
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

const app = express() // создано приложение app
dotenv.config()

//Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

async function start() {
    try {
        await mongoose.connect(
            //`mongodb + srv://${DB_USER}:${DB_PASSWORD}@cluster0.oxtaswn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            "mongodb+srv://Andrey:1234_Andrey@cluster0.oxtaswn.mongodb.net/mern_blog?retryWrites=true&w=majority"
        )

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()