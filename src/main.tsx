import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout';
import PatientLayout from './PatientLayout';
import ClinicianLayout from './ClinicianLayout';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <PatientLayout />
    </ThemeProvider>
  </StrictMode>,
)
