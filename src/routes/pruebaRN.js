import { ArbolRojoNegro } from '../estructuras/arboles/ArbolRojoNegro.js'

const arbol = new ArbolRojoNegro()
arbol.insertar(4)
console.log(arbol.getRaiz())
arbol.insertar(5)
console.log(arbol.getRaiz())
arbol.insertar(6)
console.log(arbol.getRaiz())
arbol.eliminar(6)
console.log('eliminado', arbol.getRaiz())
