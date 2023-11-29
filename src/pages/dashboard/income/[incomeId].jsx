import { useRouter } from "next/router"
import useIncome from "../../../hooks/useIncome"

const IncomePage = () => {

  const incomeRecord = useIncome()

  console.log(incomeRecord)
  return (
    <>
      <h1>{incomeRecord.data?.amount}</h1>
      <h2>{incomeRecord.data?.id}</h2>
    </>
  )

}

export default IncomePage
