import { useState, useEffect } from "react";
import "./tableau.css"


function Tableau(props) {

  const [localData, setLocalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageButton, setPageButton] = useState([]);
  const [currentSort, setCurrentSort] = useState();
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setLocalData([...props.data]); //copy data to manipulate
    setHeaders([...Object.keys(props.data[0])]) // extract fields name from data
  }, []);

  //sorting by clicking on a column head 
  function sorting(property) {

     let sortData = [...localData];
    if (property === currentSort) {
      sortData.reverse();
    }
    else {
      sortData.sort((a, b) =>
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      ); 
    }
    setCurrentSort(property);
    setLocalData([...sortData]);
  }


  //Changing to next page
  function pageNext() {
    if (currentPage === Math.ceil(localData.length / pageSize)) {
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
      setLocalData(props.data);
      return;
    }
    let result = localData.filter((item) => {
      let match = false;
      for (let i = 0; i < headers.length; i++) {
        //item[headers[i]] ---> item["firstname"]
        if (item[headers[i]].toLowerCase().includes(input.toLowerCase())) {  
          match = true;
        }
      }
      return match;
    });
    setLocalData([...result]);
    setCurrentPage(1)
  }
 
  //Generating table pages buttons
  useEffect(() => {
    let buttons = [];
    for (let i = 1; i < Math.ceil(localData.length / pageSize) + 1; i++) {
      buttons.push(
        <button className='tableButton' onClick={() => pageSet(i)}>
          {i}
        </button>
      );
    }
    setPageButton([...buttons])
  },[pageSize,localData])


  return (
    <>
      <div className='filters'>
        <div>
          <label for="selectLineNumber">Show</label>
          <select
            className='tableSelect'
            id="selectLineNumber"
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
          <label for="searchField">Search:</label>
          <input
            className='tableInput'
            type='text'
            id="searchField"
            onChange={(e) => search(e.target.value)}></input>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((head => <th key={head}onClick={() => sorting(head)}>{head}</th>))}
          </tr>
        </thead>
        <tbody>
          {localData
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item) => {
              let row = [];
              for (let i = 0; i < headers.length; i++) {
                row.push(<td key={item[headers[i]]}>{item[headers[i]]}</td>);
              }
              return (
                <tr>
                  {row}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='tableFoot'>
        <p>
          Showing {currentPage * pageSize - (pageSize - 1)} to{" "}
          {currentPage * pageSize} of {localData.length} entries
        </p>
        <div className='tableNav'>
          <button className='tableButton' onClick={pagePrevious}>
            Previous
          </button>
          {pageButton}
          <button className='tableButton' onClick={pageNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Tableau;
