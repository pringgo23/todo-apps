import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Register from "./views/User/register";
import Login from "./views/User/login";
import NavbarComponent from "./Components/navbar";
import Create from "./views/Todo/create";
import Edit from "./views/Todo/edit";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
