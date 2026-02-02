import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Services from "./Services"
import ServiceResults from "./ServiceResults";
import AddService from "./AddService";
import "./App.css";
// import Edit from "./Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/category/:type" element={<ServiceResults />} />
        <Route path="/add" element={<AddService />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

