import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { PracticaArbolAVL } from '../pages/practice/PracticaArbolAVL'
import { PracticaArbolBST } from '../pages/practice/PracticaArbolBST'
import { PracticaArbolRojoNegro } from '../pages/practice/PracticaArbolRojoNegro'
import { PracticaArbolB } from '../pages/practice/PracticaArbolB'
import { ConceptosBST } from '../pages/concepts/ConceptosBST'
import PruebaRN from './PruebaRN.jsx'
import { ConceptosRedBlackTree } from '../pages/concepts/ConceptosRedBlackTree.jsx'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rutas para página de inico de práctica */}
        <Route path="/practicar-BST" element={<PracticaArbolBST />} />
        <Route path="/practicar-B" element={<PracticaArbolB />} />
        <Route path="/practicar-AVL" element={<PracticaArbolAVL />} />
        <Route
          path="/practicar-Rojo-Negro"
          element={<PracticaArbolRojoNegro />}
        />
        <Route path="/prueba-RN" element={<PruebaRN />} />

        {/* Rutas para conceptos */}
        <Route path="/conceptos-BST" element={<ConceptosBST />} />
        <Route path="/conceptos-RBT" element={<ConceptosRedBlackTree />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
