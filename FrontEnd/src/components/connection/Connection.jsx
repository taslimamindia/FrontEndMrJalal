import React from 'react';
import Languages from '../language/Languages';
import FormLogin from './FormLogin';
// import imageUser from './fst.png';
import { useTranslation } from "react-i18next"; 


function Connection() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                {/* <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <span className="d-none d-lg-block"><img src={imageUser} width="400px" height="400px" alt=""/></span>
                                    </div>
                                </div> */}

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">{t('connexion.auth_title')}</h5>
                                        </div>

                                        <FormLogin />

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

            </div>

            <div className="language-position">
                <Languages />
            </div>
        </div>
    )
}

export default Connection;