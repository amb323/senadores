import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const partido = `${item["PARTIDO O ALIANZA"]}`;
    return partido.toLowerCase().includes(filterText.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('senadores.json');
      setData(response.data.table.rows);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Senadores</h1>
        <h4>Datos Abiertos del Senado de la Nación Argentina</h4>
      </header>

      <input
        type="text"
        className="busqueda"
        value={filterText}
        onChange={handleChange}
        placeholder="Buscar por Partido"
      />

      <div className="caja">
      {filteredData.map((item) => (
        <div key={item.ID} className="senador">
          <img className="imagen" src={item.FOTO} />
          <h2>{item.NOMBRE} {item.APELLIDO}</h2>
          <p>{item.PROVINCIA}</p>
          <p>{item.EMAIL}</p>
          <p className="partido">{item["PARTIDO O ALIANZA"]}</p>
        </div>
      ))}
    </div>

    </div>
  );
}

export default App;
