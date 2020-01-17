const { Router } = require('express')
const DevController = require('./controllers/DevController')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

module.exports = routes


// Métodos HTTP: GET, POST, DELETE, PUT

// Tipos de Parametros:
// Query Params: request.query ( filtro, Ordenacao, paginacao )
// Route Params: request.params ( Identificar um recurso na aletracao ou remocao )
// Body: requst.body ( Dados para cracao ou alteracao de um registro )

// MongoDB ( Nao-relacional )


// routes.get('/devs/:id', (request, response) => {
//     console.log(request.params)
//     return response.json({
//         ...request.params
//     })
// })

// routes.get('/devs', (request, response) => {
//     return response.json({
//         ...request.params
//     })
// })

// routes.get('/',(request,response)=>{
//     return response.json({mensage:'Gilson Santos'})
// })