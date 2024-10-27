import { createContext, useState } from 'react'

//Creamos el contexto
export const StepsContext = createContext()

export const StepsContextProvider = ({ children }) => {
  const [steps, setSteps] = useState([]) // Objeto para almacenar las posiciones de los nodos
  const [positions, setPositions] = useState({}) // Objeto para almacenar las posiciones de los nodos
  return (
    <StepsContext.Provider value={{ steps, setSteps, positions, setPositions }}>
      {children}
    </StepsContext.Provider>
  )
}
