import { useState } from 'react'

const useQuerys = () => {
  const [values, setValues] = useState({})

  return {
    values,
    setValues,
  }
}

export default useQuerys
