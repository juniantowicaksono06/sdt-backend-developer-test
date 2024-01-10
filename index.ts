import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import http, { ServerResponse, IncomingMessage, Server } from 'http'
import { Express } from "express-serve-static-core"
import mountRoutes from "./routes"
import bodyParser from "body-parser"
import db from "./config/database"




const app: Express = express();
const server: Server<typeof IncomingMessage, typeof ServerResponse> = new http.Server(app)

app.use(cors());

// Use body parser to parse JSON body request
app.use(bodyParser.json())

let port = (process.env.PORT || 8080)

// Mount all route for the API endpoint
mountRoutes(app, server);

db.sync()
.then(() => {
    console.log("Successfully connected to MySQL Database!")
    server.listen(port, () => console.log(`API Listening on Port: ${port}`))
})
.catch((err) => {
    console.log("Error connecting to database:", err)
})
