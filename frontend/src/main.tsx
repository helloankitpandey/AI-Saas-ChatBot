import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

import { Toaster } from 'react-hot-toast';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;


// lets create new theme for the material-  ui
const theme = createTheme({  
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  }, 
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" /> 
        <App />
      </ThemeProvider>
    </BrowserRouter> 
    </AuthProvider>
  </StrictMode>,
)
