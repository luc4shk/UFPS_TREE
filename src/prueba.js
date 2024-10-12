import { ArbolBinarioBusqueda } from "./estructuras/arboles/ArbolBinarioBusqueda.js";
const arbol = new ArbolBinarioBusqueda();

arbol.insertar(50);
arbol.insertar(40);
arbol.insertar(41);
arbol.insertar(42);
arbol.insertar(43);
arbol.insertar(44);
arbol.insertar(45);

console.log(arbol.imprimir());
console.log(arbol.getRaiz());
console.log(arbol.buscar(10));
console.log(arbol.preOrden());
console.log(arbol.inOrden());
console.log(arbol.postOrden());
console.log(arbol.getAltura());
