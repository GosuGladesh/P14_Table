import { useState, useEffect } from "react";
import "./tableau.css"


function Tableau(props) {

  const [localEmployee, setLocalEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageButton, setPageButton] = useState([]);
  const [currentSort, setCurrentSort] = useState();
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setLocalEmployee([...props.employees]); //copy data to manipulate
    setHeaders([...Object.keys(props.employees[0])]) // extract fields name from data
  }, []);

  //sorting by clicking on a column head 
  function sorting(property) {

     let sortEmployee = [...localEmployee];
    if (property === currentSort) {
      sortEmployee.reverse();
    }
    else {
      sortEmployee.sort((a, b) =>
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      ); 
    }
    setCurrentSort(property);
    setLocalEmployee([...sortEmployee]);
  }


  //Changing to next page
  function pageNext() {
    if (currentPage === Math.ceil(localEmployee.length / pageSize)) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }
  //Changing to previous page
  function pagePrevious() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }
  //Changing to specified page
  function pageSet(page) {
    setCurrentPage(page);
  }

  function search(input) {
    if (input === "") {
      setLocalEmployee(props.employees);
      return;
    }
    let result = localEmployee.filter((employee) => {
      let match = false;
      for (let i = 0; i < headers.length; i++) {
        //employee[headers[i]] ---> employee["firstname"]
        if (employee[headers[i]].toLowerCase().includes(input.toLowerCase())) {  
          match = true;
        }
      }
      return match;
    });
    setLocalEmployee([...result]);
  }
 
  //Generating table pages buttons
  useEffect(() => {
    let buttons = [];
    for (let i = 1; i < Math.ceil(localEmployee.length / pageSize) + 1; i++) {
      buttons.push(
        <button class='tableButton' onClick={() => pageSet(i)}>
          {i}
        </button>
      );
    }
    setPageButton([...buttons])
  },[pageSize,localEmployee])


  return (
    <>
      <div class='filters'>
        <div>
          <p>Show</p>
          <select
            class='tableSelect'
            onChange={(e) => {
              setPageSize(e.target.value);
              pageSet(1);
            }}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <p>entries</p>
        </div>
        <div>
          <p>Search:</p>
          <input
            class='tableInput'
            type='text'
            onChange={(e) => search(e.target.value)}></input>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {headers.map( (head => <th onClick={() => sorting(head)}>{head}</th>))}
          </tr>
        </thead>
        <tbody>
          {localEmployee
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((employee) => {
              let row = [];
              for (let i = 0; i < headers.length; i++) {
                row.push(<td>{employee[headers[i]]}</td>);
              }
              return (
                <tr>
                  {row}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div class='tableFoot'>
        <p>
          Showing {currentPage * pageSize - (pageSize - 1)} to{" "}
          {currentPage * pageSize} of {localEmployee.length} entries
        </p>
        <div class='tableNav'>
          <button class='tableButton' onClick={pagePrevious}>
            Previous
          </button>
          {pageButton}
          <button class='tableButton' onClick={pageNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Tableau;
