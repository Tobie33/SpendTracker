import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth].js"

const expenseRecord = async (req, res) => {

  const session = await getServerSession(req, res, authOptions)

  const {method, body: {expenseTypeId, amount}} = req

  switch(method){
    case 'GET': {
      try{
        const allExpenseRecords = await prisma.expense.findMany({
          where:{
            userId:session.user.id
          }
        })

        return res.status(200).json(allExpenseRecords)
      }catch(err){
        handleErrors(res,err)
      }
    }

    case 'POST': {

      try{
        const selectedExpenseType = await prisma.expenseType.findUnique({
          where:{
            id: expenseTypeId
          }
        })

        console.log(selectedExpenseType)

        const expenseTypeName = selectedExpenseType.name


        const createExpenseRecord = await prisma.expense.create({
          data:{
            expenseTypeId,
            expenseTypeName,
            userId: session.user.id,
            amount
          }
        })

        const userUpdatedBalance = await prisma.user.update({
          data:{
            expenseBalance:{
              decrement: amount
            }
          },
          where:{
            id: session.user.id
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
