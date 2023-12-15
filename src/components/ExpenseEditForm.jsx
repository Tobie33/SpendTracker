import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useExpenseTypes from '../hooks/useExpenseTypes';
import useExpense from '../hooks/useExpense';
import { useSWRConfig } from 'swr'



const ExpenseEditForm = (props) => {

  const { mutate } = useSWRConfig()
  const {data: expenseTypes, error, isLoading} = useExpenseTypes()
  const {editExpense} = useExpense()

  const onSubmit = (e) => {
    console.log(e)
    editExpense(e.amount, e.expenseTypeId, props.expenseid)
    mutate(`/api/Expense/${props.expenseid}`)
  }

  const {values, handleChange,handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: props.record?.amount,
      expenseTypeId: props.record?.expenseTypeId
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
            <Form.Select value={values.expenseTypeId} onChange={handleChange} id="expenseTypeId" name="expenseTypeId">
              {expenseTypes?.map((expenseType, index) =>(
                <option key={index} value={expenseType.id}>{expenseType.name}</option>
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

export default ExpenseEditForm
