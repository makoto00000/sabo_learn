// ----------------------------------------------------------------------------------------------------
// env
const WSS_URL = "wss://127.0.0.1:3001";
let server = null;
let peerConnection = null;

// const dom = {
//   videos: {
//     local: document.getElementById("local_video"),
//     remote: document.getElementById("remote_video"),
//   },
//   sdp: {
//     send: document.getElementById("text_for_send_sdp"),
//     recv: document.getElementById("text_for_recv_sdp"),
//   },
// };

// ----------------------------------------------------------------------------------------------------
// onClick

export function prepare(myVideo, otherVideo, sendInput, recvInput) {
  prepareWebSocket(sendInput, recvInput);
  prepareRTCPeerConnection(otherVideo);
  wakeupVideo(myVideo);
}

export function connect(sendInput) {
  createOffer(sendInput);
}

// ----------------------------------------------------------------------------------------------------
// WebSocket

function prepareWebSocket(sendInput, recvInput) {
  server = new WebSocket(WSS_URL);
  server.onopen = onOpen;
  server.onerror = onError;
  server.onmessage = onMessage;

  function onOpen(e) {
    console.log("open web socket server.");
  }

  function onError(e) {
    console.error(e);
  }

  async function onMessage(e) {
    const text = await e.data.text();
    const msg = JSON.parse(text);

    if (msg.type === "offer") {
      receiveSessionDescription(msg, recvInput);
      await createAnswer(sendInput);
      return;
    }

    if (msg.type === "answer") {
      receiveSessionDescription(msg, recvInput);
      return;
    }

    if (msg.type === "candidate") {
      const candidate = new RTCIceCandidate(msg.ice);
      peerConnection.addIceCandidate(candidate);
    }
  }
}

// ----------------------------------------------------------------------------------------------------
// RTCPeerConnection

function prepareRTCPeerConnection(otherVideo) {
  const config = { iceServers: [] };
  peerConnection = new RTCPeerConnection(config);

  peerConnection.ontrack = onTrack;
  peerConnection.onicecandidate = onIceCandidate; // offer, answerが作成されたときに実行

  function onTrack(e) {
    console.log(e);
    let stream = e.streams[0];
    playVideo(otherVideo, stream);
  }

  function onIceCandidate(e) {
    console.log("onicecandidate");
    if (e.candidate === null) return;

    const data = {
      type: "candidate",
      ice: e.candidate,
    };

    server.send(JSON.stringify(data));

    // const localDescription = peerConnection.localDescription;
    // sendSessionDescription(localDescription);
  }
}

async function createOffer(sendInput) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  sendSessionDescription(offer, sendInput);
}

async function createAnswer(sendInput) {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  sendSessionDescription(answer, sendInput);
}

function sendSessionDescription(description, sendInput) {
  const data = JSON.stringify(description);
  server.send(data);
  // dom.sdp.send.value = description.sdp;
  sendInput.value = description.sdp;
}

async function receiveSessionDescription(description, recvInput) {
  await peerConnection.setRemoteDescription(description);
  // dom.sdp.recv.value = description.sdp;
  recvInput.value = description.sdp;
}

// ----------------------------------------------------------------------------------------------------
// video

async function wakeupVideo(video) {
  const config = { video: true, audio: false };

  const stream = await navigator.mediaDevices.getUserMedia(config);

  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  playVideo(video, stream);
}

function playVideo(video, stream) {

  video.srcObject = stream;
  video.play();
  video.volume = 0;
}
