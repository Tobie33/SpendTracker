import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Income'


const useIncome = () => {

  const router = useRouter()
  const {query: {incomeId}} = router


  const {data, mutate, error, isLoading} = useSWR(`${apiURL}/${incomeId}`, fetcher)


  const createIncome = (amount, incomeTypeId, userId) => axios.post(apiURL,
    {
    amount: Number(amount),
    incomeTypeId: Number(incomeTypeId),
    userId
    })
    .then((res) =>
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

export default useIncome
