import React, { useState } from 'react';
import Versichertendaten from './tables/Versichertendaten';
import Versicherungsvertraege from './tables/Versicherungsvertraege';
import Schadensfaelle from './tables/Schadensfaelle';
import Controller from './tables/Controller';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectData, setSelectData] = useState('');
  const [isSelectActive, setIsSelectActive] = useState(false);

  return (
    <div className="container mt-5">
      <h1>Projekt: Anzeige von Versicherungsdaten</h1>
      <Controller 
        selectData={selectData} 
        setSelectData={setSelectData} 
        setIsSelectActive={setIsSelectActive} 
      />
      {isSelectActive && selectData === 'Versichertendaten' && <Versichertendaten />}
      {isSelectActive && selectData === 'Versicherungsverträge' && <Versicherungsvertraege />}
      {isSelectActive && selectData === 'Schadensfälle' && <Schadensfaelle />}
    </div>
  );
}

export default App;