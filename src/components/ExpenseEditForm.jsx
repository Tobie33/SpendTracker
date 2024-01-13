import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useExpenseTypes from '../hooks/useExpenseTypes';
import useExpense from '../hooks/useExpense';
import { useSWRConfig } from 'swr'
import { expenseRecordSchema } from '../schema/expenseRecord';



const ExpenseEditForm = (props) => {

  const { mutate } = useSWRConfig()
  const {data: expenseTypes, error, isLoading} = useExpenseTypes()
  const {editExpense} = useExpense()

  const onSubmit = (e) => {
    console.log(e)
    editExpense(e.amount, e.expenseTypeId, props.expenseid)
    mutate(`/api/Expense/${props.expenseid}`)
  }

  const {values, errors, handleBlur, touched, handleChange,handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: props.record?.amount,
      expenseTypeId: props.record?.expenseTypeId
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
              onBlur={handleBlur}
              value={values.amount}
              className={errors.amount && touched.amount && 'error'}
            />
            {errors.amount && touched.amount && <Form.Label className='error-label ms-1'>{errors.amount}</Form.Label>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select
              value={values.expenseTypeId}
              onChange={handleChange}
              id="expenseTypeId"
              name="expenseTypeId"
              onBlur={handleBlur}
              className={errors.expenseTypeId && touched.expenseTypeId && 'error'}
            >
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

export default ExpenseEditForm
