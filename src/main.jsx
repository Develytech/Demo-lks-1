import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<App />} />
          <Route path="/kontakt" element={<App />} />
          <Route path="/projekt/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)

