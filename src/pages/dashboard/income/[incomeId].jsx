import useIncome from "../../../hooks/useIncome"
import { Button } from "react-bootstrap"
import { useState } from "react"
import IncomeEditForm from "../../../components/IncomeEditForm"
import { useRouter } from 'next/router'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RecordSkelton from "../../../components/RecordSkeleton";
import { useSession } from "next-auth/react";

const IncomePage = () => {

  const {status} = useSession()

  if (status === "unauthenticated") {
    router.push('/', data)
  }

  const router = useRouter()
  let incomeId =  router.query.incomeId
  const {data: record, isLoading, deleteIncome} = useIncome(incomeId)

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="m-5">
      <div className="w-full h-32">
        <Link href={'/dashboard/income'} className="reverse-button"><FontAwesomeIcon icon={faArrowLeft} className="me-2"/>Back to Income Page</Link>
      </div>
      {isLoading ? <RecordSkelton/> :
      <>
        <div className="my-10">
          <h3>Amount: {record?.amount}</h3>
          <h3>Income Type: {record?.incomeTypeName}</h3>
        </div>
        <Button className="me-3" onClick={() => setModalShow(true)}>Edit Record</Button>
        <IncomeEditForm
          incomeid={incomeId}
          show={modalShow}
          record={record}
          onHide={() => setModalShow(false)
          }
        />
        <Button className="button" onClick={() => deleteIncome(incomeId)}>Delete Record</Button>
      </>
      }
    </div>
  )

}

export default IncomePage
