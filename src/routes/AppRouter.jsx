import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App'
import { PracticaArbolAVL } from '../pages/practice/PracticaArbolAVL'
import { PracticaArbolBST } from '../pages/practice/PracticaArbolBST'
import { PracticaArbolRojoNegro } from '../pages/practice/PracticaArbolRojoNegro'
import { PracticaArbolB } from '../pages/practice/PracticaArbolB'
import { CreateTreeLayout } from '../components/CreateTreeLayout'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mostrar" element={<App />} />

        {/* Rutas para página de inico de práctica */}
        <Route path="/practicar-BST" element={<PracticaArbolBST />} />
        <Route path="/practicar-B" element={<PracticaArbolB />} />
        <Route path="/practicar-AVL" element={<PracticaArbolAVL />} />
        <Route
          path="/practicar-Rojo-Negro"
          element={<PracticaArbolRojoNegro />}
        />

        {/*Rutas para adición*/}
        <Route
          path="/crear-BST"
          element={
            <CreateTreeLayout title={'Árbol BST'} containerColor={'#7e22ce'} />
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRouter
