import React, { useState, useEffect } from 'react';
import './atelier.css';
import etatsImg from './etats.jpg';
import './Dropdown.css';
import Axios from 'axios'

function App() {

const [selectedOption, setSelectedOption] = useState('');




const [data, setData] = useState([]);
  useEffect(() => {
    let link = selectedOption
      ? `http://localhost:8082/getinfos/${selectedOption}`
      : "http://localhost:8082/getinfos";
    console.log(selectedOption)
    fetch(link)
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
  }, [selectedOption]);


  const [nom, setInputAtelier] = useState('');
  const handleSubmit =() => {
    Axios.post('http://localhost:8082/addatelier',
    {nom : nom
    }).then(()=>{
      alert("sucess insert")
    })
  }

  const [options, setOptions] = useState([]);
  
    useEffect(() => {
      // Fetch options from the backend
      fetch('http://localhost:8082/getnamesateliers')
        .then(response => response.json())
        .then(data => setOptions(data))
        .catch(error => console.error(error));
    }, []);

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
        <div >
        <h1>Informations - Conduite de changement</h1>

        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option disabled value="">All</option> {/* Ajouter value="" pour réinitialiser la sélection */}
          {options.map(option => (
           <option key={option} value={option.nom}>{option.nom}</option>
           ))}
        </select>



        </div>

        
      
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