export class Nodo {
  constructor(
    valor,
    color = 0,
    izquierda = null,
    derecha = null,
    padre = null
  ) {
    this.valor = valor
    this.color = color // 1 para rojo
    this.izquierda = izquierda
    this.derecha = derecha
    this.padre = padre
  }
}

export class ArbolRojoNegro {
  constructor() {
    this.nulo = new Nodo(null)
    this.nulo.color = 0 // 0 para negro
    this.raiz = this.nulo
  }

  getRaiz() {
    return this.raiz
  }

  esVacio() {
    return this.raiz === this.nulo
  }

  vaciar() {
    this.raiz = this.nulo
  }

  insertar(valor) {
    valor = Number(valor)
    const nuevoNodo = new Nodo(valor)
    nuevoNodo.izquierda = this.nulo
    nuevoNodo.derecha = this.nulo
    let nodoPadre = null
    let actual = this.raiz

    while (actual !== this.nulo) {
      nodoPadre = actual
      if (nuevoNodo.valor < actual.valor) {
        actual = actual.izquierda
      } else {
        actual = actual.derecha
      }
    }

    nuevoNodo.padre = nodoPadre
    if (nodoPadre === null) {
      this.raiz = nuevoNodo
    } else if (nuevoNodo.valor < nodoPadre.valor) {
      nodoPadre.izquierda = nuevoNodo
    } else {
      nodoPadre.derecha = nuevoNodo
    }

    nuevoNodo.color = 1 // 1 para rojo
    this.arreglarInsercion(nuevoNodo)
  }

  rotarIzquierda(nodo) {
    const temp = nodo.derecha
    nodo.derecha = temp.izquierda
    if (temp.izquierda !== this.nulo) {
      temp.izquierda.padre = nodo
    }
    temp.padre = nodo.padre
    if (nodo.padre === null) {
      this.raiz = temp
    } else if (nodo === nodo.padre.izquierda) {
      nodo.padre.izquierda = temp
    } else {
      nodo.padre.derecha = temp
    }
    temp.izquierda = nodo
    nodo.padre = temp
  }

  rotarDerecha(nodo) {
    const temp = nodo.izquierda
    nodo.izquierda = temp.derecha
    if (temp.derecha !== this.nulo) {
      temp.derecha.padre = nodo
    }
    temp.padre = nodo.padre
    if (nodo.padre === null) {
      this.raiz = temp
    } else if (nodo === nodo.padre.derecha) {
      nodo.padre.derecha = temp
    } else {
      nodo.padre.izquierda = temp
    }
    temp.derecha = nodo
    nodo.padre = temp
  }

  arreglarInsercion(nodo) {
    while (nodo.padre && nodo.padre.color === 1) {
      // 1 para rojo
      if (nodo.padre === nodo.padre.padre.izquierda) {
        const tio = nodo.padre.padre.derecha
        if (tio && tio.color === 1) {
          // 1 para rojo
          nodo.padre.color = 0 // 0 para negro
          tio.color = 0
          nodo.padre.padre.color = 1
          nodo = nodo.padre.padre
        } else {
          if (nodo === nodo.padre.derecha) {
            nodo = nodo.padre
            this.rotarIzquierda(nodo)
          }
          nodo.padre.color = 0 // 0 para negro
          nodo.padre.padre.color = 1
          this.rotarDerecha(nodo.padre.padre)
        }
      } else {
        const tio = nodo.padre.padre.izquierda
        if (tio && tio.color === 1) {
          // 1 para rojo
          nodo.padre.color = 0 // 0 para negro
          tio.color = 0
          nodo.padre.padre.color = 1
          nodo = nodo.padre.padre
        } else {
          if (nodo === nodo.padre.izquierda) {
            nodo = nodo.padre
            this.rotarDerecha(nodo)
          }
          nodo.padre.color = 0 // 0 para negro
          nodo.padre.padre.color = 1
          this.rotarIzquierda(nodo.padre.padre)
        }
      }
    }
    this.raiz.color = 0 // 0 para negro
  }

  eliminar(valor) {
    valor = Number(valor)
    let nodo = this.buscarNodo(this.raiz, valor)
    if (nodo === this.nulo) return // No se encontró el nodo

    let nodoOriginalColor = nodo.color
    let reemplazo

    if (nodo.izquierda === this.nulo) {
      reemplazo = nodo.derecha
      this.transplantar(nodo, nodo.derecha)
    } else if (nodo.derecha === this.nulo) {
      reemplazo = nodo.izquierda
      this.transplantar(nodo, nodo.izquierda)
    } else {
      let sucesor = this.minimo(nodo.derecha)
      nodoOriginalColor = sucesor.color
      reemplazo = sucesor.derecha
      if (sucesor.padre === nodo) {
        reemplazo.padre = sucesor
      } else {
        this.transplantar(sucesor, sucesor.derecha)
        sucesor.derecha = nodo.derecha
        sucesor.derecha.padre = sucesor
      }
      this.transplantar(nodo, sucesor)
      sucesor.izquierda = nodo.izquierda
      sucesor.izquierda.padre = sucesor
      sucesor.color = nodo.color
    }

    if (nodoOriginalColor === 0) {
      this.arreglarEliminacion(reemplazo)
    }
  }

  buscarNodo(nodo, valor) {
    while (nodo !== this.nulo && valor !== nodo.valor) {
      nodo = valor < nodo.valor ? nodo.izquierda : nodo.derecha
    }
    return nodo
  }

  getMinimo(nodo = this.raiz) {
    if (this.esVacio()) return null

    while (nodo.izquierda.valor !== null) {
      nodo = nodo.izquierda
    }
    return nodo // Nodo con el valor mínimo
  }

  getMaximo(nodo = this.raiz) {
    if (this.esVacio()) return null

    while (nodo.derecha.valor !== null) {
      nodo = nodo.derecha
    }
    return nodo // Nodo con el valor máximo
  }

  contiene(valor) {
    return this.buscarNodo(this.raiz, valor) !== this.nulo
  }

  transplantar(nodoU, nodoV) {
    if (nodoU.padre === null) {
      this.raiz = nodoV
    } else if (nodoU === nodoU.padre.izquierda) {
      nodoU.padre.izquierda = nodoV
    } else {
      nodoU.padre.derecha = nodoV
    }
    nodoV.padre = nodoU.padre
  }

  minimo(nodo) {
    while (nodo.izquierda !== this.nulo) {
      nodo = nodo.izquierda
    }
    return nodo
  }

  arreglarEliminacion(nodo) {
    while (nodo !== this.raiz && nodo.color === 0) {
      if (nodo === nodo.padre.izquierda) {
        let hermano = nodo.padre.derecha
        if (hermano.color === 1) {
          hermano.color = 0
          nodo.padre.color = 1
          this.rotarIzquierda(nodo.padre)
          hermano = nodo.padre.derecha
        }
        if (hermano.izquierda.color === 0 && hermano.derecha.color === 0) {
          hermano.color = 1
          nodo = nodo.padre
        } else {
          if (hermano.derecha.color === 0) {
            hermano.izquierda.color = 0
            hermano.color = 1
            this.rotarDerecha(hermano)
            hermano = nodo.padre.derecha
          }
          hermano.color = nodo.padre.color
          nodo.padre.color = 0
          hermano.derecha.color = 0
          this.rotarIzquierda(nodo.padre)
          nodo = this.raiz
        }
      } else {
        let hermano = nodo.padre.izquierda
        if (hermano.color === 1) {
          hermano.color = 0
          nodo.padre.color = 1
          this.rotarDerecha(nodo.padre)
          hermano = nodo.padre.izquierda
        }
        if (hermano.derecha.color === 0 && hermano.izquierda.color === 0) {
          hermano.color = 1
          nodo = nodo.padre
        } else {
          if (hermano.izquierda.color === 0) {
            hermano.derecha.color = 0
            hermano.color = 1
            this.rotarIzquierda(hermano)
            hermano = nodo.padre.izquierda
          }
          hermano.color = nodo.padre.color
          nodo.padre.color = 0
          hermano.izquierda.color = 0
          this.rotarDerecha(nodo.padre)
          nodo = this.raiz
        }
      }
    }
    nodo.color = 0
  }

  clonar() {
    const clonarNodo = (nodo) => {
      if (nodo === this.nulo) {
        return this.nulo // Caso base: si es un nodo nulo, devuelve el nodo nulo del nuevo árbol
      }

      // Crea un nuevo nodo con el mismo valor y color
      const nuevoNodo = new Nodo(nodo.valor)
      nuevoNodo.color = nodo.color

      // Clona recursivamente los hijos izquierdo y derecho
      nuevoNodo.izquierda = clonarNodo(nodo.izquierda)
      nuevoNodo.derecha = clonarNodo(nodo.derecha)

      // Establece el padre en los hijos del nuevo nodo
      if (nuevoNodo.izquierda !== this.nulo) {
        nuevoNodo.izquierda.padre = nuevoNodo
      }
      if (nuevoNodo.derecha !== this.nulo) {
        nuevoNodo.derecha.padre = nuevoNodo
      }

      return nuevoNodo
    }

    // Crea un nuevo árbol Rojo-Negro y establece la raíz clonada
    const nuevoArbol = new ArbolRojoNegro()
    nuevoArbol.raiz = clonarNodo(this.raiz)
    nuevoArbol.nulo = this.nulo // Asegura que ambos árboles compartan el nodo nulo

    return nuevoArbol
  }

  preOrden() {
    const resultado = []
    this.recorrerPreorden(this.raiz, resultado)
    return resultado.join('-')
  }
  /**
   * @private
   * */
  recorrerPreorden(nodo, resultado) {
    if (nodo === this.nulo) return
    resultado.push(nodo.valor)
    this.recorrerPreorden(nodo.izquierda, resultado)
    this.recorrerPreorden(nodo.derecha, resultado)
  }

  inOrden() {
    const resultado = []
    this.recorrerInorden(this.raiz, resultado)
    return resultado.join('-')
  }

  /**
   * @private
   * */
  recorrerInorden(nodo, resultado) {
    if (nodo === this.nulo) return
    this.recorrerInorden(nodo.izquierda, resultado)
    resultado.push(nodo.valor)
    this.recorrerInorden(nodo.derecha, resultado)
  }

  postOrden() {
    const resultado = []
    this.recorrerPostorden(this.raiz, resultado)
    return resultado.join('-')
  }
  /**
   * @private
   * */
  recorrerPostorden(nodo, resultado) {
    if (nodo === this.nulo) return
    this.recorrerPostorden(nodo.izquierda, resultado)
    this.recorrerPostorden(nodo.derecha, resultado)
    resultado.push(nodo.valor)
  }

  insertarNodosAleatorios(cantidad) {
    const valoresInsertados = new Set() // Conjunto para almacenar los valores ya insertados

    for (let i = 0; i < cantidad; i++) {
      let valorAleatorio

      // Generar un número aleatorio y asegurarse de que no se repita
      do {
        valorAleatorio = Math.floor(Math.random() * 99) + 1 // Genera un número aleatorio entre 1 y 99
      } while (valoresInsertados.has(valorAleatorio)) // Si el número ya ha sido insertado, genera otro

      valoresInsertados.add(valorAleatorio) // Agrega el valor al conjunto de insertados
      this.insertar(valorAleatorio) // Inserta el número aleatorio en el árbol Rojo-Negro
    }
  }

  toNodoObject(node = this.raiz) {
    if (!node) return
    // Si el nodo es nulo, devolver un objeto vacío
    if (node.valor === null) {
      return {
        valor: null,
        color: 0,
        izquierda: null,
        derecha: null,
        padre: null,
      }
    }

    return {
      valor: node.valor,
      color: node.color,
      izquierda: node.izquierda ? this.toNodoObject(node.izquierda) : null, // Recursión para izquierda
      derecha: node.derecha ? this.toNodoObject(node.derecha) : null, // Recursión para derecha
      padre: node.padre ? node.padre : null, // Recursión para el padre
    }
  }
}
