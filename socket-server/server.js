const { Server } = require("socket.io");
const { createServer } = require("http");
const crypto = require('crypto')
require('dotenv').config({ debug: true });

let origin = "https://localhost:4000"
let port = 3001
if (process.env.NODE_ENV === 'production') {
  origin = process.env.ORIGIN_URL
  port = process.env.PORT
}

const httpServer = createServer((req, res) => {
  // リクエストのURLが/healthcheckであるかを確認
  if (req.url === '/healthcheck') {
    // /healthcheckにアクセスした場合、ステータスコード200を返す
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    // /healthcheck以外のURLにアクセスした場合、404 Not Foundを返す
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
const io = new Server(httpServer, {
  cors: {
    origin: origin,
  },
  // transports: ["websocket"],
});
httpServer.listen(port);
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
  
  // 部屋に入ったことを通知
  socket.on("notification entered room", (userName) => {
    userNames[socket.id] = userName;
    const socketIds = Array.from(socket.adapter.rooms.get(connectRoomName))
    io.to(socket.roomName).emit("assign room", socket.id, connectRoomName, socketIds);
  })

  // 部屋に接続している人数を返す
  socket.on('getRoomSize', (callback) => {
    const roomSize = io.sockets.adapter.rooms.get(socket.roomName).size;
    callback(roomSize);
  });

  // 接続する準備ができたoffer側が呼び出す
  socket.on("request connection", (offerSocketId, offerUserName) => {
    io.to(socket.roomName).emit("request connection", offerSocketId, offerUserName);
    console.log(`request connection to ${socket.roomName} from ${offerSocketId}`)
  });
  
  socket.on("allow connection", (offerSocketId, answerUserName) => {
    io.to(offerSocketId).emit("send offer", socket.id, answerUserName);
    console.log(`allow connection to ${offerSocketId}`)
  })

  socket.on("offer", (offer, answerSocketId) => {
    io.to(answerSocketId).emit("offer", offer, socket.id);
    console.log("send offer to " + answerSocketId);
  });

  socket.on("answer", (answer, offerSocketId) => {
    io.to(offerSocketId).emit("answer", answer, socket.id);
    console.log("send answer to " + offerSocketId);
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
