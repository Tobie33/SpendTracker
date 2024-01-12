import SideNav from "../../../components/SideNav"
import { useSession } from "next-auth/react"
import useUser from "../../../hooks/useUser"
import IncomeForm from "../../../components/IncomeForm"
import { useState } from "react"
import useIncomes from "../../../hooks/useIncomes"
import { Doughnut } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import useIncomeTypes from "../../../hooks/useIncomeTypes"
import RecordsSkelton from "../../../components/RecordsSkeleton"
import Cards from "../../../components/Cards"
import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"


const IncomesPage = () => {

  const router = useRouter()
  const {data : session, status} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: incomeRecords, isLoading} = useIncomes()
  const {data: incomeTypes} = useIncomeTypes()

  const [modalShow, setModalShow] = useState(false);

  const filteredData = incomeTypes?.filter(incomeType => incomeType.incomes.length > 0)

  const doughnutData = {
    labels: filteredData?.map(incomeType => incomeType.name),
    datasets:[{
      data: filteredData?.map(incomeType => {
        const amountSum = incomeType.incomes.map(income => income.amount)
        return amountSum.reduce((sum, income) => sum + income)
      }),
      backgroundColor: filteredData?.map(incomeType => incomeType.typeColor),
    }]
  }

  if (status === "unauthenticated") {
      router.push('/', data)
  }

  return (
    <div className="flex h-full">
      <SideNav/>
      { isLoading ? <RecordsSkelton /> :
      <main id="income-page" className="m-3 w-full">
        <div className="flex balance-detail">
          <div className="flex flex-col balance-section w-3/6 h-80">
            <h1>Current Income: {data?.incomeBalance}</h1>
            <Button className="mt-20 ms-5 w-40 button" onClick={() => setModalShow(true)}>Create Record</Button>
            <IncomeForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className="w-3/6 h-80 flex justify-center">
            <Doughnut data={doughnutData} height={320} width={320}/>
          </div>
        </div>
        {incomeRecords?.length === 0 ?
          <div className="text-center">
            <h1>No Income Record!</h1>
          </div>
          :
          <Cards records={incomeRecords} type="income"/>
          }
      </main>
      }
    </div>
  )
}

export default IncomesPage
