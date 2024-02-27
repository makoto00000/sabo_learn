import RoomSelect from "./components/RoomSelect";
import Sidebar from "./components/Sidebar";
import Video from "./components/VIdeo";

export default function Home() {
  

  return (
    <main className="main">
      <Sidebar />
      <RoomSelect />
      {/* <Video /> */}
    </main>
  );
}
