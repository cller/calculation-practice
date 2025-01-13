import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import PracticePaper from './PracticePaper';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <PracticePaper />
  </StrictMode>,
)
