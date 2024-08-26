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
const users = new Map();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("join", (username) => {
        users.set(socket.id, username);
        io.emit("userList", Array.from(users.entries()).map(([id, username]) => ({ id, username })));
    });
    socket.on("sendMessage", (message) => {
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
