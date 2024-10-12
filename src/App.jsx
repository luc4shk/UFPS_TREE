import { FilterContextProvider } from './context/FilterContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <FilterContextProvider>
      <AppRouter />
    </FilterContextProvider>
  )
}

export default App
