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
import Cards from "../../components/Cards"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const {data : session, status} = useSession()
  const userId = session?.user?.id
  const {data, isLoading} = useUser(userId)
  const router = useRouter()

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

  if (status === "unauthenticated") {
      router.push('/', data)
  }

  return (
    <main id="main-page" className="flex w-full">
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
            <Cards records={data?.Incomes} type="income" mainPage={true}/>
            }
            {data?.Expense.length === 0 ?
            <div className="record-cards text-center">
              <h1>No Expense Record!</h1>
            </div>
            :
            <Cards records={data?.Expense} type="expense" mainPage={true}/>
            }
          </div>
        </div>
        }
    </main>
  )
}

export default Dashboard
