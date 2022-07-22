import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../api';
import TokenContext from './context/TokenContext';
import { useTranslation } from 'react-i18next';
import Languages from './language/Languages';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function FormChangeInfo({data, charger}) {
  const { token } = useContext(TokenContext);
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const [active, setActive] = useState(false);
  
  const changeInfo = (data) => {
    const userRequest = {
      "firstName": data.firstName,
      "lastName": data.lastName
    }

    api.put("/userservice/changeInfo", userRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data === true) {
          toast.success("Les infos ont été changer avec succès.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "colored"
          })
          charger();
          setActive(false);
        }
        else {
          toast.error("Echec du changement des informations personnels !!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 10000,
            theme: "colored"
          })
        }
      }
      else {
        toast.error("Echec du changement des informations personnels !!!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
          theme: "colored"
        })
      }
    }).catch(function (error) {
      toast.error("Echec du changement des informations personnels !!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        theme: "colored"
      })
    })
  }
  const activeBtn = (e) => {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    // const email = document.getElementById('email').value;
    setActive(nom !== '' && prenom !== '');
  }

  return (
    <form onSubmit={handleSubmit(changeInfo)}>
      <div className="row mb-3">
        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">{t('firstName')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("firstName", { required: true })} type="text" className="form-control" onChange={() => {activeBtn()}} id="nom" defaultValue={data.firstName} />
        </div>
      </div>

      <div className="row mb-3">
        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">{t('lastName')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("lastName", { required: true })} type="text" className="form-control" onChange={() => {activeBtn()}} id="prenom" defaultValue={data.lastName} />
        </div>
      </div>

      {/* <div className="row mb-3">
        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">{t('email')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("email")} type="email" className="form-control" onChange={() => {activeBtn()}} id="email" defaultValue={"exemple@gmail.com"} />
        </div>
      </div> */}

      <div className="text-center">
        <button disabled={!active} type="submit" className="btn btn-primary">{t('btn-save')}</button>
      </div>
    </form>
  )
}

function FormChangePassword({charger}) {
  const { token } = useContext(TokenContext)
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [active, setActive] = useState(false);
  
  const activeBtn = (e) => {
    const newpassword = document.getElementById('newPassword').value;
    const confirmpassword = e.target.value;
    console.log(newpassword, confirmpassword);
    setActive(newpassword !== '' && newpassword === confirmpassword);
  }

  const changePassword = (data) => {
    const userRequest = {
      "newPassword": data.newPassword,
      "password": data.password
    }
    api.put("/userservice/changePassword", userRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res);
        if (res.data === true) {
          toast.success("Mot de passe changer avec succès.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "colored"
          })
          charger();
          setActive(false);
          reset();
        }
        else {
          toast.error("Echec du changement de mot de passe !!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 10000,
            theme: "colored"
          })
        }
      }
      else {
        toast.error("Echec du changement de mot de passe !!!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10000,
          theme: "colored"
        })
      }
    }).catch(function (error) {
      toast.error("Echec du changement de mot de passe !!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        theme: "colored"
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(changePassword)}>

      <div className="row mb-3">
        <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">{t('current-password')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("password", { required: true })} type="password" className="form-control" id="currentPassword" />
        </div>
      </div>

      <div className="row mb-3">
        <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">{t('new-password')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("newPassword", { required: true })} type="password" className="form-control" id="newPassword" />
        </div>
      </div>

      <div className="row mb-3">
        <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">{t('confirm-password')}</label>
        <div className="col-md-8 col-lg-9">
          <input {...register("confirmPassword", { required: true })} type="password" className="form-control" id="renewPassword" onChange={(e) => { activeBtn(e) }} />
        </div>
      </div>

      <div className="text-center">
        <button disabled={!active} type="submit" className="btn btn-primary">{t('profile-change-password')}</button>
      </div>
    </form>
  )
}

function Profil() {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const charge = () => {
    api.get("userservice/userInfo", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(res => {
      if (res.status === 200) {
        setData(res.data);
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => {
    charge();
  }, [])

  return (
    <>
      <div className="language-position">
        <Languages />
      </div>
      <div className="container mt-5">
        <div className="pagetitle">
          <h1>{t('title-profil')}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/"}>{t('title-home')}</Link></li>
              <li className="breadcrumb-item active">{t('title-profil')}</li>
            </ol>
          </nav>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">

              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                  <h2>Mr.Alaoui</h2>
                  <h3>Responsable</h3>
                </div>
              </div>

            </div>
            {
              data !== [] &&
              <div className="col-xl-8">

                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">

                      <li className="nav-item">
                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">{t('profile-overview')}</button>
                      </li>

                      <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">{t('profile-edit')}</button>
                      </li>

                      <li className="nav-item">
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">{t('profile-change-password')}</button>
                      </li>

                    </ul>
                    <div className="tab-content pt-2">

                      <div className="tab-pane fade show active profile-overview" id="profile-overview">
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label ">{t('firstName')} & {t("lastName")}</div>
                          <div className="col-lg-9 col-md-8">{data.firstName} {data.lastName}</div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">{t('role')}</div>
                        </div>

                        {/* <div className="row">
                          <div className="col-lg-3 col-md-4 label">{t('email')}</div>
                          <div className="col-lg-9 col-md-8">exemple@gmail.com</div>
                        </div> */}

                      </div>

                      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                        <FormChangeInfo data={data} charger={charge} />
                      </div>

                      <div className="tab-pane fade pt-3" id="profile-change-password">
                        <FormChangePassword charger={charge} />
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            }

          </div>
        </section>

      </div>
    </>
  )
}

export default Profil;
