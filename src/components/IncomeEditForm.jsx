import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useIncomeTypes from '../hooks/useIncomeTypes';
import useIncome from '../hooks/useIncome';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr'



const IncomeEditForm = (props) => {

  const { mutate } = useSWRConfig()
  const {data: incomeTypes, error, isLoading} = useIncomeTypes()
  const {editIncome} = useIncome()

  const onSubmit = (e) => {
    console.log(e)
    editIncome(e.amount, e.incomeTypeId, props.incomeid)
    mutate(`/api/Income/${props.incomeid}`)
  }

  const {values, handleChange,handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: props.record?.amount,
      incomeTypeId: props.record?.incomeTypeId
    },
    onSubmit
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Record
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="10"
              id="amount"
              name="amount"
              onChange={handleChange}
              value={values.amount}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> select menu</Form.Label>
            <Form.Select value={values.incomeTypeId} onChange={handleChange} id="incomeTypeId" name="incomeTypeId">
              {incomeTypes?.map((incomeType, index) =>(
                <option key={index} value={incomeType.id}>{incomeType.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={props.onHide}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default IncomeEditForm