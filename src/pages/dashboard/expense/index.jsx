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
import RecordsSkelton from "../../../components/RecordsSkeleton"

const ExpensePage = () => {

  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: expenseRecords, isLoading, deleteExpenses} = useExpenses()
  const {data: expenseTypes} = useExpenseTypes()

  const filteredData = expenseTypes?.filter(expenseType => expenseType.expenses.length > 0)

  const doughnutData = {
    labels: filteredData?.map(expenseType => expenseType.name),
    datasets: [{
      data: filteredData?.map(expenseType => {
        const amountSum = expenseType.expenses.map(expense => expense.amount)
        return amountSum.reduce((sum, expense) => sum + expense)
      }),
      backgroundColor: filteredData?.map(expenseType => expenseType.typeColor)
    }]
  }

  console.log(expenseRecords)

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="flex h-full">
      <SideNav/>
      {isLoading ? <RecordsSkelton /> :
      <main id="expense-page" className="m-3 w-full">
        <div className="flex balance-detail">
          <div className="flex flex-col balance-section w-3/6 h-80">
            <h1>Current Expense: {data?.expenseBalance}</h1>
            <Button className="mt-20 ms-5 button" onClick={() => setModalShow(true)}>Create Record</Button>
            <ExpenseForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className="w-3/6 h-80 flex justify-center">
            <Doughnut data={doughnutData} height={320} width={320}/>
          </div>
        </div>
        {expenseRecords?.length === 0 ?
          <div className="text-center">
            <h1>No Expense Record!</h1>
          </div>
          :
          <div>
            <Card className="mb-1">
              <Card.Body className="flex flex-row justify-between">
                <div className="card-section">
                  Time
                </div>
                <div className="card-section">
                  Amount
                </div>
                <div className="card-section">
                  Expense Type
                </div>
              </Card.Body>
            </Card>
            <FadeIn>
              {expenseRecords?.map((record,index) => {
                const unformattedTime = record.date.split('T');
                const time = unformattedTime[0].trim();
                return (
                  <Link key={index} href={`/dashboard/expense/${record.id}`}>
                    <Card className="mb-1">
                      <Card.Body className="flex flex-row justify-between">
                        <div className="card-section">
                          {time}
                        </div>
                        <div className="card-section">
                          {record?.amount}
                        </div>
                        <div className="card-section">
                          {record?.expenseTypeName}
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                  )
                }
              )}
            </FadeIn>
          </div>
          }
      </main>
      }
    </div>
  )
}

export default ExpensePage
