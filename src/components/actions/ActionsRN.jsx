import { drawDeleteNodeRN } from '../draws/ArbolRN/eliminar/DeleteNodeDrawRN'
import {
  drawLinksRN,
  drawLinksAfterRN,
} from '../draws/ArbolRN/insertar/AddLinkDrawsRN'
import {
  addNodeDrawRN,
  showAddTreeRN,
  addFirstNodeRN,
} from '../draws/ArbolRN/insertar/AddNodeDrawsRN'
import { drawNodesRN } from '../draws/ArbolRN/mostrar/AllNodesDrawsRN'
import { pathNewNodeRN } from '../draws/ArbolRN/path/PathNewNodeRN'

export const addNodeRN = async (
  root,
  svg,
  firstLoad,
  positions,
  values,
  setSteps
) => {
  const nuevoNodo = root.descendants().find((d) => d.data.name === values.toAdd)
  console.log('nuevonodo', nuevoNodo)

  drawLinksRN(svg, root.links(), values, firstLoad)
  addNodeDrawRN(svg, root.descendants(), root, positions, values)

  const ruta = root.path(nuevoNodo)
  console.log('ruta', ruta)
  const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1)
  await pathNewNodeRN(svg, rutaSinNodoNuevo, 'insertar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfterRN(svg, root.links(), values, firstLoad)
  showAddTreeRN(svg, root.descendants(), root, positions, values)
}

//Método que ejecuta la lógica para pintar el primer nodo
export const addFirstRN = (svg, root, positions, values, setSteps) => {
  svg.selectAll('*').remove() // Limpiar el SVG
  addFirstNodeRN(svg, root.descendants(), root, positions, values, setSteps)
}

//Método que ejecuta la lógica para eliminar un nodo
export const deleteNodeRN = async (
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
  drawLinksRN(svg, prevRoot.links(), values, firstLoad)
  drawDeleteNodeRN(svg, prevRoot.descendants(), prevRoot, positions)

  await pathNewNodeRN(svg, rutaSinNodoNuevo, 'eliminar', values, setSteps)

  svg.selectAll('*').remove() // Limpiar el SVG

  drawLinksAfterRN(svg, root.links(), values)
  drawNodesRN(svg, root.descendants(), root, positions, values)
  const dataTree = convertirData(tree)
  setPrevData(dataTree)
}
