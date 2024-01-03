import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"

const findAndEditIncomeType = async (req, res) => {

  const {method, query: {id}, body: {name, typeColor}} = req

  switch(method){
    case "GET":{
      try{
        const incomeType = await prisma.incomeType.findUnique({
          where:{
            id: Number(id)
          }
        })

        return res.status(200).json(incomeType)
      } catch(err){
        return handleErrors(res,err)
      }
    }

    case "PUT":{
      try{
        const updatedIncomeType = await prisma.incomeType.update({
          where:{
            id: Number(id)
          },
          data:{
            name,
            typeColor
          }
        })

        return res.status(201).json(updatedIncomeType)
      }catch(err){
        return handleErrors(res,err)
      }
    }

    case "DELETE":{
      try{
        await prisma.incomeType.delete({
          where:{
            id: Number(id)
          }
        })

        return res.status(200).end('Deletion Success')
      }catch(err){
        return handleErrors(res,err)
      }
    }

    default:{
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end('Unauthorized')
    }

  }
}

export default findAndEditIncomeType
