import { useState, useEffect } from 'react'
import { ArbolBinarioBusqueda } from '../estructuras/arboles/ArbolBinarioBusqueda'
import { NodoBinario } from '../estructuras/nodos/NodoBinario'
const useArbolBST = () => {
  //Estado para manejar el arbol BST
  const [arbolBST, setArbolBST] = useState(new ArbolBinarioBusqueda())

  //Estado para manejar la raíz del arbol BST
  const [raiz, setRaiz] = useState(arbolBST.getRaiz() || null)

  //Estado para manejar las query del usuario, numero a ingresar y eliminar
  const [numbers, setNumbers] = useState({
    toAdd: null,
    toDelete: null,
  })

  //Cada vez que se reenderice el componente construimos el arbol
  useEffect(() => {
    const nodo = JSON.parse(window.localStorage.getItem('arbol'))?.raiz || null
    const numbers = JSON.parse(window.localStorage.getItem('numbers')) || {
      toAdd: null,
      toDelete: null,
    }
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
      setNumbers(numbers)
    }
  }, [])

  //Método para añadir un nodo al arbol
  const insertarNodo = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.insertar(query)
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setNumbers((prev) => {
      window.localStorage.setItem(
        'numbers',
        JSON.stringify(
          {
            ...prev,
            toAdd: query,
          },
          2,
          null
        )
      )
      return {
        ...prev,
        toAdd: query,
      }
    })
  }

  //Método para remover un nodo del arbol
  const removerNodo = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.eliminarNodo(Number(query))
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setNumbers((prev) => ({
      ...prev,
      toDelete: Number(query),
    }))
    window.localStorage.setItem('numbers', JSON.stringify(numbers, 2, null))
  }

  //Método para vaciar el arbol
  const vaciarArbol = () => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.vaciarArbol()
    setArbolBST(nuevoArbol)
    setRaiz(null)
    window.localStorage.removeItem('arbol')
  }

  return {
    numbers,
    raiz,
    insertarNodo,
    removerNodo,
    vaciarArbol,
  }
}

export default useArbolBST
