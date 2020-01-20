import React from 'react'
import api from '../../services/api'

import './styles.css'

function Devitem({ dev }){

  const handleRemove = async dev => {
    await api.delete('/deleteDev', {data:{github_username:dev}})
  }

  return (
    <li
      className="dev-item"
      >
      <header>
        <img src={dev.avatar_url} alt=""/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        <button onClick={()=>handleRemove(dev.github_username)}>X</button>
      </header>
      <p>{dev.bio}</p>
      <a 
        href={`https://github.com/${dev.github_username}`}
      >Acessar perfil no Github</a>
    </li>
  )
}

export default Devitem