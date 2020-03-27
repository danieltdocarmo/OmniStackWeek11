import React ,{ useState } from 'react';
import { FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';



import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState(``)
    const [description, setDescription] = useState(``);
    const [value, setValue] = useState(0)

    const history = useHistory();


    const ongID = localStorage.getItem('ongID');

    async function handlerSubmit(e){
        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        }

        try{
            await api.post('incident', data , { headers: { autorization: ongID, }});
            history.push('profile')
         }catch(err){
            alert(`Nao foi possivel criar um novo incidente! ${err}`)

        }

    }
    
    
    return(
        <div className="new-incident-container">
        <div className="content">

            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastra novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar <br/> um herói que possa resolver isso!</p>
                    <Link className="back-link" size={16} color="#f02041" to="/" > <FiArrowLeft/>Voltar para Home</Link>
            </section>

            <form onSubmit={handlerSubmit}>
                <input type="text" placeholder="Titulo do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea placeholder="descricao"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input type="text" placeholder="Valor em reais"
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                
                <button className="button" type="submit">Cadastrar</button>
            </form>

        </div>
    </div>
    );
}