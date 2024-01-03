import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Expense'

const useExpenses = () => {

  const {push} = useRouter()

  const {data, mutate, error, isLoading} = useSWR(apiURL, fetcher)


  const createExpense = (amount, expenseTypeId) => axios.post(apiURL,
    {
    amount: Number(amount),
    expenseTypeId: Number(expenseTypeId),
    })
    .then((res) =>
      push(`/dashboard/expense/${res.data.id}`)
    )
    .catch((err) => {
      console.log(err);
  })

  const deleteExpenses = () => axios.delete(apiURL)
  .then(() =>{
    mutate()
  })
  .catch((err) => {
    console.log(err)
  })


  return{
    data,
    mutate,
    error,
    isLoading,
    createExpense,
    deleteExpenses
  }
}

export default useExpenses
