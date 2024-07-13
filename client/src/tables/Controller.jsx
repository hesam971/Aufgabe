import React from 'react';

function Controller({ selectData, setSelectData, setIsSelectActive }) {
  const handleCheckboxChange = (dataType) => {
    if (selectData === dataType) {
      setSelectData('');
      setIsSelectActive(false);
    } else {
      setSelectData(dataType);
      setIsSelectActive(true);
    }
  };

  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Versichertendaten"
          id="versichertendaten"
          checked={selectData === 'Versichertendaten'}
          onChange={() => handleCheckboxChange('Versichertendaten')}
        />
        <label className="form-check-label" htmlFor="versichertendaten">
          Versichertendaten
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Versicherungsverträge"
          id="versicherungsvertraege"
          checked={selectData === 'Versicherungsverträge'}
          onChange={() => handleCheckboxChange('Versicherungsverträge')}
        />
        <label className="form-check-label" htmlFor="versicherungsvertraege">
          Versicherungsverträge
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Schadensfälle"
          id="schadensfaelle"
          checked={selectData === 'Schadensfälle'}
          onChange={() => handleCheckboxChange('Schadensfälle')}
        />
        <label className="form-check-label" htmlFor="schadensfaelle">
          Schadensfälle
        </label>
      </div>
    </div>
  );
}

export default Controller;