import React, { useState, useEffect } from "react";
import { Button, Form,Alert,Spinner } from "react-bootstrap";
import "../../styles/register.css";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveTodo } from "../../store/reducers";

function Edit() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color,setColor] = useState('success');

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)

    axios
      .get(
        `https://peaceful-citadel-71310.herokuapp.com/todo/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
      .then(({data}) => {
        setTitle(data.data.title)
        setDesc(data.data.description)
        setDueDate(new Date(data.data.due_date).toISOString().substring(0,10)) 
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setColor("danger");
      })
      .finally(() =>{
        setIsLoading(false)
      })
  },[]) 

  function updateTodo() {
    setIsLoading(true)

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
      .then(({data}) => {
        // setTitle(data.data.title)
        // setDesc(data.data.description)
        // setDueDate(new Date(data.data.due_date).toISOString().substring(0,10)) 
        dispatch(saveTodo(data.data))
        setMessage(data.message);
        setColor("success");

        setTimeout(() => {
            navigate("/")
        },2000)
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setColor("danger");
      })
      .finally(() =>{
        setIsLoading(false)
      });
  }
    
  if (isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  


  return (
    <>        
    {message && <Alert  variant={color}>
        {message}
    </Alert>}
    <div className="border rounded border-primary register-todo">
      <h3 className="text-center">Edit Todo</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} type="text" placeholder="Title" onChange={(e) => {
              setTitle(e.target.value)
          }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control value={desc} type="text" placeholder="Description" onChange={(e) => {
              setDesc(e.target.value)
          }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control value={dueDate} type="date" placeholder="Due Date" onChange={(e) => {
              setDueDate(e.target.value)
          }} />
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" onClick={() => {
          updateTodo()
          navigate("/")
        }}>
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
}

export default Edit;
