import { useEffect, useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import Pagination from '../components/Pagination';
import { fetchAPI, Protokolltabelle } from '../components/FetchAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

const Versicherungsvertraege = () => {
  const [data, setData] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleShowRef = useRef(rowNumber);

  useEffect(() => {
    fetchAPI('http://127.0.0.1:5000/versicherungsvertraege', setData);
  }, []);

  const handleRowChange = () => {
    const value = Number(handleShowRef.current.value);
    setRowNumber(value);
    setCurrentPage(1); // Reset to first page when items to show changes
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
      ['Vertragsnummer', 'Versichertennummer', 'Vertragsbeginn', 'Vertragsende', 'Vertragsstatus'],
      ...displayedData.map(item => [
        item.Vertragsnummer,
        item.Versichertennummer,
        item.Vertragsbeginn,
        item.Vertragsende,
        item.Vertragsstatus
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `data_page_${currentPage}.csv`);

    // send data to databse
    await Protokolltabelle('versicherungsvertraege', (currentPage - 1) * 10 + 1, currentPage * 10);
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
                <th>Vertragsnummer</th>
                <th>Versichertennummer</th>
                <th>Vertragsbeginn</th>
                <th>Vertragsende</th>
                <th>Vertragsstatus</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Vertragsnummer}</td>
                  <td>{item.Versichertennummer}</td>
                  <td>{item.Vertragsbeginn}</td>
                  <td>{item.Vertragsende}</td>
                  <td>{item.Vertragsstatus}</td>
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

export default Versicherungsvertraege;