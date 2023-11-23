import prisma from "../../../../../helpers/prismaClient.js"
import handleErrors from "../../../../../helpers/handleErrors.js/index.js"

const incomeRecordEditsAndSearch = async (req, res)=> {
  const {method, query: {id, incomeId}, body: {incomeTypeId, amount}} = req

  switch(method){
    case "GET":{
      try{
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
        const updatedIncomeRecord = await prisma.income.update({
          data:{
            incomeTypeId,
            amount
          },
          where:{
            id:Number(incomeId)
          }
        })

        return res.status(200).json(updatedIncomeRecord)
      }catch(err){

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
            balance:{
              decrement: amount
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

export default incomeRecordEditsAndSearch
