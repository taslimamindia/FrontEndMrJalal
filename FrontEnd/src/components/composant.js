import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Composant = () => {
    const { t } = useTranslation();
    const charge = () => {
        api.get("userservice/userInfo", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
            }
            else {
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
                        </li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="row">
                    <div className="col">
                        header
                    </div>
                </div>
                <div className="row">
                    <div className="col bg-black">
                        body
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

export default Composant;
