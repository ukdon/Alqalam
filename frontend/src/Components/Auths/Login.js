import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import styled from 'styled-components'

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
       setInputs(prev => ({
           ...prev,
           [e.target.name]: e.target.value,
       }));
    };
    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/v1/login', {
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleSubmit = (e) => {
       e.preventDefault();
       console.log(inputs);
       // send http request
       sendRequest()
       .then(() => dispatch(authActions.login()))
       .then(() => history("/{displayData()}"));
    };

  return (
    <LoginPageContainer >
      <form  onSubmit={handleSubmit}>
          <Box marginLeft="auto" 
               marginRight="auto" 
               width={500} 
               display="flex" 
               flexDirection={'column'}
               justifyContent="center"
               alignItems="center"
               >
              <Typography color="green" variant="h2">Login</Typography>

              <TextField name="email"
              onChange={handleChange} 
              type={"email"} 
              value={inputs.email} 
              variant="outlined" 
              placeholder="Email" 
              margin="normal"/>

              <TextField name="password"
              onChange={handleChange} 
              type="password" 
              value={inputs.password} 
              variant="outlined" 
              placeholder="Makullan Sirrinka" 
              margin="normal"/>

              <Button sx={{bgcolor: "green"}} variant="contained" type="submit">Login</Button>
          </Box>
      </form>
    </LoginPageContainer>
  )
}

const LoginPageContainer = styled.div`
  min-height: 100vh; /* Ensure full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Add any additional styling you need for the login page */
`;


export default Login
