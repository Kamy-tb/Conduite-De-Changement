import React, { useState, useEffect } from 'react';
import './atelier.css';
import etatsImg from './etats.jpg';
import axios from 'axios';

function App() {

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
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);


  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log('inputValue:', inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inputValue:', inputValue);
    if (!inputValue) {
      console.log('Error: Input value is empty');
      return;
    }
    fetch('http://localhost:8082/addatelier', {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ atelier: inputValue }),
    })
      .then((response) => {
        console.log('Success:', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setInputValue('');
  };
  
 

  return (
    <div class="principale">
      <div>
        <h1>L'arbre </h1>
        <div class="image-container">
          <img src={etatsImg} alt="Capture de l'arbre des etats" />
        </div>
      </div>
      

      <div>

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

      <div className="atelier">
        <h1>Ajouter un atelier</h1>
        <form onSubmit={handleSubmit}>
         <label>
             Entrer le nom de l'atelier à ajouter:
         <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Ajouter</button>
        </form>

      </div>

      </div>

  
    </div>

    
  );
}

export default App;