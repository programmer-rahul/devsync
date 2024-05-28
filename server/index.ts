import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { ioListener, userSockets } from "./socket/socket";

// to access env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);

//midddlewares
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(userSockets);
});

// io connection
io.on("connection", ioListener);

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
