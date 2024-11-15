export class NodoRN {
  constructor(info = null, izq = null, der = null, padre = null, color = 0) {
    this.info = info // Información del nodo
    this.izq = izq // Nodo izquierdo
    this.der = der // Nodo derecho
    this.padre = padre // Nodo padre
    this.color = color // Color del nodo (0 para rojo, 1 para negro)
  }
  // Métodos getters y setters para obtener y modificar la información, padre, izquierdo, derecho y color

  getInfo() {
    return this.info
  }

  setInfo(info) {
    this.info = info
  }

  getPadre() {
    return this.padre
  }

  setPadre(padre) {
    this.padre = padre
  }

  getIzq() {
    return this.izq
  }

  setIzq(izq) {
    this.izq = izq
  }

  getDer() {
    return this.der
  }

  setDer(der) {
    this.der = der
  }

  getColor() {
    return this.color
  }

  setColor(color) {
    this.color = color
  }

  // Método para mostrar la información del nodo como cadena de texto
  toString() {
    return `info=${this.info}, padre=${this.padre ? this.padre.info : 'null'}, color=${this.color}`
  }
}
