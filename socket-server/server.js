const { Server } = require("socket.io");
const { createServer } = require("http");
const crypto = require('crypto')

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://localhost:4000",
  },
});
httpServer.listen(3001);
console.log("サーバーが起動しました");

let roomNames = [];
let userNames = {}

// 何らかの部屋が作られたら実行される
io.of("/").adapter.on("create-room", (room) => {
  console.log("create room: " + room);

  // ユーザーが繋がっただけでも実行されるので頭にroomがついているものをroomNameとする
  if (room.startsWith("room")) {
    roomNames.push(room);
  }
  console.log("roomNames:" + roomNames);
});

io.on("connection", (socket) => {
  // roomに追加
  // 一人目なら新しく部屋を作成。3人以下の部屋があればそこに入れる。
  let connectRoomName = null;
  roomNames.forEach(async (roomName) => {
    const socketIds = Array.from(socket.adapter.rooms.get(roomName));
    if (socketIds.length < 4) {
      connectRoomName = roomName;
      return;
    }
  });
  if (connectRoomName === null) {
    const N = 16
    const randomRoomName = crypto.randomBytes(N).toString('base64').substring(0, N)
    connectRoomName = "room" + randomRoomName
  }
  socket.join(connectRoomName);
  socket.roomName = connectRoomName;
  console.log("id = " + socket.id + "name = " + userNames[socket.id] + " enter room = " + connectRoomName);

  // roomに接続しているsocket idの配列
  const socketIds = Array.from(socket.adapter.rooms.get(connectRoomName))
  console.log("socket ids connected to " + connectRoomName + " : " + socketIds);
  
  socket.on("notification entered room", (userName) => {
    userNames[socket.id] = userName;
    const socketIds = Array.from(socket.adapter.rooms.get(connectRoomName))
    io.to(socket.roomName).emit("assign room", socket.id, connectRoomName, socketIds);
  })

  // 接続する準備ができたguestが呼び出す
  socket.on("connection request", () => {
    const socketIds = Array.from(socket.adapter.rooms.get(socket.roomName));
    console.log(socketIds);
    io.to(socket.id).emit("send offers", socketIds, userNames);
    // socket.broadcast.emit("prepare offer", socket.id);
  });
  
  // socket.on("complete receive offer", () => {
  //   const socketIds = Array.from(socket.adapter.rooms.get(socket.roomName));
  //   socket.broadcast.emit("send offers", socketIds);
  // })

  socket.on("offer", (offer, socketId, userName) => {
    io.to(socketId).emit("offer", offer, socket.id, userName);
    console.log("send offer to " + socketId + " name: " + userName);
  });

  socket.on("answer", (answer, socketId) => {
    io.to(socketId).emit("answer", answer, socket.id);
    console.log("send answer to " + socketId);
  });

  socket.on("candidate", (candidate, socketId) => {
    io.to(socketId).emit("candidate", candidate, socket.id);
    console.log("send candidate to " + socketId + "from " + socket.id);
  });

  socket.on("isStudying", (isStudying) => {
    socket.broadcast.emit("isStudying", isStudying, socket.id);
    console.log(`${socket.id} isStudying is ${isStudying}`)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected id = " + socket.id);
    const roomName = socket.roomName;
    socket.leave(socket.roomName);
    io.to(socket.roomName).emit("user disconnected", socket.id);
    if (!socket.adapter.rooms.get(roomName)) {
      roomNames = roomNames.filter((item) => item !== roomName);
      delete userNames[socket.id];
      console.log(roomNames);
    }
  });
});
