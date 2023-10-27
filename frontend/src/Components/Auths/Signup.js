import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        userName: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
       setInputs(prev => ({
           ...prev,
           [e.target.name]: e.target.value,
       }));
    };
    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/v1/signup', {
            name: inputs.name,
            userName: inputs.userName,
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
       sendRequest().then(() => history("/login"));
    };
  return (
    <RegisterPageContainer>
      <form onSubmit={handleSubmit}>
          <Box marginLeft="auto" 
               marginRight="auto" 
               width={500} 
               display="flex" 
               flexDirection={'column'}
               justifyContent="center"
               alignItems="center"
               >
              <Typography color="green" variant="h2">SignUp</Typography>

              <TextField name="name"
              onChange={handleChange} 
              value={inputs.name} 
              variant="outlined" 
              placeholder="Rubuta Sunana Ka" 
              margin="normal" />

              <TextField name="email"
              onChange={handleChange} 
              type={"email"} 
              value={inputs.email} 
              variant="outlined" 
              placeholder="Email" 
              margin="normal"/>

              <TextField name="userName"
              onChange={handleChange} 
              value={inputs.userName} 
              variant="outlined" 
              placeholder="Sunan Da Kafi So" 
              margin="normal"/>

              <TextField name="password"
              onChange={handleChange} 
              type="password" 
              value={inputs.password} 
              variant="outlined" 
              placeholder="Makullan Sirrinka" 
              margin="normal"/>

              <Button sx={{bgcolor: "green"}} variant="contained" type="submit">SignUp</Button>
          </Box>
      </form>
    </RegisterPageContainer>
  )
}

const RegisterPageContainer = styled.div`
  min-height: 100vh; /* Ensure full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Add any additional styling you need for the registration page */
`;

export default Signup
