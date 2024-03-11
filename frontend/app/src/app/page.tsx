import Sidebar from "./components/Sidebar";
import RoomSelect from "./components/RoomSelect";

export default function Home() {
  return (
    <main className="main">
      <Sidebar />
      <RoomSelect />
    </main>
  );
}
