import { createContext, useState } from 'react'

//Creamos el contexto
export const FilterContext = createContext()

//Proveemos el contexto
export const FilterContextProvider = ({ children }) => {
  //Creamos el estado para el filtro
  const [filter, setFilter] = useState({
    query: '',
    sortBy: 'none',
  })

  //Seteamos los valores en el provider
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
