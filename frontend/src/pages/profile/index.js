import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'
import { FiTrash2 } from 'react-icons/fi'
import './style.css'

import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const name = localStorage.getItem('name')
    const ongID = localStorage.getItem('ongID')

    useEffect(() => {
        api.get('profile', {
            headers: {
                autorization: ongID,
            }
        }).then(response => {
            setIncidents(response.data);

        })
    }, [ongID]);

    async function handlerDelete(id) {

        try {
            await api.delete(`incident/${id}`, { headers: { autorization: ongID } })


            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (err) {
            alert(`Não foi possivel deletar o caso! ${err}`)
        }
    }
    const history = useHistory();
    function handlerLogOut() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {name}</span>

                <Link className="button" to="/newincident">Cadastrar novo caso</Link>
                <button onClick={handlerLogOut} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>

            </header>
            <h1>Casos cadastrados</h1>


            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>R$: {incident.value},00</p>
                        <button onClick={() => handlerDelete(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}

            </ul>
        </div>


    );
}