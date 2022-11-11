import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/home";
import SearchResult from "./pages/searchResult/searchResult";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchResult" element={<SearchResult />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
