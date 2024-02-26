const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://localhost:4000",
  },
});
httpServer.listen(3001);
console.log("サーバーが起動しました");

let roomNames = [];

// 何らかの部屋が作られたら実行される
io.of("/").adapter.on("create-room", (room) => {
  console.log("create room: " + room);

  if (room.startsWith("room")) {
    roomNames.push(room);
  }
  console.log(roomNames);
});

io.on("connection", (socket) => {
  // 部屋に入ったとき（roomNameがnullなら新しく部屋を作る）
  socket.on("enter", (roomName) => {
    socket.join(roomName);
    socket.roomName = roomName;

    console.log("id=" + socket.id + " enter room=" + roomName);
    console.log(Array.from(socket.adapter.rooms.get(roomName)));
  });

  // 接続する準備ができたguestが呼び出す
  socket.on("connection request", (roomName) => {
    const socketIds = Array.from(socket.adapter.rooms.get(roomName));
    console.log(socketIds);
    io.to(socket.id).emit("send offers", socketIds);
  });

  socket.on("offer", (offer, socketId) => {
    io.to(socketId).emit("offer", offer, socket.id);
    console.log("send offer to " + socketId);
  });

  socket.on("answer", (answer, socketId) => {
    io.to(socketId).emit("answer", answer, socket.id);
    console.log("send answer to " + socketId);
  });

  socket.on("candidate", (candidate, socketId) => {
    io.to(socketId).emit("candidate", candidate, socket.id);
    console.log("send candidate to " + socketId + "from " + socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected id = " + socket.id);
    const roomName = socket.roomName;
    socket.leave(socket.roomName);
    io.to(socket.roomName).emit("user disconnected", socket.id);
    if (!socket.adapter.rooms.get(roomName)) {
      roomNames = roomNames.filter((item) => item !== roomName);
      console.log(roomNames);
    }
  });
});
