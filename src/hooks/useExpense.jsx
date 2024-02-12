import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Expense'


const useExpense = (expenseId) => {

  const {push} = useRouter()

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

  const deleteExpense = (expenseId) => axios.delete(expenseId ? `${apiURL}/${expenseId}` : null)
  .then(()=>{
    mutate('/api/Expense')
    push('/dashboard/expense')
  })
  .catch(err => {
    console.error(err)
  })

  return{
    data,
    mutate,
    error,
    isLoading,
    editExpense,
    deleteExpense
  }
}

export default useExpense
