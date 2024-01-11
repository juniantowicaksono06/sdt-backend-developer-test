import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import http, { ServerResponse, IncomingMessage, Server } from 'http'
import { Express } from "express-serve-static-core"
import mountRoutes from "./routes"
import bodyParser from "body-parser"
import db, {connectDB} from "./config/database"

const app: Express = express();
const server: Server<typeof IncomingMessage, typeof ServerResponse> = new http.Server(app)

app.use(cors());

// Use body parser to parse JSON body request
app.use(bodyParser.json())

let port = (process.env.PORT || 8080)

// Mount all route for the API endpoint
mountRoutes(app, server);

// Start listening to server
server.listen(port, () => console.log(`API Listening on Port: ${port}`))

// Connect to the database
connectDB()

export { server, db }
export default app