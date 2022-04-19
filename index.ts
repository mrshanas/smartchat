import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

const __dirname = process.cwd();

app.get("/", (req: any, res: any) => {
  return res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg: string) => {
    console.log(`Message ${msg}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => console.log("Server started"));
