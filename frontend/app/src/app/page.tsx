import Sidebar from "./components/Sidebar";
import RoomSelect from "./components/RoomSelect";
import ResultModal from "./components/ResultModal";

export default function Home() {
  return (
    <main className="main">
      <Sidebar />
      <RoomSelect />
      <ResultModal />
    </main>
  );
}
