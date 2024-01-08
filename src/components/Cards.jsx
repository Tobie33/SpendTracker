import Link from "next/link"
import Card from "react-bootstrap/Card"
import FadeIn from "react-fade-in"
import { Button } from "react-bootstrap"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

const Cards = ({records , type, mainPage}) => {

  console.log(type)

  const [cardRecords, setCardRecords] = useState(records)
  const [TypeAscend, setTypeAscend] = useState(true)
  const [amountAscend, setAmountAscend] = useState(true)
  const [dateAscend, setDateAscend] = useState(true)

  const filteredCards = (category) => {

    switch(category){
      case 'incomeTypeName':
      if(TypeAscend){
        setCardRecords([...cardRecords].sort((a, b) => a.incomeTypeName.localeCompare(b.incomeTypeName)));
        setTypeAscend(currentStatus => !currentStatus)
      } else {
        setCardRecords([...cardRecords].sort((a,b) => b.incomeTypeName.localeCompare(a.incomeTypeName)));
        setTypeAscend(currentStatus => !currentStatus)
      }
      break;

      case 'expenseTypeName':
      if(TypeAscend){
        setCardRecords([...cardRecords].sort((a, b) => a.expenseTypeName.localeCompare(b.expenseTypeName)));
        setTypeAscend(currentStatus => !currentStatus)
      } else {
        setCardRecords([...cardRecords].sort((a,b) => b.expenseTypeName.localeCompare(a.expenseTypeName)));
        setTypeAscend(currentStatus => !currentStatus)
      }
      break;

      case 'amount' :
      if(amountAscend){
        setCardRecords([...cardRecords].sort((a,b) => a[category] - b[category]));
        setAmountAscend(currentStatus => !currentStatus)
      } else {
        setCardRecords([...cardRecords].sort((a,b) => b[category] - a[category]));
        setAmountAscend(currentStatus => !currentStatus)
      }
      break;

      case 'date' :
      if(dateAscend){
        setCardRecords([...cardRecords].sort((a,b) => new Date(a.date) - new Date(b.date)));
        setDateAscend(currentStatus => !currentStatus)
      } else {
        setCardRecords([...cardRecords].sort((a,b) => new Date(b.date) - new Date(a.date)));
        setDateAscend(currentStatus => !currentStatus)
      }
      break;
    }
  }


  return (
    <div className={mainPage ? "record-cards" : "mt-3"}>
      <Card className="mb-1">
        <Card.Body className="flex flex-row justify-between">
          <div className="card-section">
            <Button variant="none" className="card-buttons btn-none" onClick={() => filteredCards(`date`)}>Time{dateAscend ? <FontAwesomeIcon className="ms-1" icon={faCaretUp} size="xs" /> : <FontAwesomeIcon className="ms-1" icon={faCaretDown} size="xs" />}</Button>
          </div>
          <div className="card-section">
            <Button variant="none" className="card-buttons btn-none" onClick={() => filteredCards(`amount`)}>Amount{amountAscend ? <FontAwesomeIcon className="ms-1" icon={faCaretDown} size="xs" /> : <FontAwesomeIcon className="ms-1" icon={faCaretUp} size="xs" />}</Button>
          </div>
          <div className="card-section">
          {type === 'income' ?
            <Button variant="none" className="card-buttons btn-none" onClick={() => filteredCards(`incomeTypeName`)}>Income Type{TypeAscend ? <FontAwesomeIcon className="ms-1" icon={faCaretDown} size="xs" /> : <FontAwesomeIcon className="ms-1" icon={faCaretUp} size="xs" />}</Button>
            :
            <Button variant="none" className="card-buttons btn-none" onClick={() => filteredCards(`expenseTypeName`)}>Expense Type{TypeAscend ? <FontAwesomeIcon className="ms-1" icon={faCaretDown} size="xs" /> : <FontAwesomeIcon className="ms-1" icon={faCaretUp} size="xs" />}</Button>
          }
          </div>
        </Card.Body>
      </Card>
      <FadeIn>
        {cardRecords?.map((record,index) => {
          const unformattedTime = record.date.split('T');
          const time = unformattedTime[0].trim();
          return (
            <Link key={index} href={type === "income" ? `/dashboard/income/${record.id}` : `/dashboard/expense/${record.id}`}>
              <Card className="mb-1">
                <Card.Body className="flex flex-row justify-between">
                  <div className="card-section">
                    {time}
                  </div>
                  <div className="card-section">
                    {record?.amount}
                  </div>
                  {type === 'income' ?
                  <div className="card-section">
                    {record?.incomeTypeName}
                  </div>
                  :
                  <div className="card-section">
                    {record?.expenseTypeName}
                  </div>
                  }
                </Card.Body>
              </Card>
            </Link>
            )
          }
        )}
      </FadeIn>
    </div>
  )
}

export default Cards
