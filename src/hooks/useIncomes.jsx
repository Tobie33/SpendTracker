import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Income'


const useIncomes = () => {

  const {data, mutate, error, isLoading} = useSWR(apiURL, fetcher)


  const createIncome = (amount, incomeTypeId, userId) => axios.post(apiURL,
    {
    amount: Number(amount),
    incomeTypeId: Number(incomeTypeId),
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
    createIncome
  }
}

export default useIncomes
