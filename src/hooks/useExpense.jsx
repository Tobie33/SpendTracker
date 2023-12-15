import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Expense'


const useExpense = (expenseId) => {

  const {data, mutate, error, isLoading} = useSWR(expenseId ? `${apiURL}/${expenseId}` : null, fetcher)

  const editExpense = (amount, expenseTypeId, expenseId) => axios.put(expenseId ? `${apiURL}/${expenseId}` : null,{
    amount: Number(amount),
    expenseTypeId
  })
  .then((res)=>{
    console.log(res)
    mutate(`${apiURL}/${expenseId}`)
  })
  .catch((err) => {
    console.log(err)
  })

  return{
    data,
    mutate,
    error,
    isLoading,
    editExpense
  }
}

export default useExpense
