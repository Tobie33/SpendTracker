import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = url => axios.get(url).then(res => res.data)

const useUser = (id) => {
  const {data, error, isLoading} = useSWR(`/api/User/${id}`, fetcher)

  return {
    data,
    error,
    isLoading
  }
}

export default useUser
