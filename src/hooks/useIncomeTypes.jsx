import useSWR, { mutate } from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/IncomeType'

const useIncomeTypes = () => {
  const {data, error, isLoading} = useSWR(apiURL, fetcher)

  const createIncomeTypes = (incomeType) => axios.post(apiURL, {
    name: incomeType
  })
  .then((res) => {
    console.log(res);
    mutate(apiURL)
    })
  .catch((err) => {
    console.log(err);
  })

  return {
    data,
    error,
    isLoading,
    createIncomeTypes
  }

}

export default useIncomeTypes
