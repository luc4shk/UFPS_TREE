import * as d3 from 'd3'

// Cambiamos la función diagonal para dibujar líneas rectas entre nodos
function diagonal(d) {
  const sourceX = d.source.x
  const targetX = d.target.x
  const sourceY = d.source.y
  const targetY = d.target.y

  // Dibuja una línea recta entre los nodos
  return `M${sourceX},${sourceY} L${targetX},${targetY}`
}

export const drawBaseLinks = (svg, links, filterFunc, durationFunc) => {
  const filteredLinks = filterFunc ? filterFunc : links

  const link = svg
    .selectAll('.link')
    .data(filteredLinks)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('stroke', 'black')
    .attr('stroke-width', '2')
    .attr('fill', 'none')
    .attr('d', (d) => {
      const sourceX = d.source.x
      const targetX = d.target.x
      const sourceY = d.source.y
      const targetY = d.target.y
      return `M${sourceX},${sourceY}L${sourceX},${sourceY}` // Inicialmente no se ve
    })
    .transition()
    .duration((d) => durationFunc(d))
    .attr('d', diagonal)
    .ease(d3.easeCircleInOut)
}
