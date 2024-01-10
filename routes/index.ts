import { Express, Request, Response, NextFunction, Errback } from "express-serve-static-core";
import { ServerResponse, IncomingMessage, Server } from 'http'
import { Create, Delete } from "../controllers/Users";
import { Router } from "express";

const mountRoutes = (app: Express, server: Server<typeof IncomingMessage, typeof ServerResponse>) => {   
    const router = Router()

    // Create User Endpoint
    router.post('/user', Create)

    // Delete User Endpoint
    router.delete('/user/:userId', Delete)
    
    // Add prefix API to endpoint
    app.use('/api', router)
    

    // Default error handler
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        return res.status(err.output.statusCode).send(err.output.payload);
    });
}

export default mountRoutes