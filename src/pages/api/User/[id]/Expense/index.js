import prisma from "../../../../../helpers/prismaClient.js"
import handleErrors from "../../../../../helpers/handleErrors.js/index.js"

const expenseRecord = async (req, res) => {

  const {method, query:{id}, body: {expenseTypeId, amount}} = req

  switch(method){
    case 'GET': {
      try{
        const allExpenseRecords = await prisma.expense.findMany({
          where:{
            userId:Number(id)
          }
        })

        return res.status(200).json(allExpenseRecords)
      }catch(err){
        handleErrors(res,err)
      }
    }

    case 'POST': {
      try{
        const createExpenseRecord = await prisma.expense.create({
          data:{
            expenseTypeId,
            userId: Number(id),
            amount
          }
        })

        const userUpdatedBalance = await prisma.user.update({
          data:{
            balance:{
              decrement: amount
            }
          },
          where:{
            id: Number(id)
          },
        })

        return res.status(201).json(createExpenseRecord, userUpdatedBalance)
      }catch(err){
        handleErrors(res,err)
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end('Unauthorized')
  }
}

export default expenseRecord
