import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {Route, Routes} from "react-router";
import DetailPage from "./DetailPage";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<App></App>}></Route>
          <Route path='/beer/'>
              <Route path=':id' element={<DetailPage></DetailPage>}></Route>
          </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);