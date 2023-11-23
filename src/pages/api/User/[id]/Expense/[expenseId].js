import prisma from "../../../../../helpers/prismaClient.js"
import handleErrors from "../../../../../helpers/handleErrors.js/index.js"

const expenseRecordEditsAndSearch = async (req, res)=> {
  const {method, query: {id, expenseId}, body: {expenseTypeId, amount}} = req

  switch(method){
    case "GET":{
      try{
        const expenseRecord = await prisma.expense.findUnique({
          where:{
            id: Number(expenseId)
          }
        })

        return res.status(200).json(expenseRecord)
      } catch(err){
        handleErrors(res,err)
      }
    }

    case "PUT": {
      try{
        const currentExpenseRecord = await prisma.expense.findUnique({
          where:{
            id: Number(expenseId)
          }
        })

        const originalRecordBalance = currentExpenseRecord.amount

        const updatedExpenseRecord = await prisma.expense.update({
          data:{
            expenseTypeId,
            amount
          },
          where:{
            id:Number(expenseId)
          }
        })

        const deficitOrSurplus = originalRecordBalance - amount

        const userUpdatedBalance = await prisma.user.update({
          data:{
            balance:{
              increment: deficitOrSurplus
            }
          },
          where:{
            id: Number(id)
          },
        })

        return res.status(200).json(updatedExpenseRecord, userUpdatedBalance)
      }catch(err){

      }
    }

    case "DELETE": {
      try{
        const deletedRecord = await prisma.expense.delete({
          where:{
            id:Number(expenseId)
          }
        })

        const {amount} = deletedRecord

        await prisma.user.update({
          data:{
            balance:{
              increment: amount
            }
          },
          where:{
            id: Number(id)
          },
        })

        return res.status(200).end('Deletion Success')
      }catch(err){
        return handleErrors(res,err)
      }
    }
  }
}

export default expenseRecordEditsAndSearch
