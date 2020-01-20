import React, { useState, useEffect } from 'react'

import api from './services/api'

import Devitem from './components/DevItem'
import Devform from './components/DevForm'

import './global.css'
import './App.css'
import './Asidebar.css'
import './Main.css'

function App() {
  const [devs,setDevs] = useState([])

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
  <div id="app">
    <aside>
    <strong>Cadastrar</strong>
    <Devform onSubmit={handleAddDev}/>
    </aside>
    <main>
      <ul>
      {devs.map(dev => (
        <Devitem
          key={dev._id}
          dev={dev}
        />
      ))}
      </ul>
    </main>
  </div>
  )
}

export default App;
