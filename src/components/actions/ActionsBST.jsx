import {
  addFirstNode,
  addNodeDraw,
  showAddTree,
} from '../draws/ArbolBST/insertar/AddNodeDraws'
import {
  drawLinks,
  drawLinksAfter,
} from '../draws/ArbolBST/insertar/AddLinkDraws'
import { drawRecorrido } from '../draws/ArbolBST/recorrido/Recorrido'
import { drawNodes } from '../draws/ArbolBST/mostrar/AllNodesDraws'
import { pathNewNode } from '../draws/ArbolBST/path/PathNewNode'
import { drawDeleteNode } from '../draws/ArbolBST/eliminar/DeleteNodeDraws'

//Método que ejecuta la lógica para pintar un nodo si ya hay almenos uno
export const addNode = async (
  root,
  svg,
  firstLoad,
  positions,
  values,
  setSteps
) => {
  const nuevoNodo = root.descendants().find((d) => d.data.name === values.toAdd)

  drawLinks(svg, root.links(), values, firstLoad)
  addNodeDraw(svg, root.descendants(), root, positions, values)

  const ruta = root.path(nuevoNodo)
  const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1)
  await pathNewNode(svg, rutaSinNodoNuevo, 'insertar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfter(svg, root.links(), values, firstLoad)
  showAddTree(svg, root.descendants(), root, positions, values)
}

//Método que ejecuta la lógica para pintar el primer nodo
export const addFirst = (svg, root, positions, values, setSteps) => {
  svg.selectAll('*').remove() // Limpiar el SVG
  addFirstNode(svg, root.descendants(), root, positions, values, setSteps)
}

//Método que ejecuta la lógica para eliminar un nodo
export const deleteNode = async (
  svg,
  root,
  prevRoot,
  values,
  firstLoad,
  positions,
  setSteps,
  convertirData,
  setPrevData,
  tree
) => {
  svg.selectAll('*').remove() // Limpiar el SVG
  const nodoEliminar = prevRoot
    .descendants()
    .find((d) => d.data.name == values.toDelete)

  const ruta = prevRoot.path(nodoEliminar)
  const rutaSinNodoNuevo = ruta
  drawLinks(svg, prevRoot.links(), values, firstLoad)
  //drawNodes2(svg, prevRoot.descendants(), prevRoot)
  drawDeleteNode(svg, prevRoot.descendants(), prevRoot, positions)

  await pathNewNode(svg, rutaSinNodoNuevo, 'eliminar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfter(svg, root.links(), values)
  drawNodes(svg, root.descendants(), root, positions, values)
  const dataTree = convertirData(tree)
  setPrevData(dataTree)
}
