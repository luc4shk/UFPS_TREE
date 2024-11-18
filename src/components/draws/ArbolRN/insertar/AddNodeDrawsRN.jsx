import {
  createNodeGroup,
  appendCircles,
  appendText,
  mergeNodes,
} from '../../utils/BaseNodeDraws'

//Método para añadir un nuevo nodo
export const addNodeDrawRN = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(
    svg,
    nodes,
    root,
    positions,
    values
  )

  const filteredNodeEnter = nodeEnter.filter(
    (d) =>
      d.data.name !== values.toAdd && // No es el nodo que estamos agregando
      !(d.parent && d.parent.data.name === values.toAdd && d.data.name == null)
  )

  const circle = appendCircles(filteredNodeEnter, null)
  circle
    .style('fill', (d) => {
      return d.data.color === 0 ? 'black' : 'red'
    })
    .attr('stroke-width', '2')

  const chartText = appendText(filteredNodeEnter, values)
  chartText.attr('fill', 'white')

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(750)
  nodeUpdate.select('circle').attr('fill', 'purple')
}

//Método para mostrar la animación con el nuevo nodo
export const showAddTreeRN = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  const circle = appendCircles(
    nodeEnter,
    (d) =>
      d.data.name !== values.toAdd && // No es el nodo que estamos agregando
      !(d.parent && d.parent.data.name === values.toAdd && d.data.name == null)
  )

  circle.attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
  const chartText = appendText(nodeEnter, values)

  chartText.attr(
    'fill',
    (d) =>
      //    d.data.name === values.toAdd ? 'white' : 'black'
      'white'
  )

  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate
    .select('circle')
    .duration((d) => (d.data.name === values.toAdd ? 750 : 0))
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
    .style('fill', function (d) {
      return d.data.color === 0 ? 'black' : 'red'
    })
}

//Método para usar cunando no haya ningun arbol y se tenga que añadir el primer nodo
export const addFirstNodeRN = (
  svg,
  nodes,
  root,
  positions,
  values,
  setSteps
) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  //const filteredNodeEnter = nodeEnter.filter((d) => d.data.name != undefined)

  const circle = appendCircles(nodeEnter, null, null)

  circle
    .transition()
    .duration('750')
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '2' : '2'))
    .style('fill', (d) => {
      if (d.data.name === values.toAdd) {
        setSteps((prev) => [
          //...prev,
          <>
            <br />
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              Insertando {values.toAdd}...
            </span>
          </>,
        ])

        return 'red'
      }
      //return 'black'
    })

  const chartText = appendText(nodeEnter, values)
  chartText.attr('fill', (d) =>
    d.data.name === values.toAdd ? 'white' : 'black'
  )
  const nodeUpdate = mergeNodes(gNode, nodeEnter, positions)
  nodeUpdate.duration(750)
}
