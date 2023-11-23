import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js/index.js"

const findAndEditExpenseType = async (req, res) => {

  const {method, query: {id}, body: {name}} = req

  switch(method){
    case "GET":{
      try{
        const expenseType = await prisma.expenseType.findUnique({
          where:{
            id: Number(id)
          }
        })

        return res.status(200).json(expenseType)
      } catch(err){
        return handleErrors(res,err)
      }
    }

    case "PUT":{
      try{
        const  updatedExpenseType = await prisma.expenseType.update({
          where:{
            id: Number(id)
          },
          data:{
            name
          }
        })

        return res.status(201).json(updatedExpenseType)
      }catch(err){
        return handleErrors(res,err)
      }
    }

    case "DELETE":{
      try{
        await prisma.expenseType.delete({
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

export default findAndEditExpenseType
