import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AnimatedGradientBackground from "./components/AnimatedGradientBackground.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimatedGradientBackground />
    <App />
  </StrictMode>,
)
