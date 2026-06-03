const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const onlineUsers = [];
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("User terhubung");

    socket.on("join", (username) => {
    socket.username = username;
    onlineUsers.push(username);
    io.emit("updateUsers", onlineUsers);
});

   socket.on("chatMessage", (data) => {
    console.log(data);

    io.emit("newMessage", data);
});
});

app.use(express.json());

app.use((req, res, next) => {
    console.log("Ada request masuk");

    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "shifa" && password === "123") {
        return res.send("Login berhasil");
    }

    res.send("Username atau password salah");
});

server.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});