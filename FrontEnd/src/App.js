import './App.css';
import React, {  useState } from 'react';
import Administrateur from './components/administrateur/Administrateur';
import Connection from './components/connection/Connection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './components/connection/Inscription';
import MotDePasseOublier from './components/connection/MotDePasseOublier';
import TokenContext from "./components/context/TokenContext";
import Error404 from './components/errors/Error404';
import './components/language/i18n';
import Profil from './components/Profil';

// role: role, 
//     updateRole: setRole
function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [msg, setMsg] = useState(false);
  const [lang, setLang] = useState("fr");
  const [stompClient, setStompClient] = useState(null);
  const contextValue = {
    token: token,
    updateToken: setToken,
    username: username,
    updateUsername: setUsername,
    role: role,
    updateRole: setRole,
    nom: nom,
    updateNom: setNom,
    prenom: prenom,
    updatePrenom: setPrenom,
    msg: msg,
    updateMsg: setMsg,
    stompClient: stompClient,
    updateStompClient: setStompClient,
    lang: lang,
    updateLang: setLang,
  };

  return (
    <TokenContext.Provider value={contextValue}>
      <React.Fragment>
        <Router>
          <Routes>
            <Route path="/" element={<Connection />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/MotDePasseOublier" element={<MotDePasseOublier />} />
            <Route path='/Inscription' element={<Inscription />} />

            <Route path="/Administrateur/*" element={<Administrateur />} />
            
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </Router>
      </React.Fragment>
    </TokenContext.Provider>
  );
}

export default App;
