import React, {useState} from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";


function Register() {
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [color,setColor] = useState('success');

    const navigate =useNavigate();

    const handleSubmit = () => {

        const body = {
          username,
          email,
          password
        }

        setIsLoading(true)

        axios.post('https://peaceful-citadel-71310.herokuapp.com/signup',body)
        .then(({data}) => {
          setMessage(data.message);
          setColor("success");

          navigate("/login");
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
        {message && <Alert  variant={color}>
          {message}
        </Alert>}
        <div className="border rounded border-primary register-todo">
          <h3 className="text-center">Register Todo App</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value= {username} onChange ={(e) => {
                setUsername(e.target.value)
              }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" value= {email} onChange ={(e) => {
                setEmail(e.target.value)
              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value= {password} onChange ={(e) => {
                setPassword(e.target.value)
              }}/>
            </Form.Group>

            <Button className="w-100" variant="primary" onClick= {() => handleSubmit()}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        </div>
    </>
  );
}

export default Register;
