import { validarElemento } from '../../utils/validarElemento'

export const pathNewNodeB = (svg, nodes, action, values, setSteps) => {
  return new Promise((resolve) => {
    setSteps([])
    const interval = 2000 // 2 segundos
    let index = 0 // Para llevar el seguimiento del nodo actual

    const pathNodes = nodes

    // Iniciamos el intervalo
    const intervalId = setInterval(() => {
      // Si ya llegamos al final de los nodos, detenemos el intervalo
      if (index >= pathNodes.length) {
        resolve() // Resolvemos la promesa
        clearInterval(intervalId)
        return
      }

      // Seleccionamos el nodo en la posición actual
      const currentNode = pathNodes[index]

      svg
        .selectAll('g.node')
        .filter((d) => d === currentNode) // Filtramos el nodo actual
        .select('rect')
        .transition()
        .duration(400)
        .style('fill', (d) => {
          if (validarElemento(d.data.name, values.toAdd)) return 'dodgerblue'
          if (validarElemento(d.data.name, values.toDelete)) return 'orange'
          if (validarElemento(d.data.name, values.toSearch)) return 'violet'
          return '#999'
        })
        .style('stroke-width', (d) => {
          if (action === 'insertar') {
            doAddSteps(values.toAdd, d, 'Insertando', setSteps, values)
          }
          if (action === 'eliminar') {
            doDeleteSteps(values.toDelete, d, 'Eliminando', setSteps)
          }
          if (action === 'buscar') {
            doSearchSteps(values.toSearch, d, setSteps)
          }
          return values.toAdd === d.data.name ? 'purple' : 'purple'
        })

      // Avanzamos al siguiente nodo para la siguiente iteración
      index++
    }, interval)
  })
}

const doAddSteps = (value, d, text, setSteps, values) => {
  // Dividimos la cadena en partes separadas por '|'
  const elements = d.data.name.split('|').map((el) => el.trim())

  // Bandera para determinar la dirección
  let direction = null

  // Iteramos por cada elemento del nodo y evaluamos
  elements.forEach((element, index) => {
    if (String(value) === element) {
      // Si el valor coincide con un elemento del nodo
      setSteps((prev) => [
        ...prev,
        <>
          {`Valor actual: ${element} \u279E \u2705`}
          <br />
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            {text} {value} encontrado...
          </span>
        </>,
      ])
      direction = null // No se mueve en ninguna dirección, ya se encontró
      //return
    } else {
      const comparison = String(value).localeCompare(element)
      if (comparison < 0 && direction === null) {
        direction = 'Izquierda' // Ir izquierda si es menor
      } else if (comparison > 0) {
        direction = 'Derecha' // Ir derecha si es mayor
      } else {
        direction = 'Centro'
      }
    }

    // Mostrar evaluación paso a paso dentro del nodo
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} ${value < element ? '<' : '>'} ${element} \u279E ${
          value < element ? '\u274C' : '\u2705'
        }`}
      </>,
    ])
  })

  // Mostrar la dirección final después de evaluar toda la cadena
  if (direction) {
    setSteps((prev) => [
      ...prev,
      <>
        <span
          style={{
            color: direction === 'Izquierda' ? 'blue' : 'red',
            fontWeight: 'bold',
          }}
        >
          Continuar {direction}
        </span>
      </>,
    ])
  }

  // Validación en los hijos
  if (
    d.data.children &&
    d.data.children.some(
      (child) =>
        child.name
          .split('|')
          .map((el) => el.trim())
          .includes(String(value)) && values
    )
  ) {
    setSteps((prev) => [
      ...prev,
      <>
        <br />
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          {text} {value}
        </span>
      </>,
    ])
  }
}

const doDeleteSteps = (value, d, text, setSteps) => {
  // Verificamos si el nombre contiene más de un elemento separado por '|'
  let elements
  if (d.data.name.length > 1 && d.data.name.includes('|')) {
    elements = d.data.name.split('|').map((el) => el.trim())
  } else {
    elements = [d.data.name.trim()] // En caso de ser un único valor
  }

  // Bandera para determinar la dirección
  let direction = null
  let found = false // Variable para saber si ya hemos encontrado y eliminado el valor

  // Iteramos por cada elemento del nodo y evaluamos
  elements.forEach((element) => {
    if (!found && String(value) === element) {
      // Si el valor coincide con un elemento del nodo
      setSteps((prev) => [
        ...prev,
        <>
          {`Valor actual: ${element} \u279E \u2705`}
          <br />
          <span style={{ color: 'orange', fontWeight: 'bold' }}>
            {value} encontrado.
            <br />
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              Eliminando...
            </span>
          </span>
        </>,
      ])
      direction = null // No se mueve en ninguna dirección, ya se encontró
      found = true // Marcamos que ya encontramos el valor y no seguimos comparando
    } else if (!found) {
      // Solo hacemos comparaciones si el valor no ha sido encontrado aún
      const comparison = String(value).localeCompare(element)
      if (comparison < 0 && direction === null) {
        direction = 'Izquierda' // Ir izquierda si es menor
      } else if (comparison > 0) {
        direction = 'Derecha' // Ir derecha si es mayor
      }
    }

    // Mostrar evaluación paso a paso dentro del nodo
    if (!found) {
      // Solo mostramos comparaciones si no hemos encontrado el valor
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} ${value < element ? '<' : '>'} ${element} \u279E ${
            value < element ? '\u274C' : '\u2705'
          }`}
        </>,
      ])
    }
  })

  // Mostrar la dirección final después de evaluar toda la cadena
  if (direction && !found) {
    // No mostramos dirección si ya se eliminó el valor
    setSteps((prev) => [
      ...prev,
      <span
        style={{
          color: direction === 'Izquierda' ? 'blue' : 'red',
          fontWeight: 'bold',
        }}
      >
        Continuar {direction}.
      </span>,
    ])
  }
}

//Pasoso para buscar un nodo
const doSearchSteps = (value, d, setSteps) => {
  // Verificamos si el nombre contiene más de un elemento separado por '|'
  let elements
  if (d.data.name.length > 1 && d.data.name.includes('|')) {
    elements = d.data.name.split('|').map((el) => el.trim())
  } else {
    elements = [d.data.name.trim()] // En caso de ser un único valor
  }

  // Bandera para determinar la dirección
  let direction = null
  let found = false // Variable para saber si ya hemos encontrado y eliminado el valor

  // Iteramos por cada elemento del nodo y evaluamos
  elements.forEach((element) => {
    if (!found && String(value) === element) {
      // Si el valor coincide con un elemento del nodo
      setSteps((prev) => [
        ...prev,
        <>
          {`Valor actual: ${element} \u279E \u2705`}
          <br />
          <span style={{ color: 'orange', fontWeight: 'bold' }}>
            {value} encontrado.
          </span>
        </>,
      ])
      direction = null // No se mueve en ninguna dirección, ya se encontró
      found = true // Marcamos que ya encontramos el valor y no seguimos comparando
    } else if (!found) {
      // Solo hacemos comparaciones si el valor no ha sido encontrado aún
      const comparison = String(value).localeCompare(element)
      if (comparison < 0 && direction === null) {
        direction = 'Izquierda' // Ir izquierda si es menor
      } else if (comparison > 0) {
        direction = 'Derecha' // Ir derecha si es mayor
      }
    }

    // Mostrar evaluación paso a paso dentro del nodo
    if (!found) {
      // Solo mostramos comparaciones si no hemos encontrado el valor
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} ${value < element ? '<' : '>'} ${element} \u279E ${
            value < element ? '\u274C' : '\u2705'
          }`}
        </>,
      ])
    }
  })

  // Mostrar la dirección final después de evaluar toda la cadena
  if (direction && !found) {
    // No mostramos dirección si ya se eliminó el valor
    setSteps((prev) => [
      ...prev,
      <span
        style={{
          color: direction === 'Izquierda' ? 'blue' : 'red',
          fontWeight: 'bold',
        }}
      >
        Continuar {direction}.
      </span>,
    ])
  }
}
