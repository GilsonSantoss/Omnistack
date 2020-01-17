const { Router } = require('express')

const routes = Router()

routes.post('/users',(request,response)=>{
    console.log(request.query)
    return response.json({mensage:'teste'})
})

module.exports = routes


// Métodos HTTP: GET, POST, DELETE, PUT

// Tipos de Parametros:
// Query Params: request.query ( filtro, Ordenacao, paginacao )
// Route Params: request.params ( Identificar um recurso na aletracao ou remocao )
// Body: requst.body ( Dados para cracao ou alteracao de um registro )

// MongoDB ( Nao-relacional )