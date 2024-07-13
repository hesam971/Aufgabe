import { useEffect, useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import Pagination from '../components/Pagination';
import { fetchAPI, Protokolltabelle } from '../components/FetchAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

const Versichertendaten = () => {
  const [data, setData] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleShowRef = useRef(rowNumber);

  useEffect(() => {
    fetchAPI('http://127.0.0.1:5000/', setData);
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
      ['Versichertennummer', 'Name', 'Geburtsdatum', 'Adresse'],
      ...displayedData.map(item => [
        item.Versichertennummer,
        item.Name,
        item.Geburtsdatum,
        item.Adresse
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `data_page_${currentPage}.csv`);

    // send data to databse
    await Protokolltabelle('Versichertendaten', (currentPage - 1) * 10 + 1, currentPage * 10);
  };

  return (
    <div className="container mt-5">
      <label htmlFor="rowNumber" className="form-label">Wählen Sie aus:</label>
      <select
        id="itemsToShow"
        ref={handleShowRef}
        onChange={handleRowChange}
        className="form-select form-select-sm"
        style={{ width: 'auto', display: 'inline-block' }}
      >
        <option value="0">auswählen...</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      {rowNumber > 0 && (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Versichertennummer</th>
                <th>Name</th>
                <th>Geburtsdatum</th>
                <th>Adresse</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Versichertennummer}</td>
                  <td>{item.Name}</td>
                  <td>{item.Geburtsdatum}</td>
                  <td>{item.Adresse}</td>
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
          <button onClick={downloadCSV} className="btn btn-primary mt-3">Download aktuelle Seite als CSV</button>
        </>
      )}
    </div>
  );
};

export default Versichertendaten;
