class NodoArbolB {
  constructor(esHoja = true) {
    this.llaves = []
    this.hijos = []
    this.esHoja = esHoja
  }
}

export class ArbolB {
  constructor(t) {
    if (t < 2) {
      throw new Error('El grado mínimo (t) debe ser al menos 2.')
    }
    this.raiz = new NodoArbolB(true)
    this.t = t
  }

  getRaiz() {
    return this.raiz
  }

  esVacio() {
    return this.raiz === null
  }

  vaciar() {
    this.raiz = new NodoArbolB(true)
  }

  // Método ajustado para imprimir el árbol B
  imprimir(nodo = this.raiz, nivel = 0) {
    let resultado = `Nivel ${nivel}: ${JSON.stringify(nodo.llaves)}\n`
    if (!nodo.esHoja) {
      for (let i = 0; i < nodo.hijos.length; i++) {
        resultado += this.imprimir(nodo.hijos[i], nivel + 1)
      }
    }
    return resultado
  }

  recorrer(nodo = this.raiz, resultado = []) {
    for (let i = 0; i < nodo.llaves.length; i++) {
      if (!nodo.esHoja) {
        this.recorrer(nodo.hijos[i], resultado)
      }
      resultado.push(nodo.llaves[i])
    }
    if (!nodo.esHoja) {
      this.recorrer(nodo.hijos[nodo.llaves.length], resultado)
    }
    return resultado
  }

  buscarClave(llave, nodo = this.raiz) {
    let i = 0
    while (i < nodo.llaves.length && llave > nodo.llaves[i]) {
      i++
    }
    if (i < nodo.llaves.length && llave === nodo.llaves[i]) {
      return nodo
    }
    if (nodo.esHoja) {
      return null
    }
    return this.buscarClave(llave, nodo.hijos[i])
  }

  insertar(llave) {
    const raiz = this.raiz
    if (raiz.llaves.length === 2 * this.t - 1) {
      //if (raiz.llaves.length === this.t) {
      const nuevoNodo = new NodoArbolB(false)
      nuevoNodo.hijos.push(raiz)
      this.dividirHijo(nuevoNodo, 0)
      this.raiz = nuevoNodo
      this.insertarNoLleno(nuevoNodo, llave)
    } else {
      this.insertarNoLleno(raiz, llave)
    }
  }

  insertarNoLleno(nodo, llave) {
    let i = nodo.llaves.length - 1
    if (nodo.esHoja) {
      while (i >= 0 && llave < nodo.llaves[i]) {
        i--
      }
      nodo.llaves.splice(i + 1, 0, llave)
    } else {
      while (i >= 0 && llave < nodo.llaves[i]) {
        i--
      }
      i++
      if (nodo.hijos[i].llaves.length === 2 * this.t - 1) {
        //if (nodo.hijos[i].llaves.length === this.t) {
        this.dividirHijo(nodo, i)
        if (llave > nodo.llaves[i]) {
          i++
        }
      }
      this.insertarNoLleno(nodo.hijos[i], llave)
    }
  }

  dividirHijo(nodo, indice) {
    const t = this.t
    const hijo = nodo.hijos[indice]
    const nuevoNodo = new NodoArbolB(hijo.esHoja)

    // Copiar la mitad superior de las llaves al nuevo nodo
    nuevoNodo.llaves = hijo.llaves.splice(t)

    // Si no es hoja, copiar los hijos correspondientes al nuevo nodo
    if (!hijo.esHoja) {
      nuevoNodo.hijos = hijo.hijos.splice(t)
    }

    // Insertar el nuevo nodo como hijo del nodo padre
    nodo.hijos.splice(indice + 1, 0, nuevoNodo)

    // Subir la clave del medio al nodo padre
    nodo.llaves.splice(indice, 0, hijo.llaves.pop())
  }

  eliminar(llave) {
    this.eliminarRecursivo(this.raiz, llave)
  }

  eliminarRecursivo(nodo, llave) {
    if (!nodo) return // Asegura que el nodo existe

    let i = 0
    while (i < nodo.llaves.length && llave > nodo.llaves[i]) {
      i++
    }

    // Si encontramos la clave en el nodo
    if (i < nodo.llaves.length && llave === nodo.llaves[i]) {
      if (nodo.esHoja) {
        // Caso 1: El nodo es una hoja, eliminamos la clave directamente
        nodo.llaves.splice(i, 1)
      } else {
        // Caso 2: El nodo no es hoja
        const claveIzquierda = nodo.hijos[i]
        const claveDerecha = nodo.hijos[i + 1]

        if (claveIzquierda && claveIzquierda.llaves.length >= this.t) {
          // Caso 2a: Si el subárbol izquierdo tiene al menos `t` claves
          const clavePredecesora = this.obtenerMaximo(claveIzquierda)
          nodo.llaves[i] = clavePredecesora
          this.eliminarRecursivo(claveIzquierda, clavePredecesora)
        } else if (claveDerecha && claveDerecha.llaves.length >= this.t) {
          // Caso 2b: Si el subárbol derecho tiene al menos `t` claves
          const claveSucesora = this.obtenerMinimo(claveDerecha)
          nodo.llaves[i] = claveSucesora
          this.eliminarRecursivo(claveDerecha, claveSucesora)
        } else {
          // Caso 2c: Si ambos subárboles tienen menos de `t` claves
          // Fusionamos los subárboles izquierdo y derecho
          this.fusionar(nodo, i)
          this.eliminarRecursivo(claveIzquierda, llave)
        }
      }
    } else if (!nodo.esHoja) {
      // Caso 3: Si no encontramos la clave y el nodo no es hoja, vamos al siguiente hijo
      if (nodo.hijos[i]) {
        this.eliminarRecursivo(nodo.hijos[i], llave)
      }
    }
  }

  obtenerMaximo(nodo) {
    // Obtiene la clave más grande del subárbol
    while (!nodo.esHoja) {
      nodo = nodo.hijos[nodo.hijos.length - 1]
    }
    return nodo.llaves[nodo.llaves.length - 1]
  }

  obtenerMinimo(nodo) {
    // Obtiene la clave más pequeña del subárbol
    while (!nodo.esHoja) {
      nodo = nodo.hijos[0]
    }
    return nodo.llaves[0]
  }

  fusionar(nodo, indice) {
    const hijoIzquierdo = nodo.hijos[indice]
    const hijoDerecho = nodo.hijos[indice + 1]
    const clavePadre = nodo.llaves[indice]

    // Fusionamos el hijo izquierdo, la clave del padre y el hijo derecho
    hijoIzquierdo.llaves.push(clavePadre, ...hijoDerecho.llaves)
    if (!hijoIzquierdo.esHoja) {
      hijoIzquierdo.hijos.push(...hijoDerecho.hijos)
    }

    // Eliminamos el hijo derecho del nodo y la clave del padre
    nodo.llaves.splice(indice, 1)
    nodo.hijos.splice(indice + 1, 1)

    // Limpiar nodos vacíos después de la fusión
  }

  clonar() {
    const clonarNodo = (nodo) => {
      if (!nodo) return null

      // Crear un nuevo nodo con las mismas propiedades
      const nuevoNodo = new NodoArbolB(nodo.esHoja)
      nuevoNodo.llaves = [...nodo.llaves] // Copia de las claves

      // Recursivamente clonar los hijos si no es hoja
      if (!nodo.esHoja) {
        nuevoNodo.hijos = nodo.hijos.map((hijo) => clonarNodo(hijo))
      }

      return nuevoNodo
    }

    // Crear un nuevo árbol B con la misma t y la raíz clonada
    const nuevoArbol = new ArbolB(this.t)
    nuevoArbol.raiz = clonarNodo(this.raiz)

    return nuevoArbol
  }

  // Método para obtener la altura del árbol
  obtenerAltura(nodo = this.raiz) {
    if (!nodo) return 0

    let altura = 0
    let actual = nodo

    // Recorre hacia los nodos hijos más profundos
    while (!actual.esHoja) {
      altura++
      actual = actual.hijos[0] // Avanza hacia el primer hijo
    }

    // Considera la raíz como el nivel 0
    return altura
  }

  contiene(llave, nodo = this.raiz) {
    console.log(`Buscando la llave: ${llave} en nodo:`, nodo)

    // Asegurarse de que el nodo tiene llaves
    if (!nodo || !nodo.llaves || nodo.llaves.length === 0) {
      console.log('Nodo no válido o sin llaves.')
      return false
    }

    let i = 0

    // Buscar la posición de la llave en el nodo
    while (i < nodo.llaves.length && llave > nodo.llaves[i]) {
      console.log('suma')
      i++
    }

    // Si encontramos la llave
    if (i < nodo.llaves.length && llave === nodo.llaves[i]) {
      console.log(`Llave ${llave} encontrada en el nodo.`)
      return true
    }

    // Si el nodo no es hoja, buscamos recursivamente en los hijos
    if (!nodo.esHoja) {
      // Si `i` es igual al número de llaves, buscamos en el último hijo
      if (i === nodo.llaves.length || i < nodo.hijos.length) {
        console.log(
          `Llave no encontrada en el nodo actual. Buscando en el hijo ${i}`
        )
        return this.contiene(llave, nodo.hijos[i])
      }
    }

    // Si el nodo es una hoja y no encontramos la llave
    if (nodo.esHoja) {
      console.log(`Nodo hoja alcanzado. Llave ${llave} no encontrada.`)
      return false
    }

    console.log(`Llave ${llave} no encontrada en el árbol.`)
    return false
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

  // Obtener el valor máximo del árbol
  getMaximo(nodo = this.raiz) {
    if (!nodo || nodo.llaves.length === 0) {
      return null // Si el nodo está vacío, no hay valor máximo
    }

    // Continuamos siguiendo el último hijo hasta llegar a una hoja
    while (!nodo.esHoja && nodo.hijos.length > 0) {
      // Evitar nodos vacíos (hijos vacíos)
      if (nodo.hijos[nodo.hijos.length - 1].llaves.length > 0) {
        nodo = nodo.hijos[nodo.hijos.length - 1] // Último hijo
      } else {
        break // Si el hijo está vacío, terminamos el recorrido
      }
    }

    // Aseguramos que no estamos en un nodo vacío antes de acceder a la última llave
    if (nodo.llaves.length > 0) {
      return nodo.llaves[nodo.llaves.length - 1] // La última llave de la hoja es la mayor
    }
    return null // En caso de que el nodo esté vacío
  }

  // Obtener el valor mínimo del árbol
  getMinimo(nodo = this.raiz) {
    if (!nodo || nodo.llaves.length === 0) {
      return null // Si el nodo está vacío, no hay valor mínimo
    }

    // Continuamos siguiendo el primer hijo hasta llegar a una hoja
    while (!nodo.esHoja && nodo.hijos.length > 0) {
      // Evitar nodos vacíos (hijos vacíos)
      if (nodo.hijos[0].llaves.length > 0) {
        nodo = nodo.hijos[0] // Primer hijo
      } else {
        break // Si el hijo está vacío, terminamos el recorrido
      }
    }

    // Aseguramos que no estamos en un nodo vacío antes de acceder a la primera llave
    if (nodo.llaves.length > 0) {
      return nodo.llaves[0] // La primera llave de la hoja es la menor
    }
    return null // En caso de que el nodo esté vacío
  }

  // Recorrido en preorden
  preOrden(nodo = this.raiz) {
    if (!nodo || nodo.llaves.length === 0) return '' // Si el nodo está vacío, retornamos cadena vacía

    let resultado = nodo.llaves.join(' - ') // Las llaves actuales separadas por comas

    for (let hijo of nodo.hijos) {
      // Recorrer recursivamente cada hijo
      let recorridoHijo = this.preOrden(hijo)
      if (recorridoHijo) {
        resultado += ' - ' + recorridoHijo
      }
    }

    return resultado
  }

  // Recorrido en inorden
  inOrden(nodo = this.raiz) {
    if (!nodo || nodo.llaves.length === 0) return '' // Si el nodo está vacío, retornamos cadena vacía

    let resultado = ''
    for (let i = 0; i < nodo.llaves.length; i++) {
      // Recorrer al hijo izquierdo si existe
      if (i < nodo.hijos.length) {
        let recorridoHijo = this.inOrden(nodo.hijos[i])
        if (recorridoHijo) {
          resultado += recorridoHijo + '-'
        }
      }
      // Añadir la llave actual
      resultado += nodo.llaves[i] + '-'
    }

    // Recorrer al último hijo si existe
    if (nodo.hijos.length > nodo.llaves.length) {
      let recorridoUltimoHijo = this.inOrden(nodo.hijos[nodo.llaves.length])
      if (recorridoUltimoHijo) {
        resultado += recorridoUltimoHijo
      }
    }

    return resultado.endsWith('-') ? resultado.slice(0, -1) : resultado // Eliminar la coma final si existe
  }

  // Recorrido en postorden
  postOrden(nodo = this.raiz) {
    if (!nodo || nodo.llaves.length === 0) return '' // Si el nodo está vacío, retornamos cadena vacía

    let resultado = ''
    for (let hijo of nodo.hijos) {
      // Recorrer recursivamente cada hijo
      let recorridoHijo = this.postOrden(hijo)
      if (recorridoHijo) {
        resultado += recorridoHijo + ' - '
      }
    }

    // Añadir las llaves actuales
    resultado += nodo.llaves.join(' - ')

    return resultado.endsWith(' - ') ? resultado.slice(0, -1) : resultado // Eliminar la coma final si existe
  }
}
