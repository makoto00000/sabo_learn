"use client";

import { useRef, useState } from "react";
import io from "socket.io-client";

const port = 3001;
const socket = io("http://localhost:" + port + "/");

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const peerConnections = useRef<{
    [socketId: string]: RTCPeerConnection;
  }>({});
  const [roomName, setRoomName] = useState<string | null>("room2");

  let localStream: any = null;

  let remoteVideos: any[] = [];
  const MAX_CONNECTION_COUNT = 3;

  // websocketに繋がったとき
  socket.on("connect", async () => {
    console.log("socket.io connected. enter room=" + roomName);
    console.log(socket.id);
    socket.emit("enter", roomName);
  });

  // guestに対してofferするよう指示がきたとき
  socket.once("send offers", (socketIds: string[]) => {
    let url = new URL(window.location.href);
    const userType = url.searchParams.get("userType");

    // guestの場合は部屋にいる人数分peerconnectionを作成して全員にoffer
    if (userType !== "host") {
      socketIds.forEach(async (socketId) => {
        if (socketId === socket.id) return;
        const config = { iceServers: [] };
        peerConnections.current[socketId] = new RTCPeerConnection(config);

        // ontrack
        peerConnections.current[socketId].ontrack = (e: RTCTrackEvent) => {
          const videoElement = document.createElement("video");
          let stream = e.streams[0];
          videoElement.srcObject = stream;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.width = 240;
          videoElement.height = 180;
          videoElement.id = socketId;
          videoContainerRef.current?.appendChild(videoElement);
          videoElement.play();
          console.log("play video");
        }

        const mediaConfig = { video: true, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);
        stream.getTracks().forEach((track) => {
          peerConnections.current[socketId].addTrack(track, stream);
        });

        const offer = await peerConnections.current[socketId].createOffer();
        await peerConnections.current[socketId].setLocalDescription(offer);

        socket.emit("offer", offer, socketId);
        console.log("send offer to " + socketId);
      });
    }
  });

  // offerが来たとき
  socket.on(
    "offer",
    async (offer: RTCSessionDescriptionInit, socketId: string) => {
      const config = { iceServers: [] };
      peerConnections.current[socketId] = new RTCPeerConnection(config);

      // ontrack
      peerConnections.current[socketId].ontrack = (e: RTCTrackEvent) => {
        const videoElement = document.createElement("video");
        let stream = e.streams[0];
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.width = 240;
        videoElement.height = 180;
        videoElement.id = socketId;
        videoContainerRef.current?.appendChild(videoElement);
        videoElement.play();
        console.log("play video");
      }

      // answerする側のpeerConnectionにはcandidateを送信する関数が必要
      peerConnections.current[socketId].onicecandidate = (
        e: RTCPeerConnectionIceEvent
      ) => {
        if (e.candidate) {
          socket.emit("candidate", e.candidate, socketId);
        }
      };
      const mediaConfig = { video: true, audio: false };
      const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);
      stream.getTracks().forEach((track) => {
        peerConnections.current[socketId].addTrack(track, stream);
      });

      await peerConnections.current[socketId].setRemoteDescription(offer);
      const answer = await peerConnections.current[socketId].createAnswer();
      await peerConnections.current[socketId].setLocalDescription(answer);

      console.log("offer from " + socketId);

      socket.emit("answer", answer, socketId);

      console.log("send answer to " + socketId);
    }
  );

  // answerが来たとき
  socket.on(
    "answer",
    async (answer: RTCSessionDescriptionInit, socketId: string) => {
      await peerConnections.current[socketId].setRemoteDescription(answer);
      console.log("answer from " + socketId);
    }
  );

  // candidateが来たとき
  socket.on("candidate", (candidate: RTCIceCandidateInit, socketId: string) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnections.current[socketId].addIceCandidate(iceCandidate);
    console.log("set candidate to id = " + socketId);
  });

  // ユーザーが退室したとき
  socket.on("user disconnected", (socketId) => {
    console.log("====user disconnected==== id:", socketId);
    if (peerConnections.current[socketId]) {
      delete peerConnections.current[socketId];

      const container = videoContainerRef.current;
      const elementToRemove = container?.querySelector(`#${socketId}`);
      if (elementToRemove) {
        elementToRemove.remove();
      }
      console.log(peerConnections.current);
    }
  });

  // ---- for multi party -----
  function isReadyToConnect() {
    if (localStream) {
      return true;
    } else {
      return false;
    }
  }

  // --- RTCPeerConnections ---
  function getConnectionCount() {
    return Array(peerConnections.current).length;
  }

  function canConnectMore() {
    return getConnectionCount() < MAX_CONNECTION_COUNT;
  }

  function isConnectedWith(id: string) {
    if (peerConnections.current[id]) {
      return true;
    } else {
      return false;
    }
  }

  // ---------------------- onClick -----------------------

  async function startVideo(myVideo: HTMLVideoElement | null) {
    if (myVideo) {
      const config = { video: true, audio: false };
      const stream = await navigator.mediaDevices.getUserMedia(config);
      myVideo.srcObject = stream;
    }
  }

  function connect() {
    socket.emit("connection request", roomName);
  }

  function disconnect() {
    if (socket.id) {
      socket.disconnect();
      delete peerConnections.current[socket.id];
      while (videoContainerRef.current?.firstChild) {
        videoContainerRef.current?.removeChild(videoContainerRef.current?.firstChild);
      }
      console.log("disconnected room");
    }
  }

  return (
    <main>
      <h1>オンライン自習室</h1>
      <br />
      <button type="button" onClick={() => startVideo(myVideoRef.current)}>
        ビデオ起動
      </button>
      &nbsp;
      <button type="button" onClick={() => connect()}>
        Connect
      </button>
      <button type="button" onClick={() => disconnect()}>
        退室
      </button>
      <div>
        <video
          id="local_video"
          ref={myVideoRef}
          autoPlay
          playsInline
          width={200}
          height={200}
        ></video>
      </div>
      <div id="container" ref={videoContainerRef}></div>
    </main>
  );
}
