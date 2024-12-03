import {
  addFirstNode,
  addNodeDraw,
  showAddTree,
} from '../draws/ArbolB/insertar/AddNodeDrawsB'
import {
  drawLinksB,
  drawLinksAfterB,
} from '../draws/ArbolB/insertar/AddLinkDrawsB'
import { pathNewNodeB } from '../draws/ArbolB/path/PathNewNodeB'
import { drawNodesB } from '../draws/ArbolB/mostrar/AllNodesDrawsB'
import { drawDeleteNodeB } from '../draws/ArbolB/eliminar/DeleteNodeDrawsB'
import { validarElemento } from '../draws/utils/validarElemento'

//Método que ejecuta la lógica para pintar un nodo si ya hay almenos uno
export const addNodeB = async (
  root,
  svg,
  firstLoad,
  positions,
  values,
  setSteps
) => {
  const nuevoNodo = root
    .descendants()
    .find((d) => validarElemento(d.data.name, values.toAdd))

  drawLinksB(svg, root.links(), values, firstLoad)
  addNodeDraw(svg, root.descendants(), root, positions, values)

  const ruta = root.path(nuevoNodo)
  const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1)
  await pathNewNodeB(svg, rutaSinNodoNuevo, 'insertar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfterB(svg, root.links(), values, firstLoad)
  showAddTree(svg, root.descendants(), root, positions, values)
}

//Método que ejecuta la lógica para pintar el primer nodo
export const addFirstB = (svg, root, positions, values, setSteps) => {
  svg.selectAll('*').remove() // Limpiar el SVG
  addFirstNode(svg, root.descendants(), root, positions, values, setSteps)
}

//Método que ejecuta la lógica para eliminar un nodo
export const deleteNodeB = async (
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
    .find((d) => validarElemento(d.data.name, values.toDelete))

  const ruta = prevRoot.path(nodoEliminar)
  const rutaSinNodoNuevo = ruta
  drawLinksB(svg, prevRoot.links(), values, firstLoad)
  drawDeleteNodeB(svg, prevRoot.descendants(), prevRoot, positions)

  await pathNewNodeB(svg, rutaSinNodoNuevo, 'eliminar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfterB(svg, root.links(), values)
  drawNodesB(svg, root.descendants(), root, positions, values)
  const dataTree = convertirData(tree)
  setPrevData(dataTree)
}
