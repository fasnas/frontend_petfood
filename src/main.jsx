import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Context from './Components/User/Context/Context.jsx';
import AdminContext from './Components/Admin/AdminContext/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <AdminContext>
        <App />
      </AdminContext>
    </Context>
  </StrictMode>
)
