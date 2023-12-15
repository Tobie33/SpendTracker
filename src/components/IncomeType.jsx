import useIncomeTypes  from "../hooks/useIncomeTypes"
import  {Button}  from "react-bootstrap"
import { useFormik } from 'formik';
import useIncomeType from "../hooks/useIncomeType";
import { mutate } from "swr";
import EditForm from "./IncomeEditForm";

const IncomeType = () => {
  const {data, error, isLoading, createIncomeTypes} = useIncomeTypes()


  const {deleteIncomeType, editIncomeType} = useIncomeType()

  const onSubmit = (e) => {
    createIncomeTypes(e.incomeType)
    mutate()
  }

  const {values, handleChange,handleSubmit} = useFormik({
    initialValues: {
      incomeType: ''
    },
    onSubmit,
  });

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
    return (
    <div>
      {data.map((type,index) => {

        console.log(type.id)

        return (
          <>
            <h3 key={index}>{type.name}</h3>
            <Button type="submit" onClick={()=> deleteIncomeType(type.id)}>Delete</Button>
          </>
        )
      })}
      <form onSubmit={handleSubmit}>
        <label>New Income Type name: </label>
        <input
          id="incomeType"
          name="incomeType"
          type="text"
          onChange={handleChange}
          value={values.incomeType}
        />
        <Button type="submit">Enter</Button>
      </form>
      <EditForm/>
    </div>

  )


}
