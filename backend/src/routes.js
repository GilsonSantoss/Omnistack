const { Router } = require('express')
const axios = require('axios')
const Dev = require('./models/Dev')

const routes = Router()

routes.post('/devs', async (request,response)=>{
    const { github_username, techs } = request.body

    const user = await axios.get(`https://api.github.com/users/${github_username}`)

    const techsArray = techs.split(',').map(tech=> tech.trim())

    const { name = login, avatar_url, bio } = user.data

    const dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs:techsArray
    });

    return response.json(dev);
})

routes.get('/devs/:id', (request, response) => {
    console.log(request.params)
    return response.json({
        ...request.params
    })
})

routes.get('/devs', (request, response) => {
    return response.json({
        ...request.params
    })
})

routes.get('/',(request,response)=>{
    return response.json({mensage:'Gilson Santos'})
})

module.exports = routes


// Métodos HTTP: GET, POST, DELETE, PUT

// Tipos de Parametros:
// Query Params: request.query ( filtro, Ordenacao, paginacao )
// Route Params: request.params ( Identificar um recurso na aletracao ou remocao )
// Body: requst.body ( Dados para cracao ou alteracao de um registro )

// MongoDB ( Nao-relacional )