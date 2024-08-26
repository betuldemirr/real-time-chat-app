import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("/", (req, res) => {
     res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

interface Users {
     [socketId: string]: string;
}

let users: Users = {};

io.on("connection", (socket: Socket) => {
     console.log("A user connected:", socket.id);

     // socket.on("join", (username: string) => {
     //      users[socket.id] = username;
     //      io.emit("userList", Object.keys(users).map(id => ({ id, username: users[id] })));
     //      io.emit("message", { user: "System", text: `${username} has joined the chat` });
     // });

     socket.on("join", (username: string) => {
          users[socket.id] = username;
          const userList = Object.keys(users).map(id => ({ id, username: users[id] }));
          console.log("User list sent to clients:", userList);
          io.emit("userList", userList);
     });

     socket.on("sendMessage", (message: string) => {
          io.emit("message", { user: users[socket.id], text: message });
     });

     socket.on("disconnect", () => {
          io.emit("message", { user: "System", text: `${users[socket.id]} has left the chat` });
          delete users[socket.id];
          io.emit("userList", Object.keys(users).map(id => ({ id, username: users[id] })));
     });
});

server.listen(3001, () => {
     console.log("Server is running on port 3001");
});
