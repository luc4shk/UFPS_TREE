import {
  createNodeGroup,
  appendCircles,
  appendText,
  mergeNodes,
} from '../../utils/BaseNodeDraws'

//Método para añadir un nuevo nodo
export const addNodeDraw = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(
    svg,
    nodes,
    root,
    positions,
    values
  )

  const filteredNodeEnter = nodeEnter.filter(
    (d) => d.data.name !== values.toAdd
  )

  const circle = appendCircles(filteredNodeEnter)
  circle.style('fill', 'lightblue').attr('stroke-width', '2')

  const chartText = appendText(filteredNodeEnter, values)
  chartText.attr('fill', 'black')

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(750)
}

//Método para mostrar la animación con el nuevo nodo
export const showAddTree = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendCircles(nodeEnter, (d) => d.data.name !== values.toAdd)

  circle.attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
  const chartText = appendText(nodeEnter, values)

  chartText.attr('fill', (d) =>
    d.data.name === values.toAdd ? 'white' : 'black'
  )

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate
    .select('circle')
    .duration((d) => (d.data.name == values.toAdd ? 750 : 0))
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
    .style('fill', function (d) {
      if (d.data.name === values.toAdd) return 'dodgerblue'
      return d.children || d._children ? 'lightblue' : 'lightgray'
    })
}

//Método para usar cunando no haya ningun arbol y se tenga que añadir el primer nodo
export const addFirstNode = (svg, nodes, root, positions, values, setSteps) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const filteredNodeEnter = nodeEnter.filter((d) => d.data.name != undefined)

  const circle = appendCircles(filteredNodeEnter)

  circle
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
    .style('fill', function (d) {
      if (d.data.name === values.toAdd) {
        setSteps((prev) => [
          ...prev,
          <>
            <br />
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              Insertando {values.toAdd}...
            </span>
          </>,
        ])

        return 'dodgerblue'
      }
      return d.children || d._children ? 'lightblue' : 'lightgray'
    })

  const chartText = appendText(nodeEnter, values)
  chartText.attr('fill', (d) =>
    d.data.name === values.toAdd ? 'white' : 'black'
  )
  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(750)
}
