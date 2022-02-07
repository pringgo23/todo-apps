import React from "react";
import { Button } from "react-bootstrap";
import "../styles/navbar.css";

function NavbarComponent() {
  return (
    <div className="d-flex justify-content-between p-2 px-5 border-bottom">
      <div></div>
      <div>
        <h1 className="logo">Todo App</h1>
      </div>
      <div className="d-flex align-items-center">
        <Button variant="primary">Logout</Button>
      </div>
    </div>
  );
}

export default NavbarComponent;
