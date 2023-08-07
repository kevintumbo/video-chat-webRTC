import { Server, Socket } from 'socket.io';
import { Server as server } from 'http';

const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["POST", "GET"]
}

class Websocket extends Server {

    private static io: Websocket;

    constructor(httpServer: server) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static getInstance(httpServer: server): Websocket {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }

        return Websocket.io;
    }

    public initializeHandlers(socketHandler: Array<any>) {
        socketHandler.forEach(element => {
            let namespace = Websocket.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            });

            if(element.handler.middlewareImplementation){
                namespace.use(element.handler.middlewareImplementation)
            }
        })
    }
}

export default Websocket;