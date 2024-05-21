import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import io from "socket.io-client";
import React from "react";
import { createRoot } from "react-dom/client";
import ConnectVideo from "../components/ConnectVideo";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`);
let isConnectRequested = false;

export function useWebRTC({
  canvasRef,
  // handleIsConnecting,
  userName,
  enterRoomSoundRef,
  exitRoomSoundRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  // handleIsConnecting: (isConnecting: boolean) => void;
  userName: string;
  enterRoomSoundRef: RefObject<HTMLAudioElement>;
  exitRoomSoundRef: RefObject<HTMLAudioElement>;
}) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const peerConnections = useRef<{
    [socketId: string]: {
      peerConnection: RTCPeerConnection;
      videoFrameRef: RefObject<HTMLDivElement>;
      statusRef: RefObject<HTMLDivElement>;
      userName: string;
      connectionCounter: number;
      iceCandidateQueue: RTCIceCandidateInit[];
    };
  }>({});

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
      peerConnections.current = {};
      isConnectRequested = false;
    };
  }, []);

  const configPeerConnection = (
    socketId: string,
    userName: string,
    isOffer: boolean
  ) => {
    const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    peerConnections.current[socketId] = {
      peerConnection: new RTCPeerConnection(config),
      videoFrameRef: React.createRef<HTMLDivElement>(),
      statusRef: React.createRef<HTMLParagraphElement>(),
      userName: userName,
      connectionCounter: 0,
      iceCandidateQueue: [],
    };

    const pcRef = peerConnections.current[socketId];
    const pc = pcRef.peerConnection;
    console.log(peerConnections.current);

    pc.ontrack = (e: RTCTrackEvent) => {
      let stream = e.streams[0];
      if (document.getElementById(socketId) === null) {
        const container = document.createElement("div");
        container.id = socketId;
        if (videoContainerRef.current) {
          createRoot(videoContainerRef.current.appendChild(container)).render(
            <ConnectVideo
              socketId={socketId}
              stream={stream}
              videoFrameRef={pcRef.videoFrameRef}
              statusRef={pcRef.statusRef}
              userName={userName}
            />
          );
          if (enterRoomSoundRef.current) {
            enterRoomSoundRef.current.play();
          }
        }
      }
    };

    pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
      if (e.candidate) {
        socket.emit("candidate", e.candidate, socketId);
      }
    };

    pc.oniceconnectionstatechange = function () {
      if (
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "disconnected"
      ) {
        console.log("接続に失敗しました。");
        if (isOffer && pcRef.connectionCounter < 3) {
          pcRef.connectionCounter += 1;
          socket.disconnect();
          isConnectRequested = false;
          if (peerConnections.current[socketId]) {
            delete peerConnections.current[socketId];
            const elementToRemove = document.getElementById(socketId);
            if (elementToRemove) {
              elementToRemove.remove();
              if (exitRoomSoundRef.current) {
                exitRoomSoundRef.current.play();
              }
            }
          }

          socket.connect();
          connect();
          console.log("再接続を開始します");
        } else if (isOffer && pcRef.connectionCounter >= 3) {
          socket.disconnect();
          console.log("現在のネットワークでは接続できません");
        }
      } else if (pc.iceConnectionState === "completed") {
        console.log("接続しました。");
        pcRef.connectionCounter = 0;
      }
      console.log(pc.iceConnectionState);
    };

    if (canvasRef.current) {
      const stream = canvasRef.current.captureStream();
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        pc.addTrack(track, stream);
      });
    }
  };

  socket.on("isStudying", (isStudying: boolean, socketId: string) => {
    if (peerConnections.current[socketId]) {
      const videoFrameRef = peerConnections.current[socketId].videoFrameRef;
      const statusRef = peerConnections.current[socketId].statusRef;
      if (videoFrameRef.current && statusRef.current) {
        if (isStudying) {
          statusRef.current.innerText = "Studying";
          statusRef.current.style.color = "#00F143";
          videoFrameRef.current.style.border = "6px solid #00F143";
        } else {
          statusRef.current.innerText = "Sabo?";
          statusRef.current.style.color = "#D00000";
          videoFrameRef.current.style.border = "6px solid #D00000";
        }
      }
    }
  });

  // websocketに繋がったとき(answer側に接続準備してもらう)
  socket.on("connect", () => {
    console.log(`${socket.id} connected`);
    socket.emit("notification entered room", userName);
  });

  // 誰かが入室してきたとき
  socket.on(
    "assign room",
    (socketId: string, connectRoomName: string, socketIds: string[]) => {
      console.log(`${socketId} entered ${connectRoomName}`);
      if (socketIds.length === 1) {
        // handleIsConnecting(false);
      }
    }
  );

  // answer側
  socket.on("request connection", (offerSocketId, offerUserName) => {
    if (socket.id === offerSocketId) return;
    // handleIsConnecting(true);
    console.log(`${offerSocketId}:${offerUserName} からリクエスト`);

    configPeerConnection(offerSocketId, offerUserName, false);

    socket.emit("allow connection", offerSocketId, userName);
  });

  // offer側
  socket.on(
    "send offer",
    async (answerSocketId: string, answerUserName: string) => {
      configPeerConnection(answerSocketId, answerUserName, true);

      const pcRef = peerConnections.current[answerSocketId];
      const pc = pcRef.peerConnection;

      try {
        if (pc.currentLocalDescription === null) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("offer", offer, answerSocketId);
          console.log("send offer to " + answerSocketId);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  // answer側 - offerが来たとき
  socket.on(
    "offer",
    async (offer: RTCSessionDescriptionInit, offerSocketId: string) => {
      console.log("offer from " + offerSocketId);

      const pcRef = peerConnections.current[offerSocketId]
      const pc = pcRef.peerConnection;

      try {
        if (pc.signalingState === "stable") {
          if (pc.remoteDescription === null) {
            await pc.setRemoteDescription(offer);
          }
        }
        let answer = null;
        if (answer === null && pc.signalingState === "have-remote-offer") {
          answer = await pc.createAnswer();
        }
        if (answer !== null) {
          await pc.setLocalDescription(answer);
          console.log("send answer to " + offerSocketId);
          socket.emit("answer", answer, offerSocketId);
          for (const candidate of pcRef.iceCandidateQueue) {
            await pc.addIceCandidate(candidate);
          }
          pcRef.iceCandidateQueue = [];
        }
      } catch (error) {
        console.error(error);
      }
      // }
    }
  );

  // offer側 - answerが来たとき
  socket.on(
    "answer",
    async (answer: RTCSessionDescriptionInit, offerSocketId: string) => {
      const pcRef = peerConnections.current[offerSocketId];
      const pc = pcRef.peerConnection;
      const socketIds = Object.keys(pcRef);
      try {
        await pc.setRemoteDescription(answer);
        console.log("answer from " + offerSocketId);
        socket.emit("getRoomSize", (roomSize: number) => {
          if (roomSize - socketIds.length === 1) {
            // handleIsConnecting(false);
          }
        });
        for (const candidate of pcRef.iceCandidateQueue) {
          await pc.addIceCandidate(candidate);
        }
        pcRef.iceCandidateQueue = [];
      } catch (error) {
        console.error(error);
      }
    }
  );

  // candidateが来たとき
  socket.on("candidate", async (candidate: RTCIceCandidateInit, socketId: string) => {
    const pcRef = peerConnections.current[socketId];
    const pc = pcRef.peerConnection;
    if (pc.remoteDescription && pc.remoteDescription.type) {
      await pc.addIceCandidate(candidate).catch(error => {
          console.error('Error adding received ICE candidate', error);
      });
  } else {
    pcRef.iceCandidateQueue.push(candidate);
  }
  });

  // ユーザーが退室したとき
  socket.on("user disconnected", (socketId: string) => {
    console.log("====user disconnected==== id:", socketId);
    if (peerConnections.current[socketId]) {
      delete peerConnections.current[socketId];
      const elementToRemove = document.getElementById(socketId);
      if (elementToRemove) {
        elementToRemove.remove();
        if (exitRoomSoundRef.current) {
          exitRoomSoundRef.current.play();
        }
      }
    }
  });

  const connect = useCallback(() => {
    if (!isConnectRequested) {
      socket.emit("getRoomSize", (roomSize: number) => {
        if (roomSize === 1) {
          return;
        } else {
          console.log("接続を開始します");
          // handleIsConnecting(true);
          socket.emit("request connection", socket.id, userName);
          isConnectRequested = true;
        }
      });
    }
  }, [userName]);

  const result = useMemo(() => {
    return {
      videoContainerRef,
      connect,
    };
  }, [connect]);
  return result;
}
