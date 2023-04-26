import { Route, Routes } from "react-router-dom";
import SearchResult from "./SearchResult";
import Merkuze from "./Mrkuz";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Merkuze />} />
      <Route path="/search" element={<SearchResult />} />
  </Routes>
  );
}

export default App;
