import { useState, useEffect } from 'react'
import { ArbolBinarioBusqueda } from '../estructuras/arboles/ArbolBinarioBusqueda'
import { NodoBinario } from '../estructuras/nodos/NodoBinario'
const useArbolBST = () => {
  //Estado para manejar el arbol BST
  const [arbolBST, setArbolBST] = useState(new ArbolBinarioBusqueda())

  //Estado para manejar la raíz del arbol BST
  const [raiz, setRaiz] = useState(arbolBST.getRaiz() || null)

  //Estado para manejar las query del usuario, numero a ingresar y eliminar
  const [values, setValues] = useState({
    randomNodes: null,
    toAdd: null,
    toDelete: null,
    toSearch: null,
    preorden: null,
    postorden: null,
    inorden: null,
  })

  //Cada vez que se reenderice el componente construimos el arbol
  useEffect(() => {
    const nodo = JSON.parse(window.localStorage.getItem('arbol'))?.raiz || null
    const values = JSON.parse(window.localStorage.getItem('values')) || {
      randomNodes: null,
      toAdd: null,
      toDelete: null,
      toSearch: null,
      preorden: null,
      postorden: null,
      inorden: null,
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
      setValues(values)
    }
  }, [])

  //Método para añadir un nodo al arbol
  const insertarNodo = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.insertar(query)
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toAdd: query,
    }))
  }

  //Método para remover un nodo del arbol
  const removerNodo = (query) => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.eliminarNodo(Number(query))
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toDelete: Number(query),
    }))
    window.localStorage.setItem('numbers', JSON.stringify(values, 2, null))
  }

  const buscarNodoExacto = (query) => {
    setValues((prev) => ({
      ...prev,
      toSearch: Number(query),
    }))
  }

  const buscarNodoMayor = () => {
    if (arbolBST.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolBST.obtenerNodoMayor(),
    }))
    return true
  }

  const buscarNodoMenor = () => {
    if (arbolBST.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolBST.obtenerNodoMenor(),
    }))
    return true
  }

  const nodoInsertado = (query) => {
    return arbolBST.esta(query)
  }

  //Método para vaciar el arbol
  const vaciarArbol = () => {
    const nuevoArbol = arbolBST.clonar()
    nuevoArbol.vaciarArbol()
    setArbolBST(nuevoArbol)
    setRaiz(null)
    window.localStorage.removeItem('arbol')
  }

  const insertRandomNodes = (nodesNumber) => {
    const nuevoArbol = new ArbolBinarioBusqueda()
    nuevoArbol.insertarNodosAleatorios(nodesNumber)
    window.localStorage.setItem('arbol', JSON.stringify(nuevoArbol, 2, null))
    setArbolBST(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz())
    setValues((prev) => ({
      ...prev,
      randomNodes: nodesNumber,
    }))
  }

  const getPreOrden = () => {
    const preorden = arbolBST.preOrden()
    if (!preorden) return false
    setValues((prev) => ({
      ...prev,
      postorden: null,
      inorden: null,
      preorden: preorden,
    }))
    return true
  }

  const getPostOrden = () => {
    const postorden = arbolBST.postOrden()
    if (!postorden) return false
    setValues((prev) => ({
      ...prev,
      preorden: null,
      inorden: null,
      postorden: postorden,
    }))
    return true
  }

  const getInOrden = () => {
    const inorden = arbolBST.inOrden()
    if (!inorden) return false
    setValues((prev) => ({
      ...prev,
      preorden: null,
      postorden: null,
      inorden: inorden,
    }))
    return true
  }

  const resetValues = () => {
    setValues({
      randomNodes: null,
      toAdd: null,
      toDelete: null,
      toSearch: null,
      preorden: null,
      postorden: null,
      inorden: null,
    })
    window.localStorage.removeItem('numbers')
    window.localStorage.removeItem('values')
  }
  return {
    arbolBST,
    values,
    raiz,
    insertarNodo,
    removerNodo,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    vaciarArbol,
    insertRandomNodes,
    nodoInsertado,
    getPreOrden,
    getPostOrden,
    getInOrden,
    resetValues,
  }
}

export default useArbolBST
