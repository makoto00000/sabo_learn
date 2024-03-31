
import MultiRoom from "@/app/components/MultiRoom";
import { getCurrentUser } from "@/app/utils/UserAPI";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

export default async function Room() {
  const currentUser = await getCurrentUser();
  let userName = "";
  if (currentUser !== null) {
    userName = currentUser.name as string;
  }
  
  return (
    <main className="main">
      {/* <Suspense fallback={<Loading />}> */}
        <MultiRoom userName={userName}/>
      {/* </Suspense> */}
    </main>
  );
}
