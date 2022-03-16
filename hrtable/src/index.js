import React from 'react';
import ReactDOM from 'react-dom';
import data from "./data.json";
import Tableau from './lib/components/Tableau';


ReactDOM.render(
  <React.StrictMode>
    <Tableau headers={["firstName", "lastName", "dateOfBirth", "department", "startDate", "street", "city", "state", "zipCode"]} employees={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);
