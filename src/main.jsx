import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Weekly from './Weekly.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/week" element={<Weekly />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
