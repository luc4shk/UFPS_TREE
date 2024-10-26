//Inspirado de Proyecto SEED - https://project-seed-ufps.vercel.app/

import { NodoBinario } from '../nodos/NodoBinario.js'

//-TODO: Realizar métodos para los Niveles

/**
 * Clase que representa un arbol binario de búsqueda (ABB).
 * @class
 * @classdesc Esta clase define un arbol binario de busqueda, que se inicializa mediante una un nodo binario raíz, a su vez se encuentran distintos métodos para trabajar con este.
 */
export class ArbolBinarioBusqueda {
  /**
   * Crea un arbol binario.
   * @constructs
   * @param {NodoBinario} raiz - Nodo Raiz para crear el arbol.
   * */
  constructor(raiz = null) {
    this.raiz = raiz
  }

  /**
   * Obtiene el nodo raiz del arbol actual.
   * @return {NodoBinario} Nodo Raiz.
   * */
  getRaiz() {
    return this.raiz
  }

  /**
   * Actualiza el nodo raiz del arbol actual.
   * @param {NodoBinario} raiz - Nuevo nodo raiz.
   * */
  setRaiz(raiz) {
    this.raiz = raiz
  }

  /**
   * Inserta un nuevo nodo en el arbol actual.
   * @param {} dato
   * @returns {Boolean} Valor para informar si se inserto o no el nodo.
   * */
  insertar(dato) {
    //Obtenemos el nodo que se va a insertar o si ya esta insertado el null
    const nuevoNodo = this.esta(dato)
      ? null
      : this.insertarNodo(this.getRaiz(), dato)

    //Si existe el nuevo nodo actualizamos la raíz
    if (nuevoNodo !== null) this.setRaiz(nuevoNodo)

    //Retornamos si se inserto o no el resultado
    return nuevoNodo !== null
  }

  /**
   * Insertar un nodo en el arbol.
   * @private
   * @param {NodoBinario} r - Nodo raíz.
   * @param {Number} dato - Valor a ingresar.
   * */
  insertarNodo(r, dato) {
    if (r === null) {
      return new NodoBinario(dato)
    }
    //Obtenemos el valor de la raíz actual
    const valorActual = r.getInfo()

    //Comparamos el valor de la raíz con el dato que vamos a ingresar.
    const compara = Number(valorActual) - Number(dato)

    //Si compara es positivo, quiere decir que es dato es menor a la raiz, por lo que va a la izquierda.
    if (compara > 0) {
      r.setIzq(this.insertarNodo(r.getIzq(), dato))

      //Si compara es negativo, quiere decir que es dato es mayor a la raiz, por lo que va a la derecha.
    } else if (compara < 0) {
      r.setDer(this.insertarNodo(r.getDer(), dato))

      //Si compara es igual a 0, quiere decir que es el mismo valor que se va a insertar.
    } else {
      console.error(`Error dato duplicado: ${dato}`)
    }

    return r
  }

  /**
   * Inserta un número de nodos con valores aleatorios entre 0 y 99 en el árbol.
   * @param {Number} cantidad - Número de nodos a insertar.
   */
  insertarNodosAleatorios(cantidad) {
    const valoresInsertados = new Set() // Conjunto para almacenar los valores ya insertados

    for (let i = 0; i < cantidad; i++) {
      let valorAleatorio

      // Generar un número aleatorio y asegurarse de que no se repita
      do {
        valorAleatorio = Math.floor(Math.random() * 100) // Genera un número aleatorio entre 0 y 99
      } while (valoresInsertados.has(valorAleatorio)) // Si el número ya ha sido insertado, genera otro

      valoresInsertados.add(valorAleatorio) // Agrega el valor al conjunto de insertados
      this.insertar(valorAleatorio) // Inserta el número aleatorio en el árbol
    }
  }

  /**
   * Vaciar el arbol.
   * */
  vaciarArbol() {
    this.setRaiz(null)
  }

  /**
   * @deprecated
   * */
  eliminar(x) {
    if (!this.esta(x)) {
      return false
    }
    const z = this.eliminarABB(this.getRaiz(), x)
    console.log('Setemos', z)
    this.setRaiz(z)
    return true
  }

  /**
   * @deprecated
   * */
  buscarMenorDerecha() {
    const array = []
    this.recorrerSubArbol(array, this.getRaiz().getDer())
    return Math.min(...array)
  }

  /**
   * Retorna el nodo menor a partir de la raiz
   * @private
   * @param {NodoBinario} r - Raíz o punto de partida
   * */
  buscarNodoMenor(r) {
    if (r.getIzq() === null) return r
    return this.buscarNodoMenor(r.getIzq())
  }

  /**
   * Retorna el nodo mayor a partir de la raiz
   * @private
   * @param {NodoBinario} r - Raíz o punto de partida
   * */
  buscarNodoMayor(r) {
    if (r.getDer() === null) return r
    return this.buscarNodoMayor(r.getDer())
  }

  /**
   * @deprecated
   * */
  recorrerSubArbol(arr, r) {
    if (r === null) return
    const x = r.getInfo()
    arr.push(x)
    this.recorrerSubArbol(arr, r.getIzq())
    this.recorrerSubArbol(arr, r.getDer())
  }

  /**
   * Elimina un nodo del arbol
   * @param {Number} dato - Valor a eliminar.
   * */
  eliminarNodo(dato) {
    if (!this.esta(dato)) return
    const result = this.eliminarArbolBB(this.getRaiz(), dato)
    this.setRaiz(result)
  }
  /**
   * Elimina un nodo del arbol.
   * @private
   * @param {NodoBinario} raiz - raíz del arbol.
   * @param {Number} dato - valor a eliminar.
   * */
  eliminarArbolBB(raiz, dato) {
    //Si la raíz es luna terminamos el proceso.
    if (raiz === null) return null

    //Comparamos el valor de la raíz con el dato a buscar.
    const comparacion = raiz.getInfo() - dato

    //Si la comparación es mayor, indica que el dato se encuentra en la izquierda.
    if (comparacion > 0) {
      //Seteamos el nuevo nodo izquierdo, pasando la función recursivamente.
      raiz.setIzq(this.eliminarArbolBB(raiz.getIzq(), dato))

      //Si la comparación es negativa, indica que el dato se encuentra en la derecha.
    } else if (comparacion < 0) {
      //Seteamos el nuevo nodo izquierdo, pasando la función recursivamente.
      raiz.setDer(this.eliminarArbolBB(raiz.getDer(), dato))

      //Si la comparación es igual a cero, indica que hemos encontrado el nodo a eliminar.
    } else {
      //Validamos si el nodo tiene hijos
      if (raiz.getDer() && raiz.getIzq()) {
        const nodoMenor = this.buscarNodoMenor(raiz.getDer()) //Obtenemos el nodo menor del subarbol derecho.
        raiz.setInfo(nodoMenor.getInfo()) //Actualizamos el valor del nodo a eliminar con el de le nodoMenor.
        raiz.setDer(this.eliminarArbolBB(raiz.getDer(), nodoMenor.getInfo())) // Elimina el nodo menor.
      } else {
        //Si existe algun hijo lo retornamos, si no retornamos null
        raiz = raiz.getDer() || raiz.getIzq() || null
      }
    }
    return raiz
  }

  /**
   * No cumple con un caso.
   * @deprecated
   * @author Marco Adarme Jaimes
   * */
  eliminarABB(r, x) {
    //Si la raiz es nula
    if (r === null) return null

    //Comparamos el valor de la raíz con el valor a ingresar
    console.log(r.getInfo(), x)
    const compara = r.getInfo() - x

    //Si la resta da positiva, significa que el dato es menor a la raíz, por lo que va a la izquierda.
    if (compara > 0) {
      console.log('Esta a la izquierda', x)
      r.setIzq(this.eliminarABB(r.getIzq(), x))

      //Si la resta da negativa, significa que el dato es mayor a la raíz, por lo que va a la derecha.
    } else if (compara < 0) {
      console.log('Esta a la derecha', x)
      r.setDer(this.eliminarABB(r.getDer(), x))

      //Si la resta es igual a 0, significa que encontramos el dato
    } else {
      console.log('Encontrado', r.getInfo(), x)
      if (r.getIzq() !== null && r.getDer() !== null) {
        const cambiar = this.masIzquierda(r.getDer())
        const aux = cambiar.getInfo()
        cambiar.setInfo(r.getInfo())
        r.setDer(this.eliminarABB(r.getDer(), aux))
      } else {
        console.log('Sin hijos')
        r = r.getIzq() !== null ? r.getIzq() : r.getDer()
        console.log('Devolvemos', r)
      }
    }
    return r
  }

  /**
   * @deprecated
   * */
  masIzquierda(r) {
    while (r.getIzq() !== null) {
      r = r.getIzq()
    }
    return r
  }

  /**
   * Buscar un nodo por su valor.
   * @param {Number} x - Valor del nodo.
   * */
  esta(x) {
    return this.estaNodo(this.getRaiz(), x)
  }

  /**
   * @private
   * Buscar un nodo por su valor (recursivo).
   * @param {NodoBinario} r - Raiz
   * @param {Number} x - Valor del nodo a buscar
   * */
  estaNodo(r, x) {
    //Si la raiz es nula signifca que no encontro el nodo.
    if (r === null) return false

    //Restamos la raíz actual con el nodo a buscar.
    const compara = r.getInfo() - x

    if (compara > 0) {
      //Valor de raiz - Valor a buscar > 0-> El valor se encuentra hacia la izquierda.
      return this.estaNodo(r.getIzq(), x)
    } else if (compara < 0) {
      //Valor de raiz - Valor a buscar < 0 -> El valor se encuentra hacia la derecha.
      return this.estaNodo(r.getDer(), x)
    } else {
      //Valor de raiz - Valor a buscar == 0 -> Es el valor que estamos buscando.
      return true
    }
  }

  /**
   * Buscar un nodo por su valor.
   * @param {Number} info - Valor a buscar
   * */
  buscar(info) {
    return this.buscarNodo(this.getRaiz(), info)
  }

  /**
   * Buscar un nodo por su valor.
   * @private
   * @returns {NodoBinario} El nodo que se ha encontrado.
   * */
  buscarNodo(r, info) {
    if (r === null) return null
    if (r.getInfo() === info) return r
    const aux = this.buscarNodo(r.getIzq(), info)
    return aux !== null ? aux : this.buscarNodo(r.getDer(), info)
  }

  /**
   * Imprimir el arbol binario de búsqueda
   * */
  imprimir() {
    console.log('----- Arbol Binario de Busqueda -----')
    this.imprimirNodo(this.getRaiz())
  }

  /**
   * Imprimir
   * @private
   * */
  imprimirNodo(n) {
    if (n === null) return
    const l = n.getIzq() ? n.getIzq().getInfo() : null
    const r = n.getDer() ? n.getDer().getInfo() : null
    console.log(`NodoIzq: ${l}\t Info: ${n.getInfo()}\t NodoDer: ${r}`)
    this.imprimirNodo(n.getIzq())
    this.imprimirNodo(n.getDer())
  }

  /**
   * Contar las hojas del arbol binario de búsqueda.
   * @returns {Number} número de hojas
   * */
  contarHojas() {
    return this.contarHojasNodo(this.getRaiz())
  }

  /**
   * Contar las hojas de un nodo.
   * @private
   * */
  contarHojasNodo(n) {
    //Retornamos cuando ya no haya mas nodos
    if (n === null) return 0
    //Validamos si NO tiene hijos, quiere decir que es una hoja y retornamos uno.
    if (n.getIzq() === null && n.getDer() === null) {
      return 1
    }
    //Retornamos la suma de el subarbol izquierdo y el derecho
    return this.contarHojasNodo(n.getIzq()) + this.contarHojasNodo(n.getDer())
  }

  getPeso() {
    return this.getPesoNodo(this.getRaiz())
  }

  getPesoNodo(n) {
    if (n === null) return 0
    return 1 + this.getPesoNodo(n.getIzq()) + this.getPesoNodo(n.getDer())
  }

  /**
   * Saber si el arbol esta vacío.
   * @returns {Boolean} Un booleano que indica si esta vació o no.
   * */
  esVacio() {
    return this.getRaiz() === null
  }

  /**
   * Obtener la altura del arbol.
   * @returns {Number} Altura del arbol.
   * */
  getAltura() {
    return this.getAlturaNodo(this.getRaiz())
  }

  /**
   * Obtener la altura del nodo.
   * @private
   * @param {NodoBinario} n - Nodo a buscar altura.
   * */
  getAlturaNodo(n) {
    //Cuando no hayan mas nodos retornamos -1
    if (n === null) return -1

    //Llamamos recursivamente hasta encontrar el último nodo izquierdo
    const alturaIzq = this.getAlturaNodo(n.getIzq())

    //Llamamos recursivamente hasta encontrar el último nodo derechog
    const alturaDer = this.getAlturaNodo(n.getDer())

    //Hallamos el máximo entre las dos alturas obtenidas y le adicionamos una unidad.
    return Math.max(alturaIzq, alturaDer) + 1
  }

  /**
   * Clona el arbol binario de búsqueda.
   * @returns {ArbolBinarioBusqueda} Nuevo Árbol clonado
   * */
  clonar() {
    const nuevoArbol = new ArbolBinarioBusqueda()
    nuevoArbol.setRaiz(this.clonarABB(this.getRaiz()))
    return nuevoArbol
  }

  /**
   * Clona el arbol binario de busqueda
   * @param {NodoBinario} raiz - Raíz del arbol a clonar
   * @return {NodoBinario} Todos los nodos del arbol clonado
   * */
  clonarABB(r) {
    if (r === null) return null
    return new NodoBinario(
      r.getInfo(),
      this.clonarABB(r.getIzq()),
      this.clonarABB(r.getDer())
    )
  }

  /**
   * Devuelve el recorrido Pre-orden.
   * @returns {String} Cadena con el recorrido
   * */
  preOrden() {
    const array = []
    const preOrdenArray = this.preOrdenNodo(this.getRaiz(), array)
    return preOrdenArray?.join(' - ')
  }

  /**
   * Devuelve el recorrido Pre-orden
   * @private
   * @param {NodoBinario} raiz - Raíz del arbol.
   * @param {Array} array - Array para devolver los números.
   * @return {Array} Arreglo con el recorrido.
   * */
  preOrdenNodo(raiz, array) {
    //Verificamos que la raíz no sea nul
    if (raiz === null) return

    //Agregamos el valor de la raiz actual al arreglo.
    array.push(raiz.getInfo())

    //Verificamos que exista un nodo izquierdo
    if (raiz.getIzq()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo izquierdo
      this.preOrdenNodo(raiz.getIzq(), array)
    }

    //Verificamos que exista un nodo derecho
    if (raiz.getDer()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo derecho
      this.preOrdenNodo(raiz.getDer(), array)
    }

    //Retornamos el arreglo con el orden del recorrido
    return array
  }

  /**
   * Devuelve el recorrido In-Orden.
   * @returns {String} Cadena con el recorrido.
   * */
  inOrden() {
    const array = []
    const inOrdenArray = this.inOrdenNodo(this.getRaiz(), array)
    return inOrdenArray?.join(' - ')
  }

  /**
   * Devuelve el recorrido In-Orden.
   * @private
   * @returns {Array} Arreglo con el recorrido.
   * */
  inOrdenNodo(raiz, array) {
    //Verificamos que la raíz no sea nul
    if (raiz === null) return

    //Verificamos que exista un nodo izquierdo
    if (raiz.getIzq()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo izquierdo.
      this.inOrdenNodo(raiz.getIzq(), array)
    }

    //Agregamos el valor de la raiz actual al arreglo.
    array.push(raiz.getInfo())

    //Verificamos que exista un nodo derecho
    if (raiz.getDer()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo derecho
      this.inOrdenNodo(raiz.getDer(), array)
    }

    //Retornamos el arreglo con el orden del recorrido.
    return array
  }

  /**
   * Devuelve el recorrido Post-Orden.
   * @returns {String} Cadena con el recorrido.
   * */
  postOrden() {
    const array = []
    const postOrdenArray = this.postOrdenNodo(this.getRaiz(), array)
    return postOrdenArray?.join(' - ')
  }

  /**
   * Devuelve el recorrido In-Orden.
   * @private
   * @returns {Array} Arreglo con el recorrido.
   * */
  postOrdenNodo(raiz, array) {
    //Verificamos que la raíz no sea nula
    if (raiz === null) return

    //Verificamos que exista un nodo izquierdo
    if (raiz.getIzq()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo izquierdo.
      this.postOrdenNodo(raiz.getIzq(), array)
    }

    //Verificamos que exista un nodo derecho
    if (raiz.getDer()) {
      //Llamamos recursivamente hasta encontrar el ultimo nodo derecho
      this.postOrdenNodo(raiz.getDer(), array)
    }

    //Agregamos el valor de la raiz actual al arreglo.
    array.push(raiz.getInfo())

    //Retornamos el arreglo con el orden del recorrido.
    return array
  }
}
