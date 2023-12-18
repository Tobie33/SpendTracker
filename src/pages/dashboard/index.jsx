import { useSession } from "next-auth/react"
import useUser from "../../hooks/useUser"
import SideNav from "../../components/SideNav"
import { Button } from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Link from "next/link"
import FadeIn from 'react-fade-in';



const Dashboard = () => {
  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)

  const balance = data?.incomeBalance + data?.expenseBalance

  return (
    <main id="main-page" className="flex">
      <SideNav/>
      <div id="dashboard-page" className="m-3">
        <div id="balance" className="flex">
          <h1 id="balance-amount">Balance: {balance}</h1>
          <h1 id="balance-circular">Circular thingy</h1>
        </div>
        <div id="income-expense" className="flex">
          <h2 id="income">Income: {data?.incomeBalance}</h2>
          <h2 id="expense">Expense: {data?.expenseBalance}</h2>
        </div>
        <div id="record-cards" className="d-flex gap-x-5">
          {data?.Incomes.length === 0 ?
          <div>
            <h1>No Income Record!</h1>
          </div>
          :
          <div className="record-cards">
          <FadeIn>
            {data?.Incomes.map((record,index) => (
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
            ))}
          </FadeIn>
          </div>
          }
          {data?.Expense.length === 0 ?
          <div>
            <h1>No Expense Record!</h1>
            <Button></Button>
          </div>
          :
          <div className="record-cards">
            <FadeIn>
              {data?.Expense.map((record,index) => (
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
              ))}
            </FadeIn>
          </div>
          }
        </div>
      </div>
    </main>
  )
}



export default Dashboard
