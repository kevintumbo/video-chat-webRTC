import { Socket } from 'socket.io';

interface socketInterface {
    handleConnection(): void;
    middlewareImplementation?(socket: Socket, next: any): void;
}

export default socketInterface