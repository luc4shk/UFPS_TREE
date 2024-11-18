import { NodoRN } from '../nodos/NodoRN'

export class ArbolRojoNegro {
  // Crea un ábol vacío
  constructor() {
    this.nulo = new NodoRN(null) // Representa las hojas externas del árbol
    this.nulo.color = 0  // Estas siempre son de color negro
    this.raiz = this.nulo
  }

  // Obtiene la raíz del árbol
  getRaiz() {
    return this.raiz
  }

  // Verifica si el árbol está vacío
  esVacio() {
    return this.raiz === this.nulo
  }

  // Vacía el árbol asignando la raíz a un nodo nulo
  vaciar() {
    this.raiz = this.nulo
  }

  // Inserción de un nuevo nodo
  insertar(valor) {
    // Creación del nuevo nodo con el valor proporcionado
    valor = Number(valor)
    const nuevoNodo = new NodoRN(valor)
    nuevoNodo.izquierda = this.nulo
    nuevoNodo.derecha = this.nulo
    let nodoPadre = null
    let actual = this.raiz

    // Buscamos la posición correcta donde insertar el nuevo nodo
    while (actual !== this.nulo) {
      nodoPadre = actual
      if (nuevoNodo.valor < actual.valor) {
        actual = actual.izquierda
      } else {
        actual = actual.derecha
      }
    }

    // Una vez identificada la posición, establecemos el padre del nuevo nodo
    nuevoNodo.padre = nodoPadre
    if (nodoPadre === null) {
      this.raiz = nuevoNodo
    } else if (nuevoNodo.valor < nodoPadre.valor) {
      nodoPadre.izquierda = nuevoNodo
    } else {
      nodoPadre.derecha = nuevoNodo
    }

    nuevoNodo.color = 1 // El nuevo nodo se recolorea a rojo

    // Se aplican las rotaciones necesarias para mantener las propiedades del árbol
    this.arreglarInsercion(nuevoNodo)
  }

  // Mueve el nodo derecho hacia arriba, convirtiendolo en el nuevo padre del subárbol
  rotarIzquierda(nodo) {
    // Almacenamo el hijo derecho del nodo que se va a rotar
    const temp = nodo.derecha

    // Reasignamos el hijo derecho del nodo al hijo izquierdo del nodo temp 
    nodo.derecha = temp.izquierda

    // Si el hijo izquierdo no es nodo nulo, actualizamos su referencia al padre
    if (temp.izquierda !== this.nulo) {
      temp.izquierda.padre = nodo
    }

    // El nodo temp tomará el lugar del nodo rotado
    temp.padre = nodo.padre

    // Si el nodo rotado era la raíz, temp se convierte en la nueva raíz
    if (nodo.padre === null) {
      this.raiz = temp
    } else if (nodo === nodo.padre.izquierda) { // Si el nodo rotado era hijo izquierdo o derecho, actualizamos la referencia correspondiente
      nodo.padre.izquierda = temp
    } else {
      nodo.padre.derecha = temp
    }

    // El hijo izquiero de temp se asigna al nodo rotado
    temp.izquierda = nodo

    // Actualizamos la referencia del padre del nodo rotado a temp
    nodo.padre = temp
  }

  // Similar a la rotación izquierda, pero este mueve el nodo izquierdo hacia arriba
  rotarDerecha(nodo) {
    // Almacenamos el hijo izquierdo del nodo que se va a rotar
    const temp = nodo.izquierda

    // El hijo izquierdo del nodo se reasigna al nodo derecho de temp
    nodo.izquierda = temp.derecha

    // Si el hijo derecho de temp no es nulo, actualizamos su referencia al padre
    if (temp.derecha !== this.nulo) {
      temp.derecha.padre = nodo
    }

    // El nodo temp toma el lugar del nodo rotado
    temp.padre = nodo.padre

    // Si el nodo rotado era la raíz, temp se convierte en la nueva raíz
    if (nodo.padre === null) {
      this.raiz = temp
    } else if (nodo === nodo.padre.derecha) { // Si el nodo rotado era hijo izquiero o derecho, actualizamos la referencia correspondiente
      nodo.padre.derecha = temp
    } else {
      nodo.padre.izquierda = temp
    }

    // El hijo derecho de temp se asigna al nuevo nodo
    temp.derecha = nodo

    // El padre del nodo rotado se asigna a temp
    nodo.padre = temp
  }

  // Método que asegura que la inserción de un nuevo nodo no afecte las propiedades del árbol
  arreglarInsercion(nodo) {
    // Iteramos mientras el nodo tenga padre y su color sea rojo
    while (nodo.padre && nodo.padre.color === 1) {
      
      // Determinamos si el padre del nodo está en el lado izquierdo o derecho del abuelo
      if (nodo.padre === nodo.padre.padre.izquierda) {

        // Obtenemos el tio del nodo
        const tio = nodo.padre.padre.derecha

        if (tio && tio.color === 1) { // CASO 1: Tío rojo
          
          nodo.padre.color = 0 // Recolorear el padre a negro
          tio.color = 0 // Recolorear el tio a negro
          nodo.padre.padre.color = 1 // Recolorear el abuelo a rojo
          nodo = nodo.padre.padre // Moverse al abuelo para verificar si hay mas violaciones 

        } else {

          if (nodo === nodo.padre.derecha) { // CASO 2: Tío negro y nodo es hijo derecho
            nodo = nodo.padre
            this.rotarIzquierda(nodo) // Rotamos el padre a la izquierda
          }
          nodo.padre.color = 0 // Recolorear el padre a negro
          nodo.padre.padre.color = 1 // Recolorear el abuelo a rojo
          this.rotarDerecha(nodo.padre.padre) // Rotamos el abuelo a la derecha
        }

      } else { // Simétrico: Si el padre es hijo derecho

        const tio = nodo.padre.padre.izquierda

        if (tio && tio.color === 1) {

          nodo.padre.color = 0 
          tio.color = 0
          nodo.padre.padre.color = 1
          nodo = nodo.padre.padre

        } else {

          if (nodo === nodo.padre.izquierda) {
            nodo = nodo.padre
            this.rotarDerecha(nodo)
          }
          nodo.padre.color = 0 
          nodo.padre.padre.color = 1
          this.rotarIzquierda(nodo.padre.padre)
          
        }
      }
    }

    this.raiz.color = 0 // Aseguramos que la raíz sea siempre negra
  }

  // Método encargado de eliminar un nodo del árbol
  eliminar(valor) {

    // Se busca el nodo a eliminar, si este no se encuentra, se detiene la ejecución
    valor = Number(valor)
    let nodo = this.buscarNodo(this.raiz, valor)
    if (nodo === this.nulo) return // No se encontró el nodo

    // Almacenamos el color original del nodo original, para luego determinar si es necesario arreglar
    let nodoOriginalColor = nodo.color
    let reemplazo

    // CASO 1: Nodo tiene menos de 2 hijos (uno o ninguno)
    if (nodo.izquierda === this.nulo) {

      reemplazo = nodo.derecha // Si el nodo a eliminar no tiene hijo izquierdo, se reemplaza por su hijo derecho
      this.transplantar(nodo, nodo.derecha)

    } else if (nodo.derecha === this.nulo) {

      reemplazo = nodo.izquierda // Si el nodo a eliminar no tiene hijo derecho, se reemplaza por su hijo izquierdo
      this.transplantar(nodo, nodo.izquierda)

    } else { // CASO 2: Nodo tiene ambos hijos
      
      // Buscamos al sucesor correspondiente al valor minimo del subarbol derecho
      let sucesor = this.minimo(nodo.derecha)
      nodoOriginalColor = sucesor.color // Actualizamos el color del nodo original con el del sucesor

      // Determinamos el reemplazo del sucesor
      reemplazo = sucesor.derecha
      if (sucesor.padre === nodo) { // Si el sucesor es hijo directo del nodo a eliminar
        reemplazo.padre = sucesor // Actualizamos el padre del reemplazo
      } else {
        this.transplantar(sucesor, sucesor.derecha) // Si no es hijo directo, se reemplaza el sucesor con su hijo derecho
        sucesor.derecha = nodo.derecha // se transfiere el hijo derecho del sucesor
        sucesor.derecha.padre = sucesor
      }

      // Reemplazamos el nodo a eliminar con el sucesor
      this.transplantar(nodo, sucesor)

      // Se ajustan las referencias de los hijos izquierdo y derecho del sucesor y se mantiene el color original del nodo eliminado en el sucesor
      sucesor.izquierda = nodo.izquierda
      sucesor.izquierda.padre = sucesor
      sucesor.color = nodo.color

    }

    // Si el color original del nodo eliminado era negro, se corrige el arbol
    if (nodoOriginalColor === 0) {
      this.arreglarEliminacion(reemplazo)
    }

  }

  // Método encargado de realizar la busqueda de un nodo especifico
  buscarNodo(nodo, valor) {
    while (nodo !== this.nulo && valor !== nodo.valor) {
      nodo = valor < nodo.valor ? nodo.izquierda : nodo.derecha
    }
    return nodo
  }

  // Método encargado de buscar el nodo con valor mínimo del árbol
  getMinimo(nodo = this.raiz) {
    if (this.esVacio()) return null

    while (nodo.izquierda.valor !== null) {
      nodo = nodo.izquierda
    }
    return nodo // Nodo con el valor mínimo
  }

  // Método encargado de buscar el nodo con valor máximo del árbol
  getMaximo(nodo = this.raiz) {
    if (this.esVacio()) return null

    while (nodo.derecha.valor !== null) {
      nodo = nodo.derecha
    }
    return nodo // Nodo con el valor máximo
  }

  // Método que determina si un valor especifico se encuentra dentor del árbol
  contiene(valor) {
    return this.buscarNodo(this.raiz, valor) !== this.nulo
  }

  // Método encargado de transplantar el subárbol nodoU con el subárbol de nodoV
  transplantar(nodoU, nodoV) {
    if (nodoU.padre === null) {
      this.raiz = nodoV // Si nodo U es la raíz, actualizamos la raíz a nodoV
    } else if (nodoU === nodoU.padre.izquierda) {
      nodoU.padre.izquierda = nodoV // Si nodoU es hijo izquierdo o derecho, actualizamos la referencia correspondiente
    } else {
      nodoU.padre.derecha = nodoV
    }
    nodoV.padre = nodoU.padre // Actualizamos el padre de nodoV para que apunte al padre de nodoU
  }

  // Método auxiliar que devuelve el valor mínimo en el subárbol que comienza en nodo dado
  minimo(nodo) {
    while (nodo.izquierda !== this.nulo) {
      nodo = nodo.izquierda
    }
    return nodo
  }

  // Encargado de restaurar las propiedades del árbol despues de eliminar un nodo
  arreglarEliminacion(nodo) {
    // Iteramos mientras el nodo actual no sea la raíz y su color sea negro
    while (nodo !== this.raiz && nodo.color === 0) {

      // Determinamos si el nodo es hijo izquierdo o derecho
      if (nodo === nodo.padre.izquierda) {

        // Obtenemos el hermano derecho del nodo actual
        let hermano = nodo.padre.derecha
        if (hermano.color === 1) { // Si el hermano es rojo
          hermano.color = 0 // Recoloreamos el hermano
          nodo.padre.color = 1 // Recoloreamos el padre
          this.rotarIzquierda(nodo.padre) // Rotamos el padre hacia la izquierda
          hermano = nodo.padre.derecha
        }
        if (hermano.izquierda.color === 0 && hermano.derecha.color === 0) { // Hermano negro con ambos hijos negros
          hermano.color = 1 // Recoloreamos el hermano a rojo
          nodo = nodo.padre // Nos movemos hacia arriba
        } else {

          // Hermano negro con hijos de colores mixtos
          if (hermano.derecha.color === 0) { // Si el hijo derecho del hermano es negro
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

        // Procedimiento simétrico al caso cuando el nodo es hijo izquierdo, per con direcciones invertidas
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
    
    // Aseguramos que el nodo actual sea negro
    nodo.color = 0
  }

  // Método encargado de clonar el árbol
  clonar() {
    const clonarNodo = (nodo) => {
      if (nodo === this.nulo) {
        return this.nulo // Caso base: si es un nodo nulo, devuelve el nodo nulo del nuevo árbol
      }

      // Crea un nuevo nodo con el mismo valor y color
      const nuevoNodo = new NodoRN(nodo.valor)
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

  // Recorridos
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

  altura(nodo = this.raiz) {
    if (nodo === this.nulo) {
      return -1 // La altura de un nodo nulo es 0
    }

    // Calcular la altura de los subárboles izquierdo y derecho
    const alturaIzquierda = this.altura(nodo.izquierda)
    const alturaDerecha = this.altura(nodo.derecha)

    // La altura del árbol es el mayor entre ambas + 1 (por el nodo actual)
    return Math.max(alturaIzquierda, alturaDerecha) + 1
  }
}
