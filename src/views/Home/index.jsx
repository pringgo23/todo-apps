import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Button, Dropdown, ButtonGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
    } else {
      setLoading(true);

      axios
        .get("https://peaceful-citadel-71310.herokuapp.com/todo", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          setTodos(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  return (
    <div className="p-5">
      <div>
        <h2 className="text-center">Todos</h2>
      </div>

      <div className="mt-5 margin-x-10vw">
        <div className="border rounded">
          <div className="row todo-header">
            <div className="col-4">
              <h5>
                <b>Todo</b>
              </h5>
            </div>
            <div className="col-3 div-center">
              <h5>
                <b>Due Date</b>
              </h5>
            </div>
            <div className="col-2 div-center">
              <h5>
                <b>Status</b>
              </h5>
            </div>
            <div className="col-2 div-center">
              <h5>
                <b>Action</b>
              </h5>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="mt-3">
            {todos.map((el, i) => (
              <div className="row todo-item" key={i}>
                <div className="col-4">
                  {el.status ? (
                    <h6>
                      <s>{el.title}</s>
                    </h6>
                  ) : (
                    <h6>{el.title}</h6>
                  )}

                  <small className="m-0">Desc:</small>
                  {el.status ? (
                    <p>
                      <s>{el.description}</s>
                    </p>
                  ) : (
                    <p>{el.description}</p>
                  )}
                </div>
                <div className="col-3 div-center">
                  <p>{moment(el.due_date).format("DD MMMM YYYY")}</p>
                </div>
                <div className="col-2 div-center">
                  <p>{el.status ? "Completed" : "Uncompleted"}</p>
                </div>
                <div className="col-2 div-center">
                  {el.status ? (
                    <Button className="btn-pill" variant="primary">
                      Undone
                    </Button>
                  ) : (
                    <Button className="btn-pill" variant="success">
                      Done
                    </Button>
                  )}
                </div>
                <div className="col-1">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      className="dropdown-todo"
                    />
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
