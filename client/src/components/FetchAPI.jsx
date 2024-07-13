import axios from 'axios';

export const fetchAPI = async (url, setData) => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const Protokolltabelle = async (label, startRow, endRow) => {
  try {
    await axios.post('http://127.0.0.1:5000/Protokolltabelle', {
      label,
      start_row: startRow,
      end_row: endRow
    });
  } catch (error) {
    console.error('Error logging download:', error);
  }
};