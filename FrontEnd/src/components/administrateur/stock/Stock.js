import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
toast.configure();

function Tr({ data }) {
    const edit_article = (id) => {
        window.alert("editer "+id)
    }
    const delete_article = (id) => {
        window.alert("delete "+id)

    }

    return (
        <tr className="text-center">
            <td>{data.description}</td>
            <td>{data.reference}</td>
            <td>{data.categorie === null ? "": data.categorie.intitule}</td>
            <td>{data.priceU}</td>
            <td>{data.quantity}</td>
            <td>{data.updated_at}</td>
            <td><button className='btn btn-info' onClick={()=>{edit_article(data.id)}}>edit</button></td>
            <td><button className='btn btn-danger' onClick={()=>{delete_article(data.id)}}>delete</button></td>
        </tr>
    )
}

function Table({ data }) {
    return (
        <table className="table datatable">
            {Object.entries(data).length !== 0 &&
                <>
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Description</th>
                            <th scope="col">Réference</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Prix Unitaire</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">Date</th>
                            <th scope="col">Moditifier</th>
                            <th scope="col">Supprimer</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => {
                                return (<Tr key={item.id} data={item} />)
                            })
                        }
                    </tbody>
                </>
            }
        </table>
    )
}

const Stock = () => {
    const { t } = useTranslation();
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);

    const charge = () => {
        api.get("stockservice/articles", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setData(res.data);
                console.log(res.data);
            } else {
                toast.error("Echec de la requete: status = " + res.status, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
            }
        }).catch(function (error) {
            toast.error("Erreur survenu" + error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: "colored"
            });
        })

        // api.get("stockservice/categories", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     }
        // }).then(res => {
        //     console.log(res);
        //     if (res.status === 200) {
        //         categories = new Map();
        //         categories = res.data;
        //         console.log(categories);
        //     } else {
        //         toast.error("Echec de la requete: status = " + res.status, {
        //             position: toast.POSITION.TOP_RIGHT,
        //             autoClose: 5000,
        //             theme: "colored"
        //         });
        //     }
        // }).catch(function (error) {
        //     toast.error("Erreur survenu" + error, {
        //         position: toast.POSITION.TOP_RIGHT,
        //         autoClose: 5000,
        //         theme: "colored"
        //     });
        // })
    }

    useEffect(() => {
        charge();
    }, [])

    return (
        <React.Fragment>
            <div className="pagetitle">
                <h1>Menu</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Administrateur/"}>Accueil</Link>
                            &nbsp;&gt;&nbsp;
                            <Link to={"/Administrateur/Stock"}>Stock</Link>
                        </li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="row py-3">
                    <div className="col">
                        <Link to={"/Administrateur/Stock/Article/Add"} className='btn btn-primary'>Ajouter article</Link>
                    </div>
                </div>
                <div className="row px-3">
                    <div className="col">
                        <Table data={data} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        footer
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Stock;
