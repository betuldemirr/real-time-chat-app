"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/build")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/build", "index.html"));
});
let users = {};
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // socket.on("join", (username: string) => {
    //      users[socket.id] = username;
    //      io.emit("userList", Object.keys(users).map(id => ({ id, username: users[id] })));
    //      io.emit("message", { user: "System", text: `${username} has joined the chat` });
    // });
    socket.on("join", (username) => {
        users[socket.id] = username;
        const userList = Object.keys(users).map(id => ({ id, username: users[id] }));
        console.log("User list sent to clients:", userList);
        io.emit("userList", userList);
    });
    socket.on("sendMessage", (message) => {
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
