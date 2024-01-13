import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useExpenseTypes from '../hooks/useExpenseTypes';
import useExpenses from '../hooks/useExpenses';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr'
import { expenseRecordSchema } from '../schema/expenseRecord';



const ExpenseForm = (props) => {

  const {data: expenseTypes, error, isLoading} = useExpenseTypes()
  const {createExpense} = useExpenses()
  const {data : session} = useSession()
  const userId = session?.user?.id

  const onSubmit = (e) => {
    createExpense(e.amount, e.expenseTypeId, userId)
    mutate('/api/Expense')
  }


  const {values, errors, handleBlur, touched, handleChange,handleSubmit} = useFormik({
    initialValues: {
      amount: '',
      expenseTypeId: ''
    },
    validationSchema: expenseRecordSchema,
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
              onBlur={handleBlur}
              value={values.amount}
              className={errors.amount && touched.amount && 'error'}
            />
            {errors.amount && touched.amount && <Form.Label className='error-label ms-1'>{errors.amount}</Form.Label>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select
              onChange={handleChange}
              id="expenseTypeId"
              name="expenseTypeId"
              onBlur={handleBlur}
              className={errors.expenseTypeId && touched.expenseTypeId && 'error'}
            >
            <option value={''} disabled selected>Please select an expense type</option>
              {expenseTypes?.map((expenseType, index) =>(
                <option key={index} value={expenseType.id}>{expenseType.name}</option>
              ))}
            </Form.Select>
            {errors.expenseTypeId && touched.expenseTypeId && <Form.Label className='error-label ms-1'>{errors.expenseTypeId}</Form.Label>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={props.onHide}
            disabled={Object.keys(errors).length === 0 ? false : true }
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ExpenseForm
