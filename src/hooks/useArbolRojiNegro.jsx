import { useState, useEffect } from 'react'
import { stringify, parse, toJSON, fromJSON } from 'flatted'
//import { ArbolRojiNegro } from '../estructuras/arboles/ArbolRojoNegro'
import { ArbolRojoNegro, Nodo } from '../estructuras/arboles/ArbolRojoNegro'

const useArbolRojiNegro = () => {
  const [arbolRN, setArbolRN] = useState(new ArbolRojoNegro())

  //Estado para manejar la raíz del arbol BST
  const [raiz, setRaiz] = useState(arbolRN.getRaiz() || '')

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

  const insertarNodo = (query) => {
    const nuevoArbol = arbolRN.clonar()
    nuevoArbol.insertar(query)
    console.log(nuevoArbol)
    //window.localStorage.setItem('arbolRN', JSON.stringify(nuevoArbol, 2, null))
    setArbolRN(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toAdd: Number(query),
    }))
  }

  const eliminarNodo = (query) => {
    const nuevoArbol = arbolRN.clonar()
    nuevoArbol.eliminar(query)
    //window.localStorage.setItem('arbolRN', JSON.stringify(nuevoArbol, 2, null))
    setArbolRN(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz()) // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toDelete: Number(query),
      toAdd: null,
    }))
  }

  const isInTree = (valor) => {
    return arbolRN.contiene(valor)
  }

  const buscarNodoExacto = (query) => {
    setValues((prev) => ({
      ...prev,
      toSearch: Number(query),
    }))
  }

  const buscarNodoMayor = () => {
    if (arbolRN.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolRN.getMaximo().valor,
    }))
    return true
  }

  const buscarNodoMenor = () => {
    if (arbolRN.esVacio()) return false
    setValues((prev) => ({
      ...prev,
      toSearch: arbolRN.getMinimo().valor,
    }))
    return true
  }

  const getPreOrden = () => {
    const preorden = arbolRN.preOrden()
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
    const postorden = arbolRN.postOrden()
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
    const inorden = arbolRN.inOrden()
    if (!inorden) return false
    setValues((prev) => ({
      ...prev,
      preorden: null,
      postorden: null,
      inorden: inorden,
    }))
    return true
  }

  const insertRandomNodes = (nodesNumber) => {
    const nuevoArbol = new ArbolRojoNegro()
    nuevoArbol.insertarNodosAleatorios(nodesNumber)
    console.log(nuevoArbol)
    console.log('arbol', stringify(nuevoArbol))
    // window.localStorage.setItem(
    //  'arbolRN',
    // JSON.stringify(nuevoArbol.toNodoObject(), 2, null)
    //)
    setArbolRN(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz())
    setValues((prev) => ({
      ...prev,
      randomNodes: nodesNumber,
    }))
  }

  //Método para vaciar el arbol
  const vaciarArbol = () => {
    const nuevoArbol = arbolRN.clonar()
    nuevoArbol.vaciar()
    setArbolRN(nuevoArbol)
    setRaiz(nuevoArbol.getRaiz())
    //window.localStorage.removeItem('arbol')
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
    //window.localStorage.removeItem('numbers')
    //window.localStorage.removeItem('values')
  }

  return {
    arbolRN,
    setArbolRN,
    raiz,
    setRaiz,
    values,
    insertarNodo,
    eliminarNodo,
    resetValues,
    isInTree,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    getPreOrden,
    getPostOrden,
    getInOrden,
    insertRandomNodes,
    vaciarArbol,
  }
}

export default useArbolRojiNegro
