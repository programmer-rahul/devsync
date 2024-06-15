import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { ioListener, userSockets } from "./socket/socket";

// to access env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 50000,
  cors: {
    origin: process.env.CORS_ORIGIN?.split(","),
  },
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(","),
  })
);
const PORT = process.env.PORT || 4000;

//midddlewares
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(userSockets);
});

// io connection
io.on("connection", (socket) => ioListener(socket, io));

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

export { app };
