import React, { useState, useEffect } from 'react';
import './table.css';

function Table() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8082/getinfos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        
        console.log(response.json)
        return response.json();
        
      })
      .then((dataa) => {
        setData(dataa);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    
    <div>
      <h1>Informations - Conduite de changement</h1>
      <table className="table">
      <thead>
        <tr>
          <th>Nom Atelier</th>
          <th>Nom User</th>
          <th>Date</th>
          <th>Etat Actuel</th>
          <th>Etat Future</th>
        </tr>
      </thead>
      <tbody>
        { data.map((item, index) => (
            <tr key={index}>
            <td>{item.nom}</td>
            <td>{item.nom_user}</td>
            <td>{item.date}</td>
            <td>{item.etat_actuel}</td>
            <td>{item.etat_future}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default Table;