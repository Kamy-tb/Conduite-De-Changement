import React, { useState, useEffect } from 'react';
import './atelier.css';
import etatsImg from './etats.jpg';
import Axios from 'axios'

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


  const [nom, setInputAtelier] = useState('');
  const handleSubmit =() => {
    Axios.post('http://localhost:8082/addatelier',
    {nom : nom
    }).then(()=>{
      alert("sucess insert")
    })
  }

/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(nom)
    const response = await fetch("http://localhost:8082/addatelier", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({ nom: nom })
    });
    const json = await response.json()
    console.log(json)
    
    setInputAtelier('');  
  }; 
 
*/
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
        <form onSubmit={handleSubmit}>
          <label>
          <span>Ajouter un atelier : </span>
          <input type="text" name="atelier" value={nom} onChange={(e) => {
              setInputAtelier(e.target.value);
              console.log(e.target.value)
            }} />
          </label>
          <button type="submit">Ajouter</button>
        </form>

      </div>

      </div>

  
    </div>

    
  );
}

export default App;