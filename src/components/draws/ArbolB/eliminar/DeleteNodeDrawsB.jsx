import {
  createNodeGroup,
  appendCircles,
  appendText,
  mergeNodes,
  appendRectangles,
} from '../../utils/BaseNodeDraws'

export const drawDeleteNodeB = (svg, nodes, root, positions) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendRectangles(nodeEnter)

  circle.attr('stroke-width', '2').style('fill', 'lightblue')

  appendText(nodeEnter)

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(0)
}
