import { io } from 'socket.io-client';

export const socket = io('https://socket-backend-gp0t.onrender.com', {
    autoConnect: false,
});
