import  {Button}  from "react-bootstrap"
import { useFormik } from 'formik';

  const onSubmit = () => {
    console.log('submitted')
  }

function EditForm() {

  const {values, handleChange,handleSubmit} = useFormik({
    initialValues: {
      editIncomeType:''
    },
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      <label>Edit name: </label>
      <input
        id="editIncomeType"
        name="editIncomeType"
        type="text"
        onChange={handleChange}
        value={values.editIncomeType}
      />
      <Button type="submit">Enter</Button>
    </form>
  )
}

export default EditForm
