export class NodoAVL {
  /**
   * Constructor para la clase NodoAVL.
   * @param {NodoAVL} padre - Nodo padre del nodo actual.
   * @param {Number} bal - Factor de balance del nodo.
   * @param {Number} info - Valor del nodo.
   * @param {NodoBinario} izq - Nodo hijo izquierdo.
   * @param {NodoBinario} der - Nodo hijo derecho.
   */
  constructor(info, padre = null, bal = 0, izq = null, der = null) {
    this.info = info;
    this.izq = izq;
    this.der = der;
    this.padre = padre;
    this.bal = bal;
  }

  getInfo() {
    return this.info;
  }

  setInfo(info) {
    this.info = info;
  }

  getIzq() {
    return this.izq;
  }

  setIzq(izq) {
    this.izq = izq;
  }

  getDer() {
    return this.der;
  }

  setDer(der) {
    this.der = der;
  }

  getPadre() {
    return this.padre;
  }

  setPadre(padre) {
    this.padre = padre;
  }

  getBalance() {
    return Number(this.balance);
  }

  setBalance(balance) {
    this.balance = balance;
  }
}
