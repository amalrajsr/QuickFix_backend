import { Server } from "socket.io";

export const io = new Server( {
    cors: {
        origin: process.env.ORIGIN_URL as string,
        methods: ["GET", "POST"],
      },
      
});


