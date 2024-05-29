import express from "express"
import config from "config"
import cookieParser from "cookie-parser"
import { connectDB } from "./src/db"
import { mainRouter } from "./src/routes/main.route"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)

async function start() {
    try {
        const port:number = config.get("PORT")||4000
        const url:string = config.get("MONGOURI")
        await connectDB(url)
        console.log("database connected")
        app.listen(port,()=>{
            console.log("Server is listening on port",port)
        })
    } catch (error:any) {
        console.log("Error while starting server:",error.message)
    }
}

start()