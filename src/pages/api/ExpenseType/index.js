import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth].js"

const createAndGetExpenseTypes = async (req,res) => {
  const session = await getServerSession(req, res, authOptions)
  const {method, body: {name, typeColor}} = req

  switch(method){

    case "GET": {
      try{
        const allExpenseTypes = await prisma.expenseType.findMany({
          include:{
            expenses:{
              where:{
                userId: session.user.id
              }
            }
          }
        })

        return res.status(200).json(allExpenseTypes)
      } catch (err){
        return handleErrors(res,err)
      }
    }

    case "POST":{
      try{
          const newExpenseType = await prisma.expenseType.create({
            data: {
              name,
              typeColor
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
