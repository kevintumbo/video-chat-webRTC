import express, { Express, Request, Response } from 'express';
import { Server, createServer } from 'http';
import dotenv from 'dotenv';
import Websocket from './modules/websocket/websocket';

dotenv.config();

const app:Express = express();
const port = process.env.PORT || 3000;

const httpServer:Server = createServer(app);
const io = Websocket.getInstance(httpServer);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
});

httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost: ${port}`);
})