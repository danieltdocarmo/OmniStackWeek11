import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import './style.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
   const [id, setId] = useState('');
    const history = useHistory();
   
    async function handlerLogon(event){
       event.preventDefault();

       try{
            const response = await api.post('session', {id});
            localStorage.setItem('ongID', id)
            localStorage.setItem('name', response.data.ong.name)


            history.push('/profile')

            
       }catch(err){

        alert(`ID não localizado: ${err}`);
       }

   }
   
    return (
     
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handlerLogon}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}/>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02141" />
                    Nao tenho cadastro
                    </Link>

                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>

    );


}