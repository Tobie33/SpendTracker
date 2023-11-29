import useIncomeTypes from "../../hooks/useIncomeTypes";

const SortIncomeTypes = (records) => {

  const incomeTypes = useIncomeTypes()

  for(let i = 0; i < records.length; i++) {
    for(let j = 0; j < incomeTypes.length; j++) {
      if(records[i].incomeTypeId == incomeTypes[j].id) {
        records[i].incomeTypeName = incomeTypes[j].name;
      }
    }
  }
}

export default SortIncomeTypes
