import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map<string, string>();

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

io.on("connection", (socket: Socket) => {
     console.log("New user connected");

     socket.on("join", (username: string) => {
          users.set(socket.id, username);
          io.emit("userList", Array.from(users.entries()).map(([id, username]) => ({ id, username })));
     });

     socket.on("sendMessage", (message: string) => {
          const username = users.get(socket.id);
          if (username) {
               io.emit("message", { user: username, text: message });
          }
     });

     socket.on("disconnect", () => {
          users.delete(socket.id);
          io.emit("userList", Array.from(users.entries()).map(([id, username]) => ({ id, username })));
     });
});

server.listen(3001, () => {
     console.log("Server listening on port 3001");
});
