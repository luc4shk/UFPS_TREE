
export class NodoAVL {
  /**
   * Constructor para la clase NodoAVL.
   * @param {Number} info - Valor del nodo.
   * @param {NodoAVL} izq - Nodo hijo izquierdo.
   * @param {NodoAVL} der - Nodo hijo derecho.
   */
  constructor(info, izq = null, der = null) {
    this.info = info;
    this.izq = izq;
    this.der = der;
    // this.padre = padre;
    // this.bal = bal;
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

  // getPadre() {
  //   return this.padre;
  // }

  // setPadre(padre) {
  //   this.padre = padre;
  // }

  getBalance() {
    return Number(this.balance);
  }

  setBalance(balance) {
    this.balance = balance;
  }
}
