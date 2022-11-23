import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableViewMyOrders from './MyOrders/TableViewMyOrders';
import Layout from './MainView/Layout';
import AddEditOrderView from './Add-Edit-Order/AddEditOrderView';
const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<TableViewMyOrders />} />
          <Route path="/add-order/:id" element={<AddEditOrderView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <App/>                              
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
