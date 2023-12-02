import useSWR, { mutate } from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const apiURL = '/api/ExpenseType'

const useExpenseTypes = () => {
  const {data, error, isLoading} = useSWR(apiURL, fetcher)

  const createExpenseTypes = (expenseType) => axios.post(apiURL, {
    name: expenseType
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
    createExpenseTypes
  }

}

export default useExpenseTypes
