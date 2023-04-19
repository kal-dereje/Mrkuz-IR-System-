import { Route, Routes } from "react-router-dom";
import Merkuze from "./Merkuze";
import SearchResult from "./SerachResult";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Merkuze />} />
      <Route path="/search" element={<SearchResult />} />
  </Routes>
  );
}

export default App;
