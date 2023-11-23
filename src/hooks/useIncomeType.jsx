import { mutate } from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURLForMutation = '/api/IncomeType'
const apiURL = '/api/IncomeType'

const useIncomeType = (id)=> {

  const deleteIncomeType = (id) => axios.delete(`${apiURL}/${id}`)
  .then((res)=> {
    console.log(res)
    mutate(apiURL)
  })
  .catch((err)=> {console.log(err)})

  const editIncomeType = (id, incomeType) => axios.put(`${apiURL}/${id}`,{
    name: incomeType
  })
  .then((res)=> {
    console.log(res)
    mutate(apiURL)
  })
  .catch((err)=> {console.log(err)})

  return {
    deleteIncomeType,
    editIncomeType
  }
}


export default useIncomeType
