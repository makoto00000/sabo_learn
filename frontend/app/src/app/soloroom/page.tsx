'use client'

import SoloRoom from "@/app/components/SoloRoom";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

export default function Room() {
  return (
    <main className="main">
      {/* <Suspense fallback={<Loading />}> */}
        <SoloRoom />
      {/* </Suspense> */}
    </main>
  );
}
