import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
toast.configure();

const Article = ({ article = null }) => {
    const { t } = useTranslation();
    const { token } = useContext(TokenContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);

    const onSubmit = (data) => {
        if (article === null) {
            add(data);
        }
        else {
            update(data);
        }
    }

    const add = (data) => {
        let article = new Map();
        for(let [k, v] of Object.entries(data)) {
            console.log(k, "=>", v);
            // if()
        }
        
        return null;
        api.get("stockservice/articles", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("L'article a été enregistrer avec succès.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
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

    const update = (data) => {

    }

    const charger = () => {
        api.get("stockservice/categories", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setCategories(res.data);
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
    }

    useEffect(() => {
        charger();
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
                            &nbsp;&gt;&nbsp;
                            <Link to={"/Administrateur/Stock/Article/Add"}>Ajout d'article</Link>
                        </li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="row">
                    <div className="col-12 col-md-7 col-lg-6 py-3 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Article</h5>

                                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-12">
                                        <label htmlFor="description" className="form-label">Description:</label>
                                        <input
                                            {...register("description", { required: true })}
                                            type="text" className="form-control" id="description"
                                        />
                                        {errors.description && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="reference" className="form-label">Réference:</label>
                                        <input
                                            {...register("reference", { required: true })}
                                            type="text" className="form-control" id="reference"
                                        />
                                        {errors.reference && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="priceU" className="form-label">Prix Unitaire:</label>
                                        <input
                                            {...register("priceU", { required: true })}
                                            type="text" className="form-control" id="priceU"
                                        />
                                        {errors.priceU && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="quantity" className="form-label">Quantité:</label>
                                        <input
                                            {...register("quantity", { required: true })}
                                            type="text" className="form-control" id="quantity"
                                        />
                                        {errors.quantity && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="categorie" className="form-label">Catégorie:</label>
                                        <select name="categories" className='form-select' id="categorie">
                                            {article === null ?
                                                <>
                                                    <option value="null">Choisir la catégorie:</option>
                                                    {
                                                        categories.map(item => {
                                                            return(
                                                                <option value={item.id}>{item.intitule}</option>
                                                            )
                                                        })
                                                    }
                                                </>
                                                :
                                                <>
                                                    {
                                                        categories.map(item => {
                                                            return(
                                                                <option selected={item.id === article.categorie.id} value={item.id}>{item.intitule}</option>
                                                            )
                                                        })
                                                    }
                                                </>
                                            }
                                            
                                        </select>
                                    </div>
                                    <div className="col-12 py-3">
                                        <button type="submit" className="btn btn-primary">Enregister</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Article;
