import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik';
import useIncomeTypes from '../hooks/useIncomeTypes';
import useIncomes from '../hooks/useIncomes';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr'
import { incomeRecordSchema } from '../schema/incomeRecord';
import { FALSE } from 'sass';



const IncomeForm = (props) => {

  const { mutate } = useSWRConfig()
  const {data: incomeTypes} = useIncomeTypes()
  const {createIncome} = useIncomes()
  const {data : session} = useSession()
  const userId = session?.user?.id

  const onSubmit = (e) => {
    createIncome(e.amount, e.incomeTypeId, userId)
    mutate('/api/Income')
  }


  const {values, errors, handleBlur, touched, handleChange,handleSubmit} = useFormik({
    initialValues: {
      amount: '',
      incomeTypeId: ''
    },
    validationSchema: incomeRecordSchema,
    onSubmit
  });

  console.log(errors)

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
              onBlur={handleBlur}
            />
            {errors.amount && touched.amount && <Form.Label>{errors.amount}</Form.Label>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Income Type</Form.Label>
            <Form.Select
              onChange={handleChange}
              id="incomeTypeId"
              name="incomeTypeId"
              onBlur={handleBlur}
            >
              <option value={''}>Please select an income type</option>
              {incomeTypes?.map((incomeType, index) => (
                <option key={index} value={incomeType.id}>{incomeType.name}</option>
              ))}
            </Form.Select>
            {errors.incomeTypeId && touched.incomeTypeId && <Form.Label>{errors.incomeTypeId}</Form.Label>}
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

export default IncomeForm
