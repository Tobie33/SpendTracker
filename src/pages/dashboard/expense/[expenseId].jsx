import useExpense from "../../../hooks/useExpense"
import { Button } from "react-bootstrap"
import { useState } from "react"
import ExpenseEditForm from "../../../components/ExpenseEditForm"
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RecordSkelton from "../../../components/RecordSkeleton";


const ExpensePage = () => {

  const {status} = useSession()

  if (status === "unauthenticated") {
    router.push('/', data)
  }

  const router = useRouter()
  let expenseId =  router.query.expenseId
  const {data: record, isLoading, deleteExpense} = useExpense(expenseId)

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="m-5">
      <div className="w-full h-32">
        <Link href={'/dashboard/expense'} className="reverse-button"><FontAwesomeIcon icon={faArrowLeft} className="me-2"/>Back to Expense Page</Link>
      </div>
      {isLoading ? <RecordSkelton /> :
      <>
        <div className="my-10">
          <h3>Amount: {record?.amount}</h3>
          <h3>Expense Type: {record?.expenseTypeName}</h3>
        </div>
        <Button className="me-3" onClick={() => setModalShow(true)}>Edit Record</Button>
        <ExpenseEditForm
          expenseid={expenseId}
          show={modalShow}
          record={record}
          onHide={() => setModalShow(false)
          }
        />
        <Button className="button" onClick={() => deleteExpense(expenseId)}>Delete Record</Button>
      </>
      }
    </div>
  )

}

export default ExpensePage
