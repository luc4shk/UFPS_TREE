import { ArbolRojiNegro } from '../estructuras/arboles/ArbolRojoNegro.js'

const arbol = new ArbolRojiNegro()

arbol.insertar(1)
arbol.insertar(2)
arbol.insertar(3)
console.log(arbol.convertirARNObjeto(arbol.getRaiz()))
arbol.insertar(4)
console.log('----------------------------------')
arbol.imprime()
console.log('----------------------------------')
console.log(arbol.convertirARNObjeto(arbol.getRaiz()))
arbol.eliminar(4)
console.log('----------------------------------')
arbol.imprime()
console.log('----------------------------------')
console.log(arbol.convertirARNObjeto(arbol.getRaiz()))
