// входной файл сервера
import express from "express";
import mongoose from "mongoose";

const app = express() // создано приложение app

async function start() {
    try {
        await mongoose.connect()
    } catch (error) {
        console.log(error)
    }
}

start()