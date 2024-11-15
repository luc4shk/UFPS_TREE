import {
  createNodeGroup,
  appendCircles,
  appendText,
  mergeNodes,
} from '../../utils/BaseNodeDraws'
// Función para dibujar todos los nodos totales
export const drawNodesRN = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendCircles(nodeEnter)

  circle
    .attr('stroke-width', '2')
    .attr('fill', (d) => (d.data.color === 0 ? 'black' : 'red'))
  appendText(nodeEnter).attr('fill', 'white')

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)

  nodeUpdate.duration(() => {
    if (values.toDelete || values.randomNodes) {
      return 750
    } else {
      return 0
    }
  })
}
