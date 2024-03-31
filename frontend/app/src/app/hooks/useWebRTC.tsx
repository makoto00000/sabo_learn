import {
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import React from "react";
import { createRoot } from "react-dom/client";
import ConnectVideo from "../components/ConnectVideo";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`);

export function useWebRTC({
  canvasRef,
  handleIsConnecting,
  isStudying,
  userName,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  handleIsConnecting: (isConnecting: boolean) => void;
  isStudying: boolean;
  userName: string;
}) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const peerConnections = useRef<{
    [socketId: string]: {
      peerConnection: RTCPeerConnection;
      videoFrameRef: RefObject<HTMLDivElement>;
      statusRef: RefObject<HTMLDivElement>;
    };
  }>({});

  const [isConnecting, setIsConnecting] = useState<boolean>(true);

  useEffect(() => {
    handleIsConnecting(true);
  }, []);

  useEffect(() => {
    console.log(`isConnecting: ${isConnecting}`);
  }, [isConnecting])

  useEffect(() => {
    if (!isConnecting) {
      socket.emit("isStudying", isStudying);
    }
  }, [isStudying])

  socket.on("isStudying", (isStudying: boolean, socketId: string) => {
    if (!isConnecting) {
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
    }
  });

  

  // websocketに繋がったとき
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
        handleIsConnecting(false);
        setIsConnecting(false);
      } else {
        if (socket.id !== socketId) {
          handleIsConnecting(true);
          setIsConnecting(true)
        }
      }
    }
  );

  // offerするように依頼がきたとき
  socket.on("send offers", (socketIds: string[], userNames: {[socketId: string]: string}) => {

    // 部屋にいる人数分peerconnectionを作成して全員にoffer
    socketIds.forEach(async (socketId: string) => {
      if (socketId === socket.id) return;
      const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      peerConnections.current[socketId] = {
        peerConnection: new RTCPeerConnection(config),
        videoFrameRef: React.createRef<HTMLDivElement>(),
        statusRef: React.createRef<HTMLParagraphElement>(),
      };

      // ontrack
      peerConnections.current[socketId].peerConnection.ontrack = (
        e: RTCTrackEvent
      ) => {
        let stream = e.streams[0];
        if (document.getElementById(socketId) === null) {
          const container = document.createElement("div");
          container.id = socketId;
          if (videoContainerRef.current) {
            createRoot(videoContainerRef.current.appendChild(container)).render(
              <ConnectVideo
                socketId={socketId}
                stream={stream}
                videoFrameRef={peerConnections.current[socketId].videoFrameRef}
                statusRef={peerConnections.current[socketId].statusRef}
                userName={userNames[socketId]}
              />
            );
          }
        }
      };

      if (canvasRef.current) {
        const stream = canvasRef.current.captureStream();
        stream.getTracks().forEach((track) => {
          peerConnections.current[socketId].peerConnection.addTrack(
            track,
            stream
          );
        });
      }

      try {
        const offer = await peerConnections.current[
          socketId
        ].peerConnection.createOffer();
        const pc = peerConnections.current[socketId].peerConnection;
        if (pc.localDescription === null) {
          await peerConnections.current[
            socketId
          ].peerConnection.setLocalDescription(offer);
        }

        socket.emit("offer", offer, socketId, userName);
        console.log("send offer to " + socketId);
      } catch (error) {
        console.error(error);
      }
    });
    // }
  });

  // offerが来たとき
  socket.on(
    "offer",
    async (offer: RTCSessionDescriptionInit, socketId: string, userName: string) => {
      // if (isConnecting) {
      const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

      console.log("offer from " + socketId);

      peerConnections.current[socketId] = {
        peerConnection: new RTCPeerConnection(config),
        videoFrameRef: React.createRef<HTMLDivElement>(),
        statusRef: React.createRef<HTMLParagraphElement>(),
      };

      const pc = peerConnections.current[socketId].peerConnection;

      // ontrack
      pc.ontrack = (e: RTCTrackEvent) => {
        let stream = e.streams[0];
        if (document.getElementById(socketId) === null) {
          const container = document.createElement("div");
          container.id = socketId;
          if (videoContainerRef.current) {
            createRoot(
              videoContainerRef.current!.appendChild(container)
            ).render(
              <ConnectVideo
                socketId={socketId}
                stream={stream}
                videoFrameRef={peerConnections.current[socketId].videoFrameRef}
                statusRef={peerConnections.current[socketId].statusRef}
                userName={userName}
              />
            );
          }
        }
      };

      pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
        if (e.candidate) {
          socket.emit("candidate", e.candidate, socketId);
        }
      };
      if (canvasRef.current) {
        const stream = canvasRef.current.captureStream();
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          pc.addTrack(track, stream);
        });
      }

      try {
        if (pc.remoteDescription === null) {
          await pc.setRemoteDescription(offer);
          if (pc.localDescription === null) {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log("send answer to " + socketId);
            socket.emit("answer", answer, socketId);
            if(isConnecting) {
              handleIsConnecting(false);
            setIsConnecting(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
      // }
    }
  );

  // answerが来たとき
  socket.on(
    "answer",
    async (answer: RTCSessionDescriptionInit, socketId: string) => {
      const pc = peerConnections.current[socketId].peerConnection;
      if (pc.remoteDescription === null && pc.localDescription !== null) {
          try {
            await peerConnections.current[
              socketId
            ].peerConnection.setRemoteDescription(answer);

            console.log("answer from " + socketId);
    
            pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
              if (e.candidate) {
                socket.emit("candidate", e.candidate, socketId);
              }
            };
            
          } catch (error) {
            console.error(error)
            
          }
      }
    }
  );

  // candidateが来たとき
  socket.on("candidate", (candidate: RTCIceCandidateInit, socketId: string) => {

      const pc = peerConnections.current[socketId].peerConnection;
      if (pc.connectionState !== "connected") {
      const iceCandidate = new RTCIceCandidate(candidate);
      pc.addIceCandidate(iceCandidate);
      console.log("set candidate to id = " + socketId);
      if (isConnecting) {
        handleIsConnecting(false);
        setIsConnecting(false);
      }
    }
  });

  // ユーザーが退室したとき
  socket.on("user disconnected", (socketId) => {
    console.log("====user disconnected==== id:", socketId);
    if (peerConnections.current[socketId]) {
      delete peerConnections.current[socketId];

      const elementToRemove = document.getElementById(socketId);
      if (elementToRemove) {
        elementToRemove.remove();
      }
    }
  });

  // ---------------------- onClick -----------------------

  function connect() {
    socket.emit("connection request");
  }

  function isConnected() {
    let isCompleted = true;
    Object.keys(peerConnections.current).forEach((socketId) => {
      if (
        peerConnections.current[socketId].peerConnection.connectionState !==
        "connected"
      ) {
        isCompleted = false;
      }
    });
    return isCompleted;
  }

  // function disconnect() {
  //   if (socket.id) {
  //     socket.disconnect();
  //     delete peerConnections.current[socket.id];
  //     while (videoContainerRef.current?.firstChild) {
  //       videoContainerRef.current?.removeChild(
  //         videoContainerRef.current?.firstChild
  //       );
  //     }
  //     console.log("disconnected room");
  //   }
  // }
  const result = useMemo(() => {
    return {
      videoContainerRef,
      connect,
    };
  }, []);
  return result;
}
