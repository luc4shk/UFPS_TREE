import { NodoAVL } from "../nodos/NodoAVL";
import { ArbolBinarioBusqueda } from "./ArbolBinarioBusqueda";

export class ArbolAVL extends ArbolBinarioBusqueda {
  /**
   * Crea un arbol avl.
   * @constructs
   * @param {NodoAVL} raiz - Nodo Raiz para crear el arbol.
   * */
  constructor(raiz = null) {
    super();
    this.raiz = raiz;
  }

  insertar(nuevo) {
    const n = new NodoAVL(nuevo);
    return this.insertaAVL(this.raiz, n);
  }

  insertaAVL(p, q) {
    if (this.esVacio()) {
      this.setRaiz(q);
      return true;
    }

    const comp = q.info < p.info ? -1 : q.info > p.info ? 1 : 0;

    if (comp === 0) return false; // Nodo ya existe

    if (comp < 0) {
      if (!p.izq) {
        p.izq = q;
        q.padre = p;
        this.balancear(p);
        return true;
      }
      return this.insertaAVL(p.izq, q);
    } else {
      if (!p.der) {
        p.der = q;
        q.padre = p;
        this.balancear(p);
        return true;
      }
      return this.insertaAVL(p.der, q);
    }
  }

  setRaiz(raiz) {
    this.raiz = raiz;
  }

  balancear(r) {
    this.setBalance(r);
    const balance = r.bal;

    if (balance === -2) {
      if (this.getAlturaNodo(r.izq.izq) >= this.getAlturaNodo(r.izq.der)) {
        this.rDerecha(r);
      } else {
        this.drIzqDer(r);
      }
    } else if (balance === 2) {
      if (this.getAlturaNodo(r.der.der) >= this.getAlturaNodo(r.der.izq)) {
        this.rIzquierda(r);
      } else {
        this.drDerIzq(r);
      }
    }

    if (r.padre) {
      this.balancear(r.padre);
    } else {
      this.setRaiz(r);
    }
  }

  setBalance(r) {
    r.bal = this.getAlturaNodo(r.der) - this.getAlturaNodo(r.izq);
  }

  getAlturaNodo(r) {
    if (!r) return -1;
    return 1 + Math.max(this.getAlturaNodo(r.izq), this.getAlturaNodo(r.der));
  }

  rIzquierda(r) {
    const v = r.der;
    v.padre = r.padre;

    r.der = v.izq;
    if (r.der) r.der.padre = r;

    v.izq = r;
    r.padre = v;

    if (v.padre) {
      if (v.padre.der === r) {
        v.padre.der = v;
      } else {
        v.padre.izq = v;
      }
    }

    this.setBalance(r);
    this.setBalance(v);
    return v;
  }

  rDerecha(r) {
    const v = r.izq;
    v.padre = r.padre;

    r.izq = v.der;
    if (r.izq) r.izq.padre = r;

    v.der = r;
    r.padre = v;

    if (v.padre) {
      if (v.padre.der === r) {
        v.padre.der = v;
      } else {
        v.padre.izq = v;
      }
    }

    this.setBalance(r);
    this.setBalance(v);
    return v;
  }

  drIzqDer(r) {
    r.izq = this.rIzquierda(r.izq);
    return this.rDerecha(r);
  }

  drDerIzq(r) {
    r.der = this.rDerecha(r.der);
    return this.rIzquierda(r);
  }

  eliminar(q) {
    if (this.esVacio() || !this.esta(q)) return false;
    return this.eliminarAVL(this.raiz, q);
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
    const compara = r.getInfo() - x;

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

  eliminarAVL(p, q) {
    let comp = this.compare(p.info, q);
    if (comp === 0) return this.eliminaAVL(p);
    if (comp > 0) return this.eliminarAVL(p.izq, q);
    return this.eliminarAVL(p.der, q);
  }

  eliminaAVL(nodo) {
    let s;
    if (!nodo.izq || !nodo.der) {
      if (!nodo.padre) {
        if (nodo.izq) this.setRaiz(nodo.izq);
        else if (nodo.der) this.setRaiz(nodo.der);
        else this.setRaiz(null);
        return true;
      }
      s = nodo;
    } else {
      s = this.getSucesor(nodo);
      nodo.info = s.info;
    }

    let p = s.izq || s.der;
    if (p) p.padre = s.padre;

    if (!s.padre) this.setRaiz(p);
    else {
      if (s === s.padre.izq) s.padre.izq = p;
      else s.padre.der = p;

      this.balancear(s.padre);
    }

    return true;
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

  preOrden() {
    return super.preOrden();
  }

  inOrden() {
    return super.inOrden();
  }

  postOrden() {
    return super.postOrden();
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

  getRaiz() {
    return this.raiz;
  }

  // Método encargado de buscar el nodo con valor mínimo del árbol
  getMinimo(nodo = this.raiz) {
    if (this.esVacio()) return null;

    while (nodo.izquierda.valor !== null) {
      nodo = nodo.izquierda;
    }
    return nodo; // Nodo con el valor mínimo
  }

  // Método encargado de buscar el nodo con valor máximo del árbol
  getMaximo(nodo = this.raiz) {
    if (this.esVacio()) return null;

    while (nodo.derecha.valor !== null) {
      nodo = nodo.derecha;
    }
    return nodo; // Nodo con el valor máximo
  }

  // Método que determina si un valor especifico se encuentra dentor del árbol
  contiene(valor) {
    return this.buscarNodo(this.raiz, valor) !== this.nulo;
  }

  // Método encargado de realizar la busqueda de un nodo especifico
  buscarNodo(nodo, valor) {
    while (nodo !== this.nulo && valor !== nodo.valor) {
      nodo = valor < nodo.valor ? nodo.izquierda : nodo.derecha;
    }
    return nodo;
  }

  insertarNodosAleatorios(cantidad) {
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
}
