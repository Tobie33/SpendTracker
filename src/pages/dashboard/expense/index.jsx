import SideNav from "../../../components/SideNav"
import { useSession } from "next-auth/react"
import useUser from "../../../hooks/useUser"
import { Button } from "react-bootstrap"
import ExpenseForm from "../../../components/ExpenseForm"
import { useState } from "react"
import useExpenses from "../../../hooks/useExpenses"


const IncomePage = () => {

  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: expenseRecords} = useExpenses()

  const [modalShow, setModalShow] = useState(false);

  return (
    <main id="main-page" className="flex">
      <SideNav/>
    <h1>Expense Page</h1>
    {expenseRecords?.length === 0 ?
      <aside>
        <h1>No Expense Record!</h1>
      </aside>
      :
      <aside>
        {expenseRecords?.map(record => {
          return (
            <div key={record.id}>
              <h3>{record.id}</h3>
              <h3>{record.amount}</h3>
              <h3>{record.expenseTypeName}</h3>
            </div>
          )
        })}
      </aside>
      }
      <Button onClick={() => setModalShow(true)}>Create Record</Button>
      <ExpenseForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </main>
  )
}

export default IncomePage
