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
      const posKey =
        d.data.name === null && d.parent
          ? `${d.parent.data.name}-null-${d.parent.children.indexOf(d)}`
          : d.data.name

      const pos = positions[posKey] || { x: root.x0, y: root.y0 }
      return `translate(${pos.x},${pos.y})`
      //const pos = positions[d.data.name] || { x: root.x0, y: root.y0 }
      //return `translate(${pos.x},${pos.y})`
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
        ? 'hidden'
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
      return d.data.name === 'Empty' || d.data.name === ''
        ? 'hidden'
        : 'visible'
    })
  return charText
}

//Método para hacer la fusión entre cada arbol
export const mergeNodes = (gNode, nodeEnter, positions) => {
  const nodeUpdate = gNode
    .merge(nodeEnter) // Actualiza los nodos existentes y añade los nuevos
    .transition()
    .attr('transform', function (d) {
      // Generamos un identificador único para nodos nulos
      const key =
        d.data.name === null && d.parent
          ? `${d.parent.data.name}-null-${d.parent.children.indexOf(d)}`
          : d.data.name

      // Guardamos la posición del nodo
      positions[key] = { x: d.x, y: d.y }

      return `translate(${d.x},${d.y})`
    })

  nodeUpdate.select('circle').attr('r', 25).attr('stroke', 'black')

  nodeUpdate.select('text').text(function (d) {
    return d.data.name
  })

  return nodeUpdate
}

// Método para dibujar los rectángulos de cada nodo
export const appendRectangles = (nodeEnter, filterFunc, withNulls = false) => {
  let rect = nodeEnter.append('rect').attr('width', 0).attr('height', 0)

  // Validamos si hay una función para filtrar
  if (filterFunc) {
    rect = rect.filter(filterFunc)
  }

  // Animar solo el nodo que se añade
  rect
    .attr('width', 100) // Ancho del rectángulo
    .attr('height', 30) // Alto del rectángulo
    .attr('x', -50) // Ajusta la posición horizontal para centrar
    .attr('y', -15) // Ajusta la posición vertical para centrar
    .attr('stroke', 'black')
    .style('visibility', function (d) {
      if (withNulls) {
        return d.data.name === undefined ? 'hidden' : 'visible'
      }
      console.log('data', d)
      return d.data.name === 'Empty' ||
        d.data.name === undefined ||
        d.data.name === '' ||
        d.data.name === null
        ? 'hidden'
        : 'visible'
    })

  return rect
}
