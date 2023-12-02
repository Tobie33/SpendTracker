import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useIncomeTypes from '../hooks/useIncomeTypes';
import useIncome from '../hooks/useIncomes';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr'



const IncomeForm = (props) => {

  const { mutate } = useSWRConfig()
  const {data: incomeTypes, error, isLoading} = useIncomeTypes()
  const {createIncome} = useIncome()
  const {data : session} = useSession()
  const userId = session?.user?.id

  const onSubmit = (e) => {
    createIncome(e.amount, e.incomeTypeId, userId)
    mutate('/api/Income')
  }


  const {values, handleChange,handleSubmit} = useFormik({
    initialValues: {
      amount: '',
      incomeTypeId: ''
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
          Create a Record
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
            <Form.Select onChange={handleChange} id="incomeTypeId" name="incomeTypeId">
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

export default IncomeForm
