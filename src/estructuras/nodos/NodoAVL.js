import NodoBinario from "./NodoBinario";

export class NodoAVL extends NodoBinario {
  /**
   * Constructor para la clase NodoAVL.
   * @param {NodoAVL} padre - Nodo padre del nodo actual.
   * @param {Number} bal - Factor de balance del nodo.
   * @param {Number} info - Valor del nodo.
   * @param {NodoBinario} izq - Nodo hijo izquierdo.
   * @param {NodoBinario} der - Nodo hijo derecho.
   */
  constructor(padre = null, bal = 0, info = null, izq = null, der = null) {
    super(info, izq, der); // Llama al constructor de la clase base
    this.padre = padre;
    this.bal = bal;
  }

  getInfo() {
    return super.getInfo();
  }

  setInfo(info) {
    super.setInfo(info);
  }

  getIzq() {
    return super.getIzq();
  }

  setIzq(izq) {
    super.setIzq(izq);
  }

  getDer() {
    return super.getDer();
  }

  setDer(der) {
    super.setDer(der);
  }

  getPadre() {
    return this.padre;
  }

  setPadre(padre) {
    this.padre = padre;
  }

  getBalance () {
    return Number(this.balance);
  }

  setBalance(balance) {
    this.balance = balance;
  }
}
