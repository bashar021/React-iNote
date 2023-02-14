import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserData from './context/user_data/User_data';
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <UserData>
    <App />
    </UserData>
    </CookiesProvider>
  </React.StrictMode>
);
