import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth].js"


const incomeRecord = async (req, res) => {

  const session = await getServerSession(req, res, authOptions)

  const {method, body: {amount, incomeTypeId}} = await req

  switch(method){
    case 'GET': {
      try{
        const allIncomeRecords = await prisma.income.findMany({
          where:{
            userId:session.user.id
          }
        })

        return res.status(200).json(allIncomeRecords)
      }catch(err){
        handleErrors(res,err)
      }
    }

    case 'POST': {
      try{
        const selectedIncomeType = await prisma.incomeType.findUnique({
          where:{
            id: incomeTypeId
          }
        })

        const incomeTypeName = selectedIncomeType.name

        const createIncomeRecord = await prisma.income.create({
          data:{
            incomeTypeId,
            incomeTypeName,
            userId: session.user.id,
            amount
          }
        })

        const userUpdatedBalance = await prisma.user.update({
          data:{
            incomeBalance:{
              increment: amount
            }
          },
          where:{
            id: session.user.id
          },
        })

        return res.status(201).json(createIncomeRecord, userUpdatedBalance)
      }catch(err){
        handleErrors(res,err)
      }
    }

    case "DELETE": {
      await prisma.income.deleteMany({
        where:{
          userId: session.user.id
        }
      })


      await prisma.user.update({
        where:{
          id: session.user.id
        },
        data:{
          incomeBalance: 0
        }
      })
      return res.status(200).end('DESTORYED')
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end('Unauthorized')
  }
}

export default incomeRecord
