import { useSession } from "next-auth/react"
import useUser from "../../hooks/useUser"
import SideNav from "../../components/SideNav"



const Dashboard = () => {
  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)

  const balance = data?.incomeBalance + data?.expenseBalance

  return (
    <main id="main-page" className="flex">
      <SideNav/>
      <div id="dashboard-page">
        <h1>Balance: {balance}</h1>
        <h2>Income: {data?.incomeBalance}</h2>
        <h2>Expense: {data?.expenseBalance}</h2>
        {data?.Incomes.length === 0 ?
        <aside>
          <h1>No Income Record!</h1>
        </aside>
        :
        <aside>
          {data?.Incomes.map(record => (
            <div key={record.id}>
              <h3>{record.amount}</h3>
              <h3>{record.incomeType}</h3>
            </div>

          ))}
        </aside>
        }
        {data?.Expense.length === 0 ?
        <aside>
          <h1>No Expense Record!</h1>
        </aside>
        :
        <aside>
          {data?.Expense.map(record => (
            <div key={record.id}>
              <h3>{record.amount}</h3>
              <h3>{record.expenseType}</h3>
            </div>

          ))}
        </aside>
        }
      </div>
    </main>
  )
}



export default Dashboard
