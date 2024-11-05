import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomizexInput from '../components/shared/CustomizexInput'
import { IoIosLogIn } from 'react-icons/io'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const auth = useAuth();
  
  // create a function to handle the data  => i.e email and password and this will go to backend and store in database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // console.log(email, password);
    
    // now make api request to the backend i.e => axios
    // do this in main.tsx file & then make file for axios seperatly

    // here Toast used =?????
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", {id: "login" }); 
    }    
  }

  // when user refresh it come to chats page after login
  useEffect(() => {
    if(auth?.user){
      return navigate("/chat");
    }
  }, [auth]);


  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      {/* this box is for image */}
      <Box padding={8} mt={8} display={{md: "flex", sm: "none", xs: "none"}}>
        <img src='airobot.png' alt='Robot' style={{ width: "400px" }} />
      </Box>
      {/* this box is for form i.e- Login */}
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5}}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onClick={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none", 
          }}
        >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography 
              variant='h4'
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizexInput type='email' name='email' label='Email' />
            <CustomizexInput type='password' name='password' label='Password' /> 
            <Button
              type='submit'
              sx={{
                px: 2,
                py:1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon = { <IoIosLogIn />  }
            >
              Login
            </Button>
          </Box>

        </form>
      </Box> 
    </Box>
  )
}

export default Login