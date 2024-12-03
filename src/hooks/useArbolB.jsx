import { useState } from 'react'
import { ArbolB } from '../estructuras/arboles/ArbolB'

const useArbolB = () => {
  const [arbolB, setArbolB] = useState(new ArbolB(2))

  //Estado para manejar la raíz del arbol BST
  const [raiz, setRaiz] = useState(arbolB.getRaiz() || null)

  //Estado para manejar las query del usuario, numero a ingresar y eliminar
  const [values, setValues] = useState({
    randomNodes: null,
    toAdd: null,
    toDelete: null,
    toSearch: null,
    preorden: null,
    postorden: null,
    inorden: null,
    isB: true,
  })

  const insertarNodo = (query) => {
    const nuevoArbol = arbolB.clonar()
    nuevoArbol.insertar(query)
    console.log(nuevoArbol)
    //window.localStorage.setItem('arbolRN', JSON.stringify(nuevoArbol, 2, null))
    setArbolB(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toAdd: Number(query),
    }))
  }

  const eliminarNodo = (query) => {
    const nuevoArbol = arbolB.clonar()
    nuevoArbol.eliminar(query)
    //window.localStorage.setItem('arbolRN', JSON.stringify(nuevoArbol, 2, null))
    setArbolB(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toDelete: Number(query),
      toAdd: null,
    }))
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
      isB: true,
    })
    //window.localStorage.removeItem('numbers')
    //window.localStorage.removeItem('values')
  }

  const isInTree = (valor) => {
    console.log('valor', valor)
    console.log(arbolB.getRaiz())
    console.log(arbolB.contiene(valor))
    return arbolB.contiene(valor)
  }

  const insertRandomNodes = (nodesNumber) => {
    const nuevoArbol = new ArbolB(2)
    nuevoArbol.insertarNodosAleatorios(nodesNumber)
    // window.localStorage.setItem(
    //  'arbolRN',
    // JSON.stringify(nuevoArbol.toNodoObject(), 2, null)
    //)
    setArbolB(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz())
    setValues((prev) => ({
      ...prev,
      randomNodes: nodesNumber,
    }))
  }

  const buscarNodoExacto = (query) => {
    setValues((prev) => ({
      ...prev,
      toSearch: Number(query),
    }))
  }

  const buscarNodoMayor = () => {
    if (arbolB.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolB.getMaximo(),
    }))
    return true
  }

  const buscarNodoMenor = () => {
    if (arbolB.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolB.getMinimo(),
    }))
    return true
  }

  const getPreOrden = () => {
    const preorden = arbolB.preOrden()
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
    const postorden = arbolB.postOrden()
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
    const inorden = arbolB.inOrden()
    if (!inorden) return false
    setValues((prev) => ({
      ...prev,
      preorden: null,
      postorden: null,
      inorden: inorden,
    }))
    return true
  }

  //Método para vaciar el arbol
  const vaciarArbol = () => {
    const nuevoArbol = arbolB.clonar()
    nuevoArbol.vaciar()
    setArbolB(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz())
    //window.localStorage.removeItem('arbol')
  }

  return {
    arbolB,
    values,
    raiz,
    resetValues,
    insertarNodo,
    eliminarNodo,
    insertRandomNodes,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    getPreOrden,
    getPostOrden,
    getInOrden,
    isInTree,
    vaciarArbol,
  }
}

export default useArbolB
