// "use client";

import SoloRoom from "@/app/features/room/components/SoloRoom";
import { getCurrentUser } from "../utils/UserAPI";

export default async function Room() {
  const currentUser = await getCurrentUser();

  return (
    <main className="main">
      {/* <Suspense fallback={<Loading />}> */}
      {currentUser && <SoloRoom currentUser={currentUser} />}
      {/* </Suspense> */}
    </main>
  );
}
