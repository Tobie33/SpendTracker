import prisma from "../../../helpers/prismaClient.js"
import handleErrors from "../../../helpers/handleErrors.js"


const createAndGetUsers = async (req, res) => {

  const {method, body: {name}} = req

  switch(method){

    case "GET": {
      try{
        const allUsers = await prisma.user.findMany()

        return res.status(200).json(allUsers)
      } catch (err){
        return handleErrors(res,err)
      }
    }

    case "POST":{
      try{
          const newUser = await prisma.user.create({
            data: {
              name
            },
          })

          return res.status(201).json(newUser)
        } catch (err){
          return handleErrors(res, err)
        }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end('Unauthorized')
    }
}

export default createAndGetUsers
