import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/Income'

const useIncomes = () => {

  const {push} = useRouter()

  const {data, mutate, error, isLoading} = useSWR(apiURL, fetcher)


  const createIncome = (amount, incomeTypeId) => axios.post(apiURL,
    {
    amount: Number(amount),
    incomeTypeId: Number(incomeTypeId),
    })
    .then((res) =>
      push(`/dashboard/income/${res.data.id}`)
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
