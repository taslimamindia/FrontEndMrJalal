import React from "react";
import { Routes, Route} from 'react-router-dom';
import Accueil from "./accueil/Accueil";
import Article from "./stock/Article";
import Stock from "./stock/Stock";

function Layout() {

    return (
        <React.Fragment>

            <main id="main">
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/Stock" element={<Stock />} />
                    <Route path="/Stock/Article/Add" element={<Article />} />
                </Routes>
            </main>

        </React.Fragment>
    )
}

export default Layout;