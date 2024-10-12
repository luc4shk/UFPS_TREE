//Inspirado de Proyecto SEED - https://project-seed-ufps.vercel.app/

/**
 * Clase que representa un nodo en un árbol binario.
 * @class
 * @classdesc Esta clase define un nodo en un árbol binario, que contiene un valor
 * y referencias a sus nodos hijo izquierdo y derecho, a su vez como los métodos para trabajar con este.
 */
export class NodoBinario {
  /**
   * Crea un nodo con su información, su hijo izquierdo y derecho.
   * @constructs
   * @param {Number} info - Valor del nodo.
   * @param {NodoBinario} izq - Nodo hijo izquierdo.
   * @param {NodoBinario} der - Nodo hijo derecho.
   * */
  constructor(info, izq = null, der = null) {
    this.info = info;
    this.izq = izq;
    this.der = der;
  }

  /**
   * Devuelve el valor del nodo actual.
   * @return {Number} Valor del nodo.
   * */
  getInfo() {
    return Number(this.info);
  }

  /**
   * Actualiza el valor del nodo actual
   * @param {Number} info - Nuevo valor del nodo.
   * */
  setInfo(info) {
    this.info = info;
  }

  /**
   * Devuelve el nodo correspondiente al hijo izquierdo del nodo actual.
   * @return {NodoBinario} Nodo hijo izquierdo.
   * */
  getIzq() {
    return this.izq;
  }

  /**
   * Actualiza el valor del nodo izquierdo.
   * @param {NodoBinario} izq - Nuevo nodo que se establecera como hijo izquierdo.
   * */
  setIzq(izq) {
    this.izq = izq;
  }

  /**
   * Devuelve el nodo correspondiente al hijo derecho del nodo actual.
   * @return {NodoBinario} Nodo hijo derecho.
   * */
  getDer() {
    return this.der;
  }

  /**
   * Actualiza el valor del nodo derecho.
   * @param {NodoBinario} der - Nuevo nodo que se establecera como hijo derecho.
   * */
  setDer(der) {
    this.der = der;
  }
}
