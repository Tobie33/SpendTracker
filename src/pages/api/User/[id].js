import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"

const findAndEditUser = async (req, res) => {

  const {method, query: {id}, body: {name}} = req

  switch(method){
    case "GET":{
      try{
        const user = await prisma.user.findUnique({
          where:{
            id: Number(id)
          }
        })

        return res.status(200).json(user)
      } catch(err){
        return handleErrors(res,err)
      }
    }

    case "PUT":{
      try{
        const  updatedUser = await prisma.user.update({
          where:{
            id: Number(id)
          },
          data:{
            name
          }
        })

        return res.status(201).json(updatedUser)
      }catch(err){
        return handleErrors(res,err)
      }
    }

    default:{
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end('Unauthorized')
    }

  }
}

export default findAndEditUser
