import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Income'


const useIncome = (incomeId) => {

  console.log(incomeId)

  const {push} = useRouter()

  const {data, mutate, error, isLoading} = useSWR(incomeId ? `${apiURL}/${incomeId}` : null, fetcher)

  const editIncome = (amount, incomeTypeId, incomeId) => axios.put(incomeId ? `${apiURL}/${incomeId}` : null,{
    amount: Number(amount),
    incomeTypeId
  })
  .then((res)=>{
    console.log(res)
    mutate(`${apiURL}/${incomeId}`)
  })
  .catch((err) => {
    console.log(err)
  })

  const deleteIncome = (incomeId) => axios.delete(incomeId ? `${apiURL}/${incomeId}` : null)
  .then(()=>{
    push('/dashboard/income')
    mutate(`${apiURL}/${incomeId}`)
  })
  .catch((err)=>{
    console.log(err)
  })

  return{
    data,
    mutate,
    error,
    isLoading,
    editIncome,
    deleteIncome
  }
}

export default useIncome
