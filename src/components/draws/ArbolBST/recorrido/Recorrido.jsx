//Dibujar recorrido
export const drawRecorrido = (svg, values) => {
  let recorrido = values.postorden || values.preorden || values.inorden || null
  let interval = 2000

  if (recorrido) {
    // Convierte el recorrido en un array de nodos
    const recorridoArray = recorrido.replaceAll(' ', '').split('-')

    let index = 0

    const intervalId = setInterval(() => {
      if (index >= recorridoArray.length) {
        clearInterval(intervalId)
        return
      }

      const currentNode = recorridoArray[index]
      // Cambia el color del nodo actual

      svg
        .selectAll('g.node')
        .filter((d) => {
          return d.data.name == currentNode
        }) // Filtramos el nodo actual
        .select('circle')
        .transition()
        .duration(1000)
        .style('fill', (d) => {
          return currentNode == d.data.name ? '#999' : null
        })
        .style('stroke-width', '3')

      // Incrementa el índice
      index++
    }, interval)
  }
}
