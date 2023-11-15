import prisma from "../../../../../helpers/prismaClient.js"
import handleErrors from "../../../../../helpers/handleErrors.js"

const incomeRecord = async (req, res) => {

  const {method, query:{id}, body: {incomeTypeId, amount}} = req

  switch(method){
    case 'GET': {
      try{
        const allIncomeRecords = await prisma.income.findMany({
          where:{
            userId:Number(id)
          }
        })

        return res.status(200).json(allIncomeRecords)
      }catch(err){
        handleErrors(res,err)
      }
    }

    case 'POST': {
      try{
        const createIncomeRecord = await prisma.income.create({
          data:{
            incomeTypeId,
            userId: Number(id),
            amount
          }
        })

        const userUpdatedBalance = await prisma.user.update({
          data:{
            balance:{
              increment: amount
            }
          },
          where:{
            id: Number(id)
          },
        })

        return res.status(201).json(createIncomeRecord, userUpdatedBalance)
      }catch(err){
        handleErrors(res,err)
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end('Unauthorized')
  }
}

export default incomeRecord
