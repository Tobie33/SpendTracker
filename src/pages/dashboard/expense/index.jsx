import SideNav from "../../../components/SideNav"
import { useSession } from "next-auth/react"
import useUser from "../../../hooks/useUser"
import { Button } from "react-bootstrap"
import ExpenseForm from "../../../components/ExpenseForm"
import { useState } from "react"
import useExpenses from "../../../hooks/useExpenses"
import Link from "next/link"
import Card from "react-bootstrap/Card"
import FadeIn from "react-fade-in/lib/FadeIn"
import { Doughnut } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import useExpenseTypes from "../../../hooks/useExpenseTypes"


const ExpensePage = () => {

  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: expenseRecords} = useExpenses()
  const {data: expenseTypes} = useExpenseTypes()

  const doughnutData = {
    labels: expenseTypes?.map(expenseType => expenseType.name),
    datasets:[{
      data: expenseTypes?.map(expenseType => expenseType.expenses.length)
    }]
  }

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="flex h-full">
      <SideNav/>
      <main id="expense-page" className="m-3">
        <div className="flex balance-detail">
          <div className="flex flex-col balance-section">
            <h1>Current Expense: {data?.expenseBalance}</h1>
            <Button className="mt-20 ms-5" onClick={() => setModalShow(true)}>Create Record</Button>
            <ExpenseForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div>
            <Doughnut data={doughnutData}/>
          </div>
        </div>
        {expenseRecords?.length === 0 ?
          <div>
            <h1>No Expense Record!</h1>
          </div>
          :
          <div>
            <FadeIn>
              {expenseRecords?.map((record,index) => (
                <Link key={index} href={`/dashboard/expense/${record.id}`}>
                  <Card className="mb-1">
                    <Card.Body className="flex flex-row justify-between">
                      <div>
                        {record?.id}
                      </div>
                      <div>
                        {record?.amount}
                      </div>
                      <div>
                        {record?.expenseTypeName}
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

export default ExpensePage
