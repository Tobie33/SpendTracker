import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Income'


const useIncome = (incomeId) => {

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

  return{
    data,
    mutate,
    error,
    isLoading,
    editIncome
  }
}

export default useIncome
