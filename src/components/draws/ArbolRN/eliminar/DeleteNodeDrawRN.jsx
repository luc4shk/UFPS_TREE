import {
  createNodeGroup,
  appendCircles,
  appendText,
  mergeNodes,
} from '../../utils/BaseNodeDraws'

export const drawDeleteNodeRN = (svg, nodes, root, positions) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendCircles(nodeEnter)

  circle
    .attr('stroke-width', '2')
    .attr('fill', (d) => (d.data.color === 0 ? 'black' : 'red'))

  appendText(nodeEnter).attr('fill', 'white')

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(0)
}
