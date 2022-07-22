import React, { useContext } from 'react'

import Header from '../Header';
import { Footer } from '../Footer';

import { Leftside } from './Leftside';
import Layout from './Layout';
import TokenContext from '../context/TokenContext';
import Connection from '../connection/Connection';

function Administrateur() {
  const { role, token } = useContext(TokenContext)
  console.log(typeof(role));
  return (
    (token !== "" && role !== "" && (role.find(e => e === "ADMIN") !== undefined)) ?
      <>
        <Header />
        <Leftside />
        <Layout />
        <Footer />
      </>
      :
      <Connection />
  )
}

export default Administrateur;