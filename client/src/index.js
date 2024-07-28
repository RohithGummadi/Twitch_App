import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App.js';
import { App } from './App.js';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authpage from './AuthPage/Authpage.js';
import DashboardPage from './DashboardPage/DashboardPage.js';

const router = createBrowserRouter([
  {path:'/auth', element: <Authpage/>},
  {path:"/", element: <DashboardPage/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router}/>
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
