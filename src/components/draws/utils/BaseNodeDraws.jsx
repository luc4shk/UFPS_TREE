//Método para crear los nodos
export const createNodeGroup = (svg, nodes, root, positions) => {
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

//Método para dibujar los circulos de cada nodo
export const appendCircles = (nodeEnter, filterFunc, withNulls = false) => {
  let circle = nodeEnter.append('circle').attr('r', 0)

  //Validamos si hay una funcion para filtrar
  if (filterFunc) {
    circle = circle.filter(filterFunc)
  }
  // Animar solo el nodo que se añade
  circle
    .attr('r', 25)
    .attr('stroke', 'black')
    .style('visibility', function (d) {
      if (withNulls) {
        return d.data.name === undefined ? 'hidden' : 'visible'
      }
      return d.data.name === 'Empty' || d.data.name === undefined
        ? //||
          //d.data.name === null
          'hidden'
        : 'visible'
    })

  return circle
}

//Método para dibujar el texto de cada nodo
export const appendText = (nodeEnter) => {
  const charText = nodeEnter
    .append('text')
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .text(function (d) {
      return d.data.name
    })
    .style('visibility', function (d) {
      return d.data.name === 'Empty' ? 'hidden' : 'visible'
    })
  return charText
}

//Método para hacer la fusión entre cada arbol
export const mergeNodes = (gNode, nodeEnter, positions) => {
  const nodeUpdate = gNode
    .merge(nodeEnter) // Actualiza los nodos existentes y añade los nuevos
    .transition()
    .attr('transform', function (d) {
      positions[d.data.name] = { x: d.x, y: d.y } // Actualizamos la posición del nodo
      return `translate(${d.x},${d.y})`
    })

  nodeUpdate.select('circle').attr('r', 25).attr('stroke', 'black')

  nodeUpdate.select('text').text(function (d) {
    return d.data.name
  })

  return nodeUpdate
}
