import { useEffect, useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import Pagination from '../components/Pagination';
import { fetchAPI, Protokolltabelle } from '../components/FetchAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

const Schadensfaelle = () => {
  const [data, setData] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleShowRef = useRef(rowNumber);

  useEffect(() => {
    fetchAPI('http://127.0.0.1:5000/schadensfaelle', setData);
  }, []);

  const handleRowChange = () => {
    const value = Number(handleShowRef.current.value);
    setRowNumber(value);
    setCurrentPage(1);
  };

  const displayedData = data.slice((currentPage - 1) * 10, currentPage * 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getTotalPages = () => {
    return Math.ceil(rowNumber / 10);
  };

  const downloadCSV = async () => {
    const csvContent = [
      ['Schadensnummer', 'Vertragsnummer', 'Datum', 'Schadenstyp', 'Schadenhoehe'],
      ...displayedData.map(item => [
        item.Schadensnummer,
        item.Vertragsnummer,
        item.Datum,
        item.Schadenstyp,
        item.Schadenhoehe
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `data_page_${currentPage}.csv`);

    // send data to databse
    await Protokolltabelle('schadensfaelle', (currentPage - 1) * 10 + 1, currentPage * 10);
  };

  return (
    <>
      <label htmlFor="rowNumber">Wählen Sie aus:</label>
      <select
        id="itemsToShow"
        ref={handleShowRef}
        onChange={handleRowChange}
        className="form-select w-auto d-inline-block"
      >
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      {rowNumber > 0 && (
        <>
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>Schadensnummer</th>
                <th>Vertragsnummer</th>
                <th>Datum</th>
                <th>Schadenstyp</th>
                <th>Schadenhoehe</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Schadensnummer}</td>
                  <td>{item.Vertragsnummer}</td>
                  <td>{item.Datum}</td>
                  <td>{item.Schadenstyp}</td>
                  <td>{item.Schadenhoehe}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rowNumber > 10 && (
            <Pagination
              totalPages={getTotalPages()}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <button className="btn btn-primary mt-3" onClick={downloadCSV}>Download aktuelle Seite als CSV</button>
        </>
      )}
    </>
  );
};

export default Schadensfaelle;