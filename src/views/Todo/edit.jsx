import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "../../styles/register.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [title, setTitle] = useState("test");
  const [desc, setDesc] = useState("kita coba test");
  const [dueDate, setDueDate] = useState(new Date());

  const params = useParams();

  function updateTodo() {
    axios
      .put(
        `https://peaceful-citadel-71310.herokuapp.com/todo/${params.id}`,
        {
          title,
          description: desc,
          due_date: dueDate,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {});
  }

  function deleteTodo() {
    axios
      .delete(
        `https://peaceful-citadel-71310.herokuapp.com/todo/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {});
  }

  return (
    <div className="border rounded border-primary register-todo">
      <h3 className="text-center">Edit Todo</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} type="text" placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control value={desc} type="text" placeholder="Description" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control value={dueDate} type="date" placeholder="Due Date" />
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
