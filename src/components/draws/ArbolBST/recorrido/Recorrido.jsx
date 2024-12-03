//Dibujar recorrido
import { validarElemento } from '../../utils/validarElemento'
export const drawRecorrido = (svg, values, atSelect = 'circle') => {
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

      console.log('current', currentNode)

      svg
        .selectAll('g.node')
        .filter((d) => {
          //return d.data.name == currentNode
          return validarElemento(d.data.name, String(currentNode))
        }) // Filtramos el nodo actual
        .select(atSelect)
        .transition()
        .duration(1000)
        .style('fill', (d) => {
          //return currentNode == d.data.name ? '#999' : null
          return validarElemento(d.data.name, String(currentNode))
            ? '#999'
            : null
        })
        .style('stroke-width', '3')

      // Incrementa el índice
      index++
    }, interval)
  }
}
