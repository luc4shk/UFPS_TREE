export class NodoRN {
  constructor(
    valor, // Valor almacenado en el nodo
    color = 0, // Color del nodo (1 = rojo, 0 = negro)
    izquierda = null, // Referencia hijo izquierdo
    derecha = null, // Referencia hijo derecho
    padre = null // Referencia nodo padre
  ) {
    this.valor = valor
    this.color = color
    this.izquierda = izquierda
    this.derecha = derecha
    this.padre = padre
  }
  
  // Métodos getters y setters para obtener y modificar la información, padre, izquierdo, derecho y color

  getInfo() {
    return this.valor
  }

  setInfo(valor) {
    this.valor = valor
  }

  getPadre() {
    return this.padre
  }

  setPadre(padre) {
    this.padre = padre
  }

  getIzq() {
    return this.izquierda
  }

  setIzq(izquierda) {
    this.izquierda = izquierda
  }

  getDer() {
    return this.derecha
  }

  setDer(derecha) {
    this.derecha = derecha
  }

  getColor() {
    return this.color
  }

  setColor(color) {
    this.color = color
  }

  // Método para mostrar la información del nodo como cadena de texto
  toString() {
    return `info=${this.valor}, padre=${this.padre ? this.padre.valor : 'null'}, color=${this.color}`
  }
}
