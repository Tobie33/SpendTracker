import useExpense from "../../../hooks/useExpense"
import { Button } from "react-bootstrap"
import { useState } from "react"
import ExpenseEditForm from "../../../components/ExpenseEditForm"
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'
import Link from "next/link";


const IncomePage = () => {

  const router = useRouter()
  let expenseId =  router.query.expenseId
  const {data: record, deleteExpense} = useExpense(expenseId)

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="m-5">
      <div className="w-full h-32">
        <Link href={'/dashboard/expense'}>Back to Expense Page</Link>
      </div>
      <Card >
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
      <Button onClick={() => setModalShow(true)}>Edit Record</Button>
      <ExpenseEditForm
        expenseid={expenseId}
        show={modalShow}
        record={record}
        onHide={() => setModalShow(false)
        }
      />
      <Button onClick={() => deleteExpense(expenseId)}>Delete Record</Button>
    </div>
  )

}

export default IncomePage
