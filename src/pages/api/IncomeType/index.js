import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"

const createAndGetIncomeTypes = async (req,res) => {
  const {method, body: {name}} = req

  switch(method){

    case "GET": {
      try{
        const allIncomeTypes = await prisma.incomeType.findMany()

        return res.status(200).json(allIncomeTypes)
      } catch (err){
        return handleErrors(res,err)
      }
    }

    case "POST":{
      try{
          const newIncomeType = await prisma.incomeType.create({
            data: {
              name
            },
          })

          return res.status(201).json(newIncomeType)
        } catch (err){
          return handleErrors(res, err)
        }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end('Unauthorized')
    }
}

export default createAndGetIncomeTypes
