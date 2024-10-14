import Fonts from './components/Fonts'
import { FilterContextProvider } from './context/FilterContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <FilterContextProvider>
      <Fonts />
      <AppRouter />
    </FilterContextProvider>
  )
}

export default App
