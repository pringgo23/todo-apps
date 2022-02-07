import React from "react";
import { Button, Form } from "react-bootstrap";
import "../../styles/register.css";

function Create() {
  return (
    <div className="border rounded border-primary register-todo">
      <h3 className="text-center">Create Todo</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" placeholder="Due Date" />
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Create;
