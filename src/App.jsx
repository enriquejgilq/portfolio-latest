import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage/SearchPage.jsx";
import { PageDetails } from "./pages/PageDetails/PageDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details" element={<PageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
