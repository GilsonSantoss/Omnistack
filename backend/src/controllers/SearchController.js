const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request,response){
    console.log('passando aqui!!!!', request.query)
    // Busca todos os devs em um raio de 10km
    //Filtrar por tecnologia
    const { latitude, longitude, techs } = request.query
    
    const techsArray = parseStringAsArray(techs)
    
    const devs  = await Dev.find({
      techs:{
        $in:techsArray
      },
      location:{
        $near: {
          geometry:{
            type:'Point',
            coordenates: [longitude,latitude]
          }
        },
        $maxDistance:10000
      }
    })
    return response.json({ devs })
  }
}