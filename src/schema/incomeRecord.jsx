import * as yup from "yup"


export const incomeRecordSchema = yup.object().shape({
  amount: yup.number().positive().integer().required("Please enter an amount"),
  incomeTypeId: yup.mixed().required("Please select an income type")
})
