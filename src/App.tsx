import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import Credential from "./pages/Credential";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/credential" element={<Credential />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
