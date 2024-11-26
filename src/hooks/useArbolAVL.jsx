import { useState } from "react";
import { ArbolAVL } from "../estructuras/arboles/ArbolAVL";

const useArbolAVL = () => {
  const [arbolAVL, setArbolAVL] = useState(new ArbolAVL());

  //Estado para manejar la raíz del arbol AVL
  const [raiz, setRaiz] = useState(arbolAVL.getRaiz() || "");

  //Estado para manejar las query del usuario, numero a ingresar y eliminar
  const [values, setValues] = useState({
    randomNodes: null,
    toAdd: null,
    toDelete: null,
    toSearch: null,
    preorden: null,
    postorden: null,
    inorden: null,
  });

  const insertarNodo = (query) => {
    const nuevoArbol = arbolAVL.clonar();
    nuevoArbol.insertar(query);
    setArbolAVL(nuevoArbol);
    setRaiz(nuevoArbol.getRaiz()); // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toAdd: Number(query),
    }));
  };

  //QUEDAMOS AQUÍ
  const eliminarNodo = (query) => {
    const nuevoArbol = arbolAVL.clonar();
    nuevoArbol.eliminar(query);
    setArbolAVL(nuevoArbol);
    setRaiz(nuevoArbol.getRaiz()); // Actualizar la raíz después de la inserción
    setValues((prev) => ({
      ...prev,
      toDelete: Number(query),
      toAdd: null,
    }));
  };

  const isInTree = (valor) => {
    return arbolAVL.contiene(valor);
  };

  const buscarNodoExacto = (query) => {
    setValues((prev) => ({
      ...prev,
      toSearch: Number(query),
    }));
  };

  const buscarNodoMayor = () => {
    if (arbolAVL.esVacio()) return false;
    setValues((prev) => ({
      ...prev,
      toSearch: arbolAVL.getMaximo().valor, //valor seria info?
    }));
    return true;
  };

  const buscarNodoMenor = () => {
    if (arbolAVL.esVacio()) return false;
    setValues((prev) => ({
      ...prev,
      toSearch: arbolAVL.getMinimo().valor,
    }));
    return true;
  };

  const getPreOrden = () => {
    const preorden = arbolAVL.preOrden();
    if (!preorden) return false;
    setValues((prev) => ({
      ...prev,
      postorden: null,
      inorden: null,
      preorden: preorden,
    }));
    return true;
  };

  const getPostOrden = () => {
    const postorden = arbolAVL.postOrden();
    if (!postorden) return false;
    setValues((prev) => ({
      ...prev,
      preorden: null,
      inorden: null,
      postorden: postorden,
    }));
    return true;
  };

  const getInOrden = () => {
    const inorden = arbolAVL.inOrden();
    if (!inorden) return false;
    setValues((prev) => ({
      ...prev,
      preorden: null,
      postorden: null,
      inorden: inorden,
    }));
    return true;
  };

  const insertRandomNodes = (nodesNumber) => {
    const nuevoArbol = new ArbolAVL();
    nuevoArbol.insertarNodosAleatorios(nodesNumber);
    // console.log(nuevoArbol);
    // console.log("arbol", stringify(nuevoArbol));
    // window.localStorage.setItem(
    //  'arbolRN',
    // JSON.stringify(nuevoArbol.toNodoObject(), 2, null)
    //)
    setArbolAVL(nuevoArbol);
    setRaiz(nuevoArbol.getRaiz());
    setValues((prev) => ({
      ...prev,
      randomNodes: nodesNumber,
    }));
  };

  //Método para vaciar el arbol
  const vaciarArbol = () => {
    const nuevoArbol = arbolAVL.clonar();
    nuevoArbol.vaciar();
    setArbolAVL(nuevoArbol);
    setRaiz(nuevoArbol.getRaiz());
    //window.localStorage.removeItem('arbol')
  };

  const resetValues = () => {
    setValues({
      randomNodes: null,
      toAdd: null,
      toDelete: null,
      toSearch: null,
      preorden: null,
      postorden: null,
      inorden: null,
    });
  };

  return {
    arbolAVL,
    setArbolAVL,
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
  };
};

export default useArbolAVL;
