import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App'
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mostrar" element={<App />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
