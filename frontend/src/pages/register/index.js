import React, { useState } from 'react';
import api from '../../services/api'

import { Link, useHistory } from 'react-router-dom'

import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

export default function Register() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handlerRegister(event){
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try{
        const response = await api.post('/ongs', data );

        alert(`Seu ID foi criado com sucesso ${response.data.id}`);
        history.push('/');
       }
       catch(err){
           alert(`Erro ao criar seu ID: ${err}`)
       }

        
    
    }
    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG!</p>
                    <Link className="back-link" size={16} color="#f02041" to="/" > <FiArrowLeft />Voltar para Logon</Link>
                </section>

                <form onSubmit={handlerRegister}>
                    <input 
                    placeholder="Nome da ONG" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsApp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                        value = {uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}