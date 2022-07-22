import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenContext from './context/TokenContext';
import "./Header.css";
import Languages from './language/Languages';

const toggle = () => {
    const body = document.querySelector('body')
    if (body.classList.contains("toggle-sidebar")) {
        body.classList.remove("toggle-sidebar")
    }
    else {
        body.classList.add("toggle-sidebar")
    }
}

function Header() {
    const { role, nom, prenom } = useContext(TokenContext);

    return (
        <React.Fragment>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <div href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">Gestion Ressources</span>
                    </div>
                    {role === "FOURNISSEUR" ? <></> : <i className="bi bi-list toggle-sidebar-btn" onClick={toggle}></i>}
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <Languages />
                        </li>

                        <li className="nav-item dropdown pe-3">

                            <div className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                                <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{String(nom).toUpperCase()}</span>
                            </div>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{String(nom).toUpperCase()} &nbsp; {String(prenom).toUpperCase()}</h6>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <div className="dropdown-item d-flex align-items-center" >
                                        <i className="bi bi-person"></i>
                                        <span><Link to={"/Profil"}>Mon Profil</Link></span>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <div className="dropdown-item d-flex align-items-center">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span><Link to={"/"}>Déconnection</Link></span>
                                    </div>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </nav>

            </header>
        </React.Fragment>
    )
}

export default Header