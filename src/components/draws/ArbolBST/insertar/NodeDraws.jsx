//Método que dibuja todos los nodos excepto el recien agregado


const createNodeGroup = (svg, nodes, root, positions) => {
  const gNode = svg.selectAll('g.node').data(nodes, function (d, i) {
    return d.id || (d.id = i)
  })

  const nodeEnter = gNode
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      const pos = positions[d.data.name] || { x: root.x0, y: root.y0 }
      return `translate(${pos.x},${pos.y})`
    })

  return {
    gNode,
    nodeEnter,
  }
}

const appendCircles = (nodeEnter, values) => {
  const circle = nodeEnter.append('circle').attr('r', 0)

  // Animar solo el nodo que se añade
  circle
    .filter((d) => d.data.name !== values.toAdd)
    .attr('r', 25)
    .attr('stroke', 'black')
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
    .style('fill', function (d) {
      if (d.data.name === values.toAdd) return 'dodgerblue'
      return d.children || d._children ? 'lightblue' : 'lightgray'
    })
    .style('visibility', function (d) {
      return d.data.name === 'Empty' ? 'hidden' : 'visible'
    })

  return circle
}

const appendText = (nodeEnter, values) => {
  const charText = nodeEnter
    .append('text')
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => (d.data.name === values.toAdd ? 'white' : 'black'))
    .text(function (d) {
      return d.data.name
    })
    .style('visibility', function (d) {
      return d.data.name === 'Empty' ? 'hidden' : 'visible'
    })
  return charText
}

const mergeNodes = (gNode, nodeEnter, values, positions) => {
  const nodeUpdate = gNode
    .merge(nodeEnter) // Actualiza los nodos existentes y añade los nuevos
    .transition()
    .attr('transform', function (d) {
      positions[d.data.name] = { x: d.x, y: d.y } // Actualizamos la posición del nodo
      return `translate(${d.x},${d.y})`
    })

  nodeUpdate
    .select('circle')
    .attr('r', 25)
    .attr('stroke', 'black')
    .style('fill', function (d) {
      if (d.data.name === values.toAdd) return 'dodgerblue'
      return d.children || d._children ? 'lightblue' : 'lightgray'
    })

  nodeUpdate.select('text').text(function (d) {
    return d.data.name
  })

  return nodeUpdate
}

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

  appendCircles(filteredNodeEnter, values)
  appendText(filteredNodeEnter, values)
  const nodeUpdate = mergeNodes(gNode, nodeEnter, values, positions)
  nodeUpdate.duration(750)
}

export const showAddTree = (svg, nodes, root, positions, values) => {
  const { gNode, nodeEnter } = createNodeGroup(svg, nodes, root, positions)

  appendCircles(nodeEnter, values)
  appendText(nodeEnter, values)

  const nodeUpdate = mergeNodes(gNode, nodeEnter, values, positions)
  nodeUpdate
    .duration((d) => (d.data.name == values.toAdd ? 750 : 0))
    .select('circle')
    .attr('stroke-width', (d) => (d.data.name == values.toAdd ? '3' : '2'))
}

export const addFirstNode = (svg, nodes, root, positions, values, setSteps) => {
  const gNode = svg.selectAll('g.node').data(nodes, function (d, i) {
    return d.id || (d.id = i)
  })

  const nodeEnter = gNode
    .enter()
    .filter((d) => d.data.name != undefined)
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      const pos = positions[d.data.name] || { x: root.x0, y: root.y0 }
      return `translate(${pos.x},${pos.y})`
    })

  const circle = nodeEnter.append('circle').attr('r', 0)

  // Animar solo el nodo que se añade
  circle
    .attr('r', 25)
    .attr('stroke', 'black')
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
    .style('visibility', function (d) {
      return d.data.name === 'Empty' || d.data.name === undefined
        ? 'hidden'
        : 'visible'
    })

  const charText = nodeEnter
    .append('text')
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => (d.data.name === values.toAdd ? 'white' : 'black'))

  charText
    .text(function (d) {
      return d.data.name
    })
    .style('visibility', function (d) {
      return d.data.name === 'Empty' ? 'hidden' : 'visible'
    })

  // ** Merging nodes **
  const nodeUpdate = gNode
    .merge(nodeEnter) // Actualiza los nodos existentes y añade los nuevos
    .transition()
    .duration(750)
    .attr('transform', function (d) {
      positions[d.data.name] = { x: d.x, y: d.y } // Actualizamos la posición del nodo
      return `translate(${d.x},${d.y})`
    })

  nodeUpdate
    .select('circle')
    .attr('r', 25)
    .attr('stroke', 'black')
    .style('fill', function (d) {
      if (d.data.name === values.toAdd) return 'dodgerblue'
      return d.children || d._children ? 'lightblue' : 'lightgray'
    })

  nodeUpdate.select('text').text(function (d) {
    return d.data.name
  })
}
