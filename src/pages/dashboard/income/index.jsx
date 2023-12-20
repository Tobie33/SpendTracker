import SideNav from "../../../components/SideNav"
import { useSession } from "next-auth/react"
import useUser from "../../../hooks/useUser"
import { Button } from "react-bootstrap"
import IncomeForm from "../../../components/IncomeForm"
import { useState } from "react"
import useIncomes from "../../../hooks/useIncomes"
import Link from "next/link"
import Card from "react-bootstrap/Card"
import FadeIn from "react-fade-in"
import { Doughnut } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import useIncomeTypes from "../../../hooks/useIncomeTypes"


const IncomePage = () => {

  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: incomeRecords} = useIncomes()
  const {data: incomeTypes} = useIncomeTypes()

  const [modalShow, setModalShow] = useState(false);

  const doughnutData = {
    labels: incomeTypes?.map(incomeType => incomeType.name),
    datasets:[{
      data: incomeTypes?.map(incomeType => incomeType.incomes.length)
    }]
  }

  return (
    <div className="flex h-full">
      <SideNav/>
      <main id="income-page" className="m-3 w-full">
        <div className="flex balance-detail">
          <div className="flex flex-col balance-section w-3/6 h-80">
            <h1>Current Income: {data?.incomeBalance}</h1>
            <Button className="mt-20 ms-5 w-40" onClick={() => setModalShow(true)}>Create Record</Button>
            <IncomeForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div>
            <Doughnut data={doughnutData}/>
          </div>
        </div>
        {incomeRecords?.length === 0 ?
          <div>
            <h1>No Income Record!</h1>
          </div>
          :
          <div>
            <FadeIn>
              {incomeRecords?.map((record,index) => (
                <Link key={index} href={`/dashboard/income/${record.id}`}>
                  <Card className="mb-1">
                    <Card.Body className="flex flex-row justify-between">
                      <div>
                        {record?.id}
                      </div>
                      <div>
                        {record?.amount}
                      </div>
                      <div>
                        {record?.incomeTypeName}
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
                )
              )}
            </FadeIn>
          </div>
          }
      </main>
    </div>
  )
}

export default IncomePage
