"use client";
import { prepare, connect } from "@/app/main";
import { useRef } from "react";

export default function Home() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const otherVideoRef = useRef<HTMLVideoElement>(null);
  const sendSdpRef = useRef<HTMLTextAreaElement>(null);
  const recvSdpRef = useRef<HTMLTextAreaElement>(null);

  return (
    <main>
      <div>
        <video
          id="local_video"
          ref={myVideoRef}
          autoPlay
          playsInline
          width={200}
          height={200}
        ></video>
        <video
          id="remote_video"
          ref={otherVideoRef}
          autoPlay
          playsInline
          width={200}
          height={200}
        ></video>
      </div>
      <div>
        <textarea
          id="text_for_send_sdp"
          ref={sendSdpRef}
          rows={5}
          cols={43}
        ></textarea>
        <textarea
          id="text_for_recv_sdp"
          ref={recvSdpRef}
          rows={5}
          cols={43}
        ></textarea>
      </div>
      <div>
        <button
          onClick={() =>
            prepare(myVideoRef.current, otherVideoRef.current, sendSdpRef.current, recvSdpRef.current)
          }
        >
          Prepare
        </button>
        <button onClick={() => connect(sendSdpRef.current)}>Connect</button>
      </div>
    </main>
  );
}
