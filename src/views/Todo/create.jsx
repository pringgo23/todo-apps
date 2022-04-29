import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from "react-bootstrap";
import "../../styles/register.css";
import axios from "axios";

function Create() {
    
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [dueDate, setDueDate] = useState();
    const [message, setMessage] = useState(null);
    const [color,setColor] = useState('success');
    const [isLoading,setIsLoading] = useState(false);


    

    const navigate = useNavigate();

  const createTodo = () =>{
     const body = {
       title,
       description,
       due_date :dueDate

      }

      setIsLoading(true)
      
      axios.post('https://peaceful-citadel-71310.herokuapp.com/todo',body, 
          {
              headers: {
                token: localStorage.getItem('token'),
              },
          })
          .then(({data}) => {
            setMessage(data.message);
            setColor("success");

            setTimeout(() => {
              navigate("/");
            },2000)
          })
          .catch(err =>{
            setMessage(err.response.data.message);
            setColor("danger");
          })
          .finally(()=>{
            setIsLoading(false);
          })
    }


  return (
    <>
    {message && <Alert  variant={color}>{message}</Alert>}
    <div className="border rounded border-primary register-todo">
      <h3 className="text-center">Create Todo</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" value = {title} onChange = {(e) => {
            setTitle(e.target.value)
          }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" value = {description} onChange = {(e) => {
            setDescription(e.target.value)
          }}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" placeholder="Due Date" value = {dueDate} onChange = {(e) => {
            setDueDate(e.target.value)
          }}/>
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" onClick={ () => {
          // dispatch(addTodo({
          //   title,
          //   description,
          //   due_date : dueDate
          // })); 
          createTodo()
          navigate("/")
          }}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
    </>
  );
}

export default Create;
