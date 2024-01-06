import Link from "next/link"
import Card from "react-bootstrap/Card"
import FadeIn from "react-fade-in"
import { Button } from "react-bootstrap"
import { useState } from "react"


const Cards = ({records}) => {

  const [recordsss, setRecordsss] = useState(records)
  const [ascend, setAscend] = useState(true)

  const filteredCards = (category) => {

    switch(category){
      case 'incomeTypeName':
      if(ascend){
        setRecordsss([...recordsss].sort((a, b) => a.incomeTypeName.localeCompare(b.incomeTypeName)));
        setAscend(currentStatus => !currentStatus)
      } else {
        setRecordsss([...recordsss].sort((a,b) => b.incomeTypeName.localeCompare(a.incomeTypeName)));
        setAscend(currentStatus => !currentStatus)
      }
      break;

      case 'amount' :
      if(ascend){
        setRecordsss([...recordsss].sort((a,b) => a[category] - b[category]));
        setAscend(currentStatus => !currentStatus)
      } else {
        setRecordsss([...recordsss].sort((a,b) => b[category] - a[category]));
        setAscend(currentStatus => !currentStatus)
      }
      break;

      case 'date' :
      if(ascend){
        setRecordsss([...recordsss].sort((a,b) => new Date(a.date) - new Date(b.date)));
        setAscend(currentStatus => !currentStatus)
      } else {
        setRecordsss([...recordsss].sort((a,b) => new Date(b.date) - new Date(a.date)));
        setAscend(currentStatus => !currentStatus)
      }
      break;
    }
  }


  return (
    <div className="mt-3">
      <Card className="mb-1">
        <Card.Body className="flex flex-row justify-between">
          <div className="card-section">
            <Button onClick={() => filteredCards(`date`)}>Time</Button>
          </div>
          <div className="card-section">
            <Button onClick={() => filteredCards(`amount`)}>Amount</Button>
          </div>
          <div className="card-section">
            <Button onClick={() => filteredCards(`incomeTypeName`)}>Income Type</Button>
          </div>
        </Card.Body>
      </Card>
      <FadeIn>
        {recordsss?.map((record,index) => {
          const unformattedTime = record.date.split('T');
          const time = unformattedTime[0].trim();
          return (
            <Link key={index} href={`/dashboard/income/${record.id}`}>
              <Card className="mb-1">
                <Card.Body className="flex flex-row justify-between">
                  <div className="card-section">
                    {time}
                  </div>
                  <div className="card-section">
                    {record?.amount}
                  </div>
                  <div className="card-section">
                    {record?.incomeTypeName}
                  </div>
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
