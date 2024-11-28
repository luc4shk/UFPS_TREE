import { NodoAVL } from "../nodos/NodoAVL.js";
// import { ArbolBinarioBusqueda } from "./ArbolBinarioBusqueda.js";

export class ArbolAVL {
  /**
   * Crea un arbol avl.
   * @constructs
   * @param {NodoAVL} raiz - Nodo Raiz para crear el arbol.
   * */
  constructor(raiz = null) {
    this.raiz = raiz;
  }

  insertar(info) {
    this.raiz = this._insertarNodo(this.raiz, info);
  }

  _insertarNodo(nodo, info) {
    // Caso base: si el nodo es nulo, crear un nuevo NodoAVL
    if (nodo === null) {
      return new NodoAVL(info);
    }

    // Insertar en el subárbol izquierdo o derecho según el valor
    if (info < nodo.info) {
      nodo.izq = this._insertarNodo(nodo.izq, info);
    } else if (info > nodo.info) {
      nodo.der = this._insertarNodo(nodo.der, info);
    } else {
      // Los valores duplicados no se permiten en un árbol AVL
      return nodo;
    }

    // Actualizar el balance del nodo actual
    nodo.setBalance(this._getAltura(nodo.izq) - this._getAltura(nodo.der));

    // Realizar las rotaciones necesarias para balancear el árbol
    return this._balancear(nodo);
  }

  _balancear(nodo) {
    // Rotación simple a la derecha
    if (nodo.getBalance() > 1 && nodo.izq.getBalance() >= 0) {
      return this._rotarDerecha(nodo);
    }

    // Rotación simple a la izquierda
    if (nodo.getBalance() < -1 && nodo.der.getBalance() <= 0) {
      return this._rotarIzquierda(nodo);
    }

    // Rotación doble izquierda-derecha
    if (nodo.getBalance() > 1 && nodo.izq.getBalance() < 0) {
      nodo.izq = this._rotarIzquierda(nodo.izq);
      return this._rotarDerecha(nodo);
    }

    // Rotación doble derecha-izquierda
    if (nodo.getBalance() < -1 && nodo.der.getBalance() > 0) {
      nodo.der = this._rotarDerecha(nodo.der);
      return this._rotarIzquierda(nodo);
    }

    return nodo; // No necesita balanceo
  }

  _rotarDerecha(y) {
    const x = y.izq;
    const T2 = x.der;

    // Rotación
    x.der = y;
    y.izq = T2;

    // Actualizar balances
    y.setBalance(this._getAltura(y.izq) - this._getAltura(y.der));
    x.setBalance(this._getAltura(x.izq) - this._getAltura(x.der));

    return x; // Nueva raíz
  }

  _rotarIzquierda(x) {
    const y = x.der;
    const T2 = y.izq;

    // Rotación
    y.izq = x;
    x.der = T2;

    // Actualizar balances
    x.setBalance(this._getAltura(x.izq) - this._getAltura(x.der));
    y.setBalance(this._getAltura(y.izq) - this._getAltura(y.der));

    return y; // Nueva raíz
  }

  _getAltura(nodo) {
    if (nodo === null) {
      return 0;
    }
    return Math.max(this._getAltura(nodo.izq), this._getAltura(nodo.der)) + 1;
  }

  /**
   * Actualiza el nodo raiz del arbol actual.
   * @param {NodoAVL} raiz - Nuevo nodo raiz.
   * */
  setRaiz(raiz) {
    this.raiz = raiz;
  }

  /**
   * Obtiene el nodo raiz del arbol actual.
   * @return {NodoAVL} Nodo Raiz.
   * */
  getRaiz() {
    return this.raiz;
  }

  setBalance(r) {
    r.bal = this.getAlturaNodo(r.der) - this.getAlturaNodo(r.izq);
  }

  getAlturaNodo(r) {
    if (!r) return -1;
    return 1 + Math.max(this.getAlturaNodo(r.izq), this.getAlturaNodo(r.der));
  }

  esVacio() {
    return this.getRaiz() === null;
  }

  /**
   * Buscar un nodo por su valor.
   * @param {Number} x - Valor del nodo.
   * */
  esta(x) {
    return this.estaNodo(this.getRaiz(), x);
  }

  /**
   * @private
   * Buscar un nodo por su valor (recursivo).
   * @param {NodoAVL} r - Raiz
   * @param {Number} x - Valor del nodo a buscar
   * */
  estaNodo(r, x) {
    //Si la raiz es nula signifca que no encontro el nodo.
    if (r === null) return false;

    //Restamos la raíz actual con el nodo a buscar.
    const compara = r.info - x;

    if (compara > 0) {
      //Valor de raiz - Valor a buscar > 0-> El valor se encuentra hacia la izquierda.
      return this.estaNodo(r.getIzq(), x);
    } else if (compara < 0) {
      //Valor de raiz - Valor a buscar < 0 -> El valor se encuentra hacia la derecha.
      return this.estaNodo(r.getDer(), x);
    } else {
      //Valor de raiz - Valor a buscar == 0 -> Es el valor que estamos buscando.
      return true;
    }
  }

  // Método público para eliminar un nodo
  eliminar(valor) {
    this.raiz = this._eliminarNodo(this.raiz, valor);
  }

  // Método recursivo para eliminar un nodo específico y balancear hacia arriba
  _eliminarNodo(nodo, valor) {
    if (!nodo) return null; // Nodo no encontrado

    // Buscar el nodo a eliminar
    if (valor < nodo.info) {
      nodo.izq = this._eliminarNodo(nodo.izq, valor);
    } else if (valor > nodo.info) {
      nodo.der = this._eliminarNodo(nodo.der, valor);
    } else {
      // Caso 1: Nodo sin hijos
      if (!nodo.izq && !nodo.der) {
        return null;
      }

      // Caso 2: Nodo con un solo hijo
      if (!nodo.izq) {
        return nodo.der;
      }
      if (!nodo.der) {
        return nodo.izq;
      }

      // Caso 3: Nodo con dos hijos
      const sucesor = this._encontrarMinimo(nodo.der);
      nodo.info = sucesor.info; // Reemplazar el valor del nodo con el del sucesor
      nodo.der = this._eliminarNodo(nodo.der, sucesor.info); // Eliminar el sucesor
    }

    // Actualizar balance del nodo actual
    nodo.setBalance(this._getAltura(nodo.izq) - this._getAltura(nodo.der));

    // Balancear el nodo actual si es necesario y continuar hacia arriba
    return this._balancear(nodo);
  }

  // Método para encontrar el nodo con el valor mínimo en un subárbol
  _encontrarMinimo(nodo) {
    while (nodo.izq) {
      nodo = nodo.izq;
    }
    return nodo;
  }

  getSucesor(nodo) {
    if (nodo.der) {
      let r = nodo.der;
      while (r.izq) r = r.izq;
      return r;
    } else {
      let p = nodo.padre;
      while (p && nodo === p.der) {
        nodo = p;
        p = nodo.padre;
      }
      return p;
    }
  }

  compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /**
   * Obtener la altura del arbol.
   * @returns {Number} Altura del arbol.
   * */
  getAltura() {
    return this.getAlturaNodo(this.getRaiz());
  }

  clonar() {
    const nuevoArbol = new ArbolAVL();
    nuevoArbol.setRaiz(this.clonarAVL(this.getRaiz()));
    return nuevoArbol;
  }

  /**
   * Clona el arbol avl
   * @param {NodoAVL} raiz - Raíz del arbol a clonar
   * @return {NodoAVL} Todos los nodos del arbol clonado
   * */
  clonarAVL(r) {
    if (r === null) return null;
    return new NodoAVL(
      r.getInfo(),
      this.clonarAVL(r.getIzq()),
      this.clonarAVL(r.getDer())
    );
  }

  /**
   * Retoran el valor del nodo menor
   * @returns {Number} Valor del nodo menor
   * */
  getMinimo() {
    const node = this.buscarNodoMenor(this.raiz)
    console.log("menor", node);
    return node?.info
  }

  /**
   * Retorna el nodo menor a partir de la raiz
   * @private
   * @param {NodoAVL} r - Raíz o punto de partida
   * */
  buscarNodoMenor(r) {
    if (r === null) return
    if (r.izq === null) return r
    return this.buscarNodoMenor(r.izq)
  }

  /**
   * Retoran el valor del nodo mayor
   * @returns {Number} Valor del nodo mayor
   * */
  getMaximo() {
    const node = this.buscarNodoMayor(this.raiz)
    console.log("mayor", node);
    return node?.info
  }

  /**
   * Retorna el nodo mayor a partir de la raiz
   * @private
   * @param {NodoAVL} r - Raíz o punto de partida
   * */
  buscarNodoMayor(r) {
    if (r === null) return
    if (r.der === null) return r
    return this.buscarNodoMayor(r.der)
  }

  // // Método encargado de buscar el nodo con valor máximo del árbol
  // getMaximo(nodo = this.raiz) {
  //   if (this.esVacio()) return null;

  //   while (nodo.der) {
  //     nodo = nodo.der;
  //   }
  //   console.log("MÁXIMO", nodo)
  //   return nodo;// Nodo con el valor máximo
  // }

  // Método que determina si un valor especifico se encuentra dentor del árbol
  contiene(valor) {
    return this.buscarNodo(this.getRaiz(), valor);
  }

  // Método encargado de realizar la busqueda de un nodo especifico
  buscarNodo(r, valor) {
    if (r === null) return null;
    if (r.getInfo() === valor) return r;
    const aux = this.buscarNodo(r.getIzq(), valor);
    return aux !== null ? aux : this.buscarNodo(r.getDer(), valor);
  }

  insertarNodosAleatorios(cantidad) {
    console.log("CANTIDAD", cantidad);
    const valoresInsertados = new Set(); // Conjunto para almacenar los valores ya insertados

    for (let i = 0; i < cantidad; i++) {
      let valorAleatorio;

      // Generar un número aleatorio y asegurarse de que no se repita
      do {
        valorAleatorio = Math.floor(Math.random() * 99) + 1; // Genera un número aleatorio entre 1 y 99
      } while (valoresInsertados.has(valorAleatorio)); // Si el número ya ha sido insertado, genera otro

      valoresInsertados.add(valorAleatorio); // Agrega el valor al conjunto de insertados
      this.insertar(valorAleatorio); // Inserta el número aleatorio en el árbol Rojo-Negro
    }
  }

  // Vacía el árbol asignando la raíz a un nodo nulo
  vaciar() {
    this.raiz = this.nulo;
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
