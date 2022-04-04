import React from 'react';
import ReactDOM from 'react-dom';
import dataStub from "./data.json";
import Tableau from './lib/components/Tableau';


ReactDOM.render(
  <React.StrictMode>
    <Tableau data={dataStub}/>
  </React.StrictMode>,
  document.getElementById('root')
);
