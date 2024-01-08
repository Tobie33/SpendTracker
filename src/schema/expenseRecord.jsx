import * as yup from "yup"


export const expenseRecordSchema = yup.object().shape({
  amount: yup.number().positive().integer().required("Please enter an amount"),
  expenseTypeId: yup.mixed().required("Please select an expense type")
})
