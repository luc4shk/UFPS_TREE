import { Toaster } from 'react-hot-toast'
import { FilterContextProvider } from './context/FilterContext'
import { StepsContextProvider } from './context/StepsContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <FilterContextProvider>
      <StepsContextProvider>
        <AppRouter />
        <Toaster />
      </StepsContextProvider>
    </FilterContextProvider>
  )
}

export default App
