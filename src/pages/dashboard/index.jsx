import { useSession } from "next-auth/react"
import useUser from "../../hooks/useUser"
import SideNav from "../../components/SideNav"
import { Button } from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Link from "next/link"
import FadeIn from 'react-fade-in';
import { Doughnut } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import DashboardSkeleton from "../../components/DashboardSkeleton"



const Dashboard = () => {
  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data, isLoading} = useUser(userId)

  const chartData = {
    labels: [
      'Income',
      'Expense'
    ],
    datasets:[{
      data:[
        data?.incomeBalance,
        data?.expenseBalance * -1
      ],
      backgroundColor:[
        '#79ea86',
        '#e75757'
      ]
    }]
  }

  const balance = data?.incomeBalance + data?.expenseBalance



  return (
    <main id="main-page" className="flex">
      <SideNav/>
      {
        isLoading ?
        <DashboardSkeleton />
        :
      <div id="dashboard-page" className="m-3">
        <div className="flex">
          <div id="balance-amount">
            <h1>Balance: {balance}</h1>
          </div>
          <div id="balance-circular" className="h-80 flex justify-center">
            <Doughnut id="dashboard-doughnut" data={chartData} height={320} width={320}/>
          </div>
        </div>
        <div id="income-expense" className="flex my-10">
          <h2 id="income">Income: {data?.incomeBalance }</h2>
          <h2 id="expense">Expense: {data?.expenseBalance}</h2>
        </div>
        <div id="record-cards" className="d-flex gap-x-5">
          {data?.Incomes.length === 0 ?
          <div className="record-cards text-center">
            <h1>No Income Record!</h1>
          </div>
          :
          <div className="record-cards">
          <FadeIn>
            <Card className="mb-1">
              <Card.Body className="flex flex-row justify-between">
                <div className="card-section">
                  ID
                </div>
                <div className="card-section">
                  Amount
                </div>
                <div className="card-section">
                  Income Type
                </div>
              </Card.Body>
            </Card>
            {data?.Incomes.map((record,index) => (
              <Link key={index} href={`/dashboard/income/${record.id}`}>
                <Card className="mb-1">
                  <Card.Body className="flex flex-row justify-between">
                    <div className="card-section">
                      {record?.id}
                    </div>
                    <div className="card-section">
                      {record?.amount}
                    </div>
                    <div className="card-section">
                      {record?.incomeTypeName}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </FadeIn>
          </div>
          }
          {data?.Expense.length === 0 ?
          <div className="record-cards text-center">
            <h1>No Expense Record!</h1>
          </div>
          :
          <div className="record-cards">
            <FadeIn>
              <Card className="mb-1">
                <Card.Body className="flex flex-row justify-between">
                  <div className="card-section">
                    ID
                  </div>
                  <div className="card-section">
                    Amount
                  </div>
                  <div className="card-section">
                    Income Type
                  </div>
                </Card.Body>
              </Card>
              {data?.Expense.map((record,index) => (
                <Link key={index} href={`/dashboard/expense/${record.id}`}>
                  <Card className="mb-1">
                    <Card.Body className="flex flex-row justify-between">
                      <div className="card-section">
                        {record?.id}
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
              ))}
            </FadeIn>
          </div>
          }
        </div>
      </div>
      }
    </main>
  )
}



export default Dashboard
