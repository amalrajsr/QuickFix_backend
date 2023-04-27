import { io } from "../config/socket";

function socketApi() {
  io.on("connection", (socket) => {
    console.log(`user connected with id:${socket.id}`);

    socket.on("send-message", (data) => {
      console.log(data);
    });
  });
}

export default socketApi;

