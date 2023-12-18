import useIncome from "../../../hooks/useIncome"
import { Button } from "react-bootstrap"
import { useState } from "react"
import IncomeEditForm from "../../../components/IncomeEditForm"
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'
import Link from "next/link";

const IncomePage = () => {


  const router = useRouter()
  let incomeId =  router.query.incomeId
  const {data: record} = useIncome(incomeId)

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="m-5">
      <div className="w-full h-32">
        <Link href={'/dashboard/income'}>Back to Income Page</Link>
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
            {record?.incomeTypeName}
          </div>
        </Card.Body>
      </Card>
      <Button onClick={() => setModalShow(true)}>Edit Record</Button>
      <IncomeEditForm
        incomeid={incomeId}
        show={modalShow}
        record={record}
        onHide={() => setModalShow(false)
        }
      />
    </div>
  )

}

export default IncomePage
