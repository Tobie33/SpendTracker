import prisma from "../../../helpers/prismaClient"
import handleErrors from "../../../helpers/handleErrors.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth].js"

const incomeRecordEditsAndSearch = async (req, res)=> {
  const session = await getServerSession(req, res, authOptions)
  const {method, query:{incomeId}, body: {incomeTypeId, amount}} = await req

  switch(method){
    case "GET":{
      try{
        let incomeId = await req.query.incomeId
        const incomeRecord = await prisma.income.findUnique({
          where:{
            id: Number(incomeId)
          }
        })

        return res.status(200).json(incomeRecord)
      } catch(err){
        handleErrors(res,err)
      }
    }

    case "PUT": {
      try{
        let incomeId = await req.query.incomeId
        const currentIncomeRecord = await prisma.income.findUnique({
          where:{
            id: Number(incomeId)
          }
        })

        const originalRecordBalance = currentIncomeRecord.amount

        const updatedIncomeRecord = await prisma.income.update({
          data:{
            incomeTypeId,
            amount
          },
          where:{
            id:Number(incomeId)
          }
        })

        const deficitOrSurplus = originalRecordBalance - amount

        const userUpdatedBalance = await prisma.user.update({
          data:{
            incomeBalance:{
              increment: deficitOrSurplus
            }
          },
          where:{
            id: session.user.id
          },
        })
      return res.status(200).json(updatedIncomeRecord, userUpdatedBalance)
      }catch(err){
        return handleErrors(res,err)
      }
    }

    case "DELETE": {
      try{
        const deletedRecord = await prisma.income.delete({
          where:{
            id:Number(incomeId)
          }
        })

        const {amount} = deletedRecord

        await prisma.user.update({
          data:{
            incomeBalance:{
              decrement: amount
            }
          },
          where:{
            id: session.user.id
          },
        })

        return res.status(200).end('Deletion Success')
      }catch(err){
        return handleErrors(res,err)
      }
    }
  }
}

export default incomeRecordEditsAndSearch
