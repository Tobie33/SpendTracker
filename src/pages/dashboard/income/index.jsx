import SideNav from "../../../components/SideNav"
import { useSession } from "next-auth/react"
import useUser from "../../../hooks/useUser"
import { Button } from "react-bootstrap"
import IncomeForm from "../../../components/IncomeForm"
import { useState } from "react"
import useIncomes from "../../../hooks/useIncomes"


const IncomePage = () => {

  const {data : session} = useSession()
  const userId = session?.user?.id
  const {data} = useUser(userId)
  const {data: incomeRecords} = useIncomes()

  const [modalShow, setModalShow] = useState(false);

  return (
    <main id="main-page" className="flex">
      <SideNav/>
    <h1> Income Page</h1>
    {incomeRecords?.length === 0 ?
      <aside>
        <h1>No Income Record!</h1>
      </aside>
      :
      <aside>
        {incomeRecords?.map(record => {

          return (
            <div key={record.id}>
              <h3>{record.id}</h3>
              <h3>{record.amount}</h3>
              <h3>{record.incomeTypeName}</h3>
            </div>
          )
        })}
      </aside>
      }
      <Button onClick={() => setModalShow(true)}>Create Record</Button>
      <IncomeForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </main>
  )
}

export default IncomePage
