import { useState, useEffect } from 'react'
import { LayoutTree } from '../../components/LayoutTree'
import { ArbolBinarioBusqueda } from '../../estructuras/arboles/ArbolBinarioBusqueda'
import { NodoBinario } from '../../estructuras/nodos/NodoBinario'
import { motion } from 'framer-motion'
import TreeRender from '../../components/TreeRender'

export const PracticaArbolBST = () => {
  const [arbolBST, setArbolBST] = useState(new ArbolBinarioBusqueda())
  const [raiz, setRaiz] = useState(arbolBST.getRaiz() || null)
  console.log(raiz)
  useEffect(() => {
    const nodo = JSON.parse(window.localStorage.getItem('arbol'))?.raiz || null
    if (nodo) {
      const crearNodo = (data) => {
        if (!data) return null
        return new NodoBinario(
          data.info,
          crearNodo(data.izq),
          crearNodo(data.der)
        )
      }

      const nuevoNodo = crearNodo(nodo)
      const nuevoArbol = new ArbolBinarioBusqueda(nuevoNodo)
      setArbolBST(nuevoArbol)
      setRaiz(nuevoArbol.getRaiz())
    }
  }, [])

  const TreeNode = ({ node, x, y, level }) => {
    if (!node) return null

    const baseOffset = 300
    const offset = baseOffset / Math.pow(1.9, level) // Ajuste del espaciado
    const levelSpacing = 100 // Espaciado entre niveles
    const newY = y + levelSpacing // Altura del nodo
    //const newY = y + 50 // Altura del nodo
    const radius = 10 // Radio del círculo
    const textOffset = 5 // Ajuste para centrar el texto verticalmente

    return (
      <>
        {/* Círculo */}
        <motion.circle
          cx={x}
          cy={y}
          r={radius} // Radio del círculo
          stroke="black" // Color del borde del círculo
          strokeWidth="2" // Grosor del borde
          fill="none" // Sin relleno
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Texto centrado dentro del círculo */}
        <motion.text
          style={{
            userSelect: 'none',
            fontWeight: 'bold',
            fontSize: '14px', // Tamaño del texto
          }}
          x={x}
          y={y + textOffset} // Alineamos el texto verticalmente dentro del círculo
          textAnchor="middle" // Centrado horizontalmente
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          drag
          dragConstraints
        >
          {node.info}
        </motion.text>

        {/* Líneas hacia los nodos hijo */}
        {node.izq && (
          <motion.line
            x1={x}
            y1={y + radius} // Punto de inicio en el borde inferior del círculo
            x2={x - offset / 2}
            y2={newY - radius} // Punto de llegada en el borde superior del nodo hijo
            stroke="#000"
            strokeWidth="3"
          />
        )}
        {node.der && (
          <motion.line
            x1={x}
            y1={y + radius} // Punto de inicio en el borde inferior del círculo
            x2={x + offset / 2}
            y2={newY - radius} // Punto de llegada en el borde superior del nodo hijo
            stroke="#000"
            strokeWidth="3"
          />
        )}

        {/* Recursión para los nodos hijo */}
        <TreeNode
          node={node.izq}
          x={x - offset / 2}
          y={newY}
          level={level + 1}
        />
        <TreeNode
          node={node.der}
          x={x + offset / 2}
          y={newY}
          level={level + 1}
        />
      </>
    )
  }

  const TreeView = ({ data }) => {
    return (
      <motion.svg
        width="700px"
        height="600px"
        initial="hidden"
        animate="visible"
        viewBox="0 0 700 700"
      >
        <TreeNode node={data} x={350} y={20} level={1} />
      </motion.svg>
    )
  }

  const handleInsertar = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.insertar(query)
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
  }

  const handleEliminar = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.eliminarNodo(Number(query))
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
  }

  const vaciarArbol = () => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.vaciarArbol()
    setArbolBST(nuevoArbol)
    setRaiz(null)
    window.localStorage.removeItem('arbol')
  }

  return (
    <LayoutTree
      title={'Árbol BST'}
      containerColor={'#7e22ce'}
      linkColor={'#7e22ce'}
    >
      <div className="absolute">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            const query = data.get('query')
            handleInsertar(query)
          }}
        >
          <input type="text" name="query" />
          <button>Añadir</button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            const query = data.get('query')
            handleEliminar(query)
          }}
        >
          <input type="number" name="query" />
          <button>Eliminar</button>
        </form>
        <button onClick={vaciarArbol}>Eliminar Arbol</button>
      </div>
      {raiz && <TreeRender tree={raiz} />}
    </LayoutTree>
  )
}
