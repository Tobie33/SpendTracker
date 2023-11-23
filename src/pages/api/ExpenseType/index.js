import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js/index.js"

const createAndGetExpenseTypes = async (req,res) => {
  const {method, body: {name}} = req

  switch(method){

    case "GET": {
      try{
        const allExpenseTypes = await prisma.expenseType.findMany()

        return res.status(200).json(allExpenseTypes)
      } catch (err){
        return handleErrors(res,err)
      }
    }

    case "POST":{
      try{
          const newExpenseType = await prisma.expenseType.create({
            data: {
              name
            },
          })

          return res.status(201).json(newExpenseType)
        } catch (err){
          return handleErrors(res, err)
        }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end('Unauthorized')
    }
}

export default createAndGetExpenseTypes
