import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate, } from 'react-router-dom';
import api from '../../api';
import TokenContext from '../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
toast.configure();

function FormLogin() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const {updateToken, updateUsername, updateRole, updateNom, updatePrenom } = useContext(TokenContext);
    const {t} = useTranslation();

    const onSubmit = (data) => {
        api.post("/auth/login", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                updateToken(res.data.token);
                updateRole(res.data.roles)
                const role = res.data.roles;
                api.get("/userservice/userInfo", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + res.data.token,
                    }
                })
                .then(resp => {
                    if(resp.status === 200) {
                        updateUsername(resp.data.login);
                        updateNom(resp.data.firstName);
                        updatePrenom(resp.data.lastName);
                        reset();
                        
                        if (role.find(elem => elem === "ADMIN") !== undefined) {
                            navigate("/Administrateur/Stock");
                        }
                        // else if (role === "ENSEIGNANT" || role === "ADMINISTRATIF") {
                        //     navigate("/Enseignant/");
                        // }
                        // else if (role === "CHEFDEPARTEMENT") {
                        //     navigate("/ChefDepartement/");
                        // }
                        // else if (role === "FOURNISSEUR") {
                        //     navigate("/Fournisseur/");
                        // }
                        // else if (role === "ADMIN") {
                        //     navigate("/Maintenance/");
                        // }
                        // else if (role === "MAINTENANCE") {
                        //     navigate("/Maintenance/");
                        // }
                        // else {
                        //     navigate("/error404");
                        // }
                    }  
                    else {
                        
                    }          
                })
                .catch(function (error) {
                    toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        theme: "colored"
                    })
                })                     
            }
            else {
                toast.error("🤦🏿‍♂️ Utilisateur ou mot de passe incorrect !!! 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        })
        .catch(function (error) {
            if (String(error).search("401") !== -1) {
                toast.error("😡 Votre compte n'existe pas !!! 💣\n      🧨 on joue pas 🪓 \n Contactez le responsable", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 20000,
                    theme: "colored"
                })
            }
            else{
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        })
    }
    return (
        <React.Fragment>

            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-12">
                    <label htmlFor="username" className="form-label">{t('connexion.username')}</label>
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input autoComplete='login'
                            {...register("login", { required: true })}
                            className="form-control" id="username" type="text"
                        />
                        {errors.login && <div className="text-danger text-center w-100">{t('connexion.error.username')}</div>}
                    </div>
                </div>

                <div className="col-12">
                    <label htmlFor="password" className="form-label">{t('connexion.password')}</label>
                    <input
                        {...register("password", { required: true })}
                        className="form-control" id="password" type="password"
                    />
                    {errors.password && <div className="text-danger text-center w-100">{t('connexion.error.password')}</div>}
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <Link to={"/MotDePasseOublier"} class="form-check-label">{t('connexion.passwordForget')}</Link>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">{t('connexion.btnConnect')}</button>
                </div>

                <div className="col-12">
                    <p className="small mb-0">
                        <Link to={"/Inscription"}> {t('connexion.newCompte')} </Link>
                    </p>
                </div>
            </form>

        </React.Fragment>
    )
}

export default FormLogin;