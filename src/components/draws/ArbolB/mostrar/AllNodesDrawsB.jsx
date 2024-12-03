import {
  createNodeGroup,
  appendCircles,
  appendRectangles,
  appendText,
  mergeNodes,
} from '../../utils/BaseNodeDraws'
import { validarElemento } from '../../utils/validarElemento'
// Función para dibujar todos los nodos totales
export const drawNodesB = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendRectangles(nodeEnter)

  circle.attr('stroke-width', '2').style('fill', 'lightblue')

  appendText(nodeEnter)

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)

  nodeUpdate.duration(() => {
    if (values.toDelete || values.randomNodes) {
      return 750
    } else {
      return 0
    }
  })
}
