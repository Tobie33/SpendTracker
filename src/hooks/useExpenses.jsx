import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Expense'


const useExpenses = () => {

  const {data, mutate, error, isLoading} = useSWR(apiURL, fetcher)


  const createExpense = (amount, expenseTypeId, userId) => axios.post(apiURL,
    {
    amount: Number(amount),
    expenseTypeId: Number(expenseTypeId),
    userId
    })
    .then(() =>
      mutate()
      )
    .catch((err) => {
      console.log(err);
  })

  return{
    data,
    mutate,
    error,
    isLoading,
    createExpense
  }
}

export default useExpenses
