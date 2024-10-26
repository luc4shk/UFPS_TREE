import * as d3 from 'd3'
import { useEffect, useState, useRef, useContext } from 'react'
import { StepsContext } from '../context/StepsContext'
import {
  addFirstNode,
  addNodeDraw,
  showAddTree,
} from './draws/ArbolBST/insertar/NodeDraws'

export default function TreeRender({ tree, values }) {
  const [treeData, setTreeData] = useState(null)
  const [prevData, setPrevData] = useState(null)
  const [positions, setPositions] = useState({}) // Objeto para almacenar las posiciones de los nodos
  const { setSteps } = useContext(StepsContext) // Objeto para almacenar las posiciones de los nodos
  const svgRef = useRef(null)
  const firstLoad = useRef(true)

  // Función para convertir el árbol de datos en formato jerárquico
  const convertirATreeData = (node) => {
    if (!node) return null

    const children = []

    if (node.izq) {
      children.push(convertirATreeData(node.izq))
    } else {
      // Si el hijo izquierdo es null, añadimos un nodo invisible
      children.push({
        name: 'Empty', // Nodo invisible
        children: [],
      })
    }

    if (node.der) {
      children.push(convertirATreeData(node.der))
    } else {
      // Si el hijo derecho es null, añadimos un nodo invisible
      children.push({
        name: 'Empty', // Nodo invisible
        children: [],
      })
    }

    return {
      name: node.info,
      children: children.filter((child) => child !== null), // Filtra nodos null
    }
  }

  // Cada vez que el árbol cambie, lo convertimos a la estructura jerárquica
  useEffect(() => {
    const dataTree = convertirATreeData(tree)
    setTreeData((prev) => {
      setPrevData(prev)
      return dataTree
    })
  }, [tree])

  const marcarCamino = (node) => {
    if (!node) return
    node.data.isPath = true // Marca este nodo
    if (node.parent) {
      marcarCamino(node.parent) // Repite recursivamente para el nodo padre
    }
  }

  useEffect(() => {
    if (!treeData) return

    const updateTree = async () => {
      const root = d3.hierarchy(treeData)
      const prevRoot = d3.hierarchy(prevData)
      const nuevoNodo = root
        .descendants()
        .find((d) => d.data.name === values.toAdd)

      if (nuevoNodo) {
        marcarCamino(nuevoNodo) // Marca el camino desde el nodo nuevo hasta la raíz
      }

      const width = 628
      const height = 416
      const margin = { top: 50, right: 50, bottom: 50, left: 50 }
      const svgWidth = width + margin.left + margin.right
      const svgHeight = height + margin.top + margin.bottom

      d3.select('#tree-svg').selectAll('*').remove()
      const svg = d3
        .select('#tree-svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const treeLayout = d3
        .tree()
        .size([width, height])
        .separation((a, b) => 1)

      treeLayout(root)
      treeLayout(prevRoot)

      if (values.toAdd && root.descendants().length > 3) {
        drawLinks(svg, root.links(), values)
        //        drawNodes(svg, root.descendants(), root)
        addNodeDraw(svg, root.descendants(), root, positions, values)

        const ruta = root.path(nuevoNodo)
        const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1)
        // Luego llama a pathNewNode y espera su finalización
        await pathNewNode(svg, rutaSinNodoNuevo, root.links(), 'insertar')

        svg.selectAll('*').remove() // Limpiar el SVG
        // Finalmente, dibuja el root actual
        drawLinks2(svg, root.links(), values)
        //drawNodes2(svg, root.descendants(), root)
        showAddTree(svg, root.descendants(), root, positions, values)
      } else if (values.toAdd && root.descendants().length === 3) {
        addFirstNode(svg, root.descendants(), root, positions, values, setSteps)
      }

      if (
        values.toDelete &&
        prevRoot.find((d) => d.data.name == values.toDelete)
      ) {
        svg.selectAll('*').remove() // Limpiar el SVG
        const nodoEliminar = prevRoot
          .descendants()
          .find((d) => d.data.name == values.toDelete)

        const ruta = prevRoot.path(nodoEliminar)
        const rutaSinNodoNuevo = ruta
        drawLinks(svg, prevRoot.links(), values)
        drawNodes2(svg, prevRoot.descendants(), prevRoot)

        await pathNewNode(svg, rutaSinNodoNuevo, null, 'eliminar')

        svg.selectAll('*').remove() // Limpiar el SVG
        drawLinks2(svg, root.links(), values)
        drawNodes(svg, root.descendants(), root)
        const dataTree = convertirATreeData(tree)
        setPrevData(dataTree)
      }

      if (values.inorden || values.preorden || values.postorden) {
        drawRecorrido(svg, values)
      }

      if (values.toSearch) {
        const nodoBuscar = root
          .descendants()
          .find((d) => d.data.name == values.toSearch)

        const ruta = root.path(nodoBuscar)
        pathNewNode(svg, ruta, null, 'buscar')
      }

      drawLinks(svg, root.links(), values)
      drawNodes(svg, root.descendants(), root)

      //drawLinks(svg, root.links(), values)
      //        drawNodes(svg, root.descendants(), root)
      //addFirstNode(svg, root.descendants(), root, positions, values, setSteps)
    }

    updateTree()
    firstLoad.current = false
  }, [treeData, values])
  // Función para dibujar los nodos (circles)
  const drawNodes = (svg, nodes, root) => {
    const gNode = svg.selectAll('g.node').data(nodes, function (d, i) {
      return d.id || (d.id = i)
    })

    const nodeEnter = gNode
      .enter()
      .filter((d) => d.data.name !== values.toAdd)
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        // Valores por defecto para evitar `undefined`
        const pos = positions[d.data.name] || { x: 0, y: 0 }
        return `translate(${pos.x},${pos.y})`
      })

    const circle = nodeEnter.append('circle').attr('r', 0)

    // Animar solo el nodo que se añade
    circle
      .filter((d) => d.data.name !== values.toAdd)
      .attr('r', 25)
      .attr('stroke', (d) => (d.data.isPath ? 'black' : 'black'))
      .attr('stroke-width', (d) => (d.data.name === values.toAdd ? '3' : '2'))
      .style('fill', function (d) {
        if (d.data.name === values.toAdd) return 'dodgerblue'
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
      .attr('stroke', (d) => (d.data.isPath ? 'black' : 'black'))
      .style('fill', function (d) {
        if (d.data.name === values.toAdd) return 'dodgerblue'
        return d.children || d._children ? 'lightblue' : 'lightgray'
      })

    nodeUpdate.select('text').text(function (d) {
      return d.data.name
    })
  }

  const drawNodes2 = (svg, nodes, root) => {
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

    const circle = nodeEnter.append('circle').attr('r', 0)

    // Animar solo el nodo que se añade
    circle
      .filter((d) => d.data.name !== values.toAdd)
      .attr('r', 25)
      .attr('stroke', (d) => (d.data.isPath ? 'black' : 'black'))
      .attr('stroke-width', (d) => (d.data.name === values.toAdd ? '3' : '2'))
      .style('fill', function (d) {
        if (d.data.name === values.toAdd) return 'dodgerblue'
        return d.children || d._children ? 'lightblue' : 'lightgray'
      })
      .style('visibility', function (d) {
        return d.data.name === 'Empty' ? 'hidden' : 'visible'
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
      .duration((d) => (d.data.name == values.toAdd ? 750 : 0))
      .attr('transform', function (d) {
        positions[d.data.name] = { x: d.x, y: d.y } // Actualizamos la posición del nodo
        return `translate(${d.x},${d.y})`
      })

    nodeUpdate
      .select('circle')
      .attr('r', 25)
      .attr('stroke', (d) => (d.data.isPath ? 'black' : 'black'))
      .style('fill', function (d) {
        if (d.data.name === values.toAdd) return 'dodgerblue'
        return d.children || d._children ? 'lightblue' : 'lightgray'
      })

    nodeUpdate.select('text').text(function (d) {
      return d.data.name
    })
  }

  // Función para dibujar los enlaces (links)
  const drawLinks2 = (svg, links, values) => {
    const link = svg
      .selectAll('.link')
      .data(
        links.filter(
          (link) =>
            link.source.data.name !== 'Empty' &&
            link.target.data.name !== 'Empty'
        )
      )
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('stroke', (d) =>
        d.source.data.isPath && d.target.data.isPath ? '#000' : '#000'
      )
      .attr('stroke-width', (d) =>
        d.source.data.isPath && d.target.data.isPath ? '2' : '2'
      )
      .attr('fill', 'none')
      .attr('d', (d) => {
        const sourceX = d.source.x
        const targetX = d.target.x
        const sourceY = d.source.y
        const targetY = d.target.y
        return `M${sourceX},${sourceY}L${sourceX},${sourceY}` // Inicialmente no se ve
      })
      .transition()
      .duration((d) => {
        if (values.toDelete) return 2000
        return d.target.data.name === values.toAdd ? 2000 : 0
      })
      .attr('d', diagonal)
      .ease(d3.easeCircleInOut)
  }

  // Función para dibujar los enlaces (links)
  const drawLinks = (svg, links, values) => {
    const link = svg
      .selectAll('.link')
      .data(
        links.filter(
          (link) =>
            link.source.data.name !== 'Empty' &&
            link.target.data.name !== 'Empty' &&
            !(
              link.source.data.name == values.toAdd ||
              link.target.data.name == values.toAdd
            )
        )
      )
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('stroke', (d) =>
        d.source.data.isPath && d.target.data.isPath ? '#000' : '#000'
      )
      .attr('stroke-width', (d) =>
        d.source.data.isPath && d.target.data.isPath ? '2' : '2'
      )
      .attr('fill', 'none')
      .attr('d', (d) => {
        const sourceX = d.source.x
        const targetX = d.target.x
        const sourceY = d.source.y
        const targetY = d.target.y
        return `M${sourceX},${sourceY}L${sourceX},${sourceY}` // Inicialmente no se ve
      })
      .transition()
      .duration((d) => {
        if (firstLoad.current || values.toAdd || values.randomNodes) {
          return d.target.data.name === values.toAdd ? 2000 : 1000
        } else {
          return d.target.data.name === values.toAdd ? 2000 : 0
        }
      })
      .attr('d', diagonal)
      .ease(d3.easeCircleInOut)
  }

  // Cambiamos la función diagonal para dibujar líneas rectas entre nodos
  function diagonal(d) {
    const sourceX = d.source.x
    const targetX = d.target.x
    const sourceY = d.source.y
    const targetY = d.target.y

    // Dibuja una línea recta entre los nodos
    return `M${sourceX},${sourceY} L${targetX},${targetY}`
  }

  const pathNewNode = (svg, nodes, links, action) => {
    return new Promise((resolve) => {
      setSteps([])
      const interval = 2000 // 2 segundos
      let index = 0 // Para llevar el seguimiento del nodo actual

      // Filtramos los nodos que tienen la propiedad isPath = true
      //const pathNodes = nodes.filter((d) => d.data.isPath)
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
          .select('circle')
          .transition()
          .duration(400)
          .style('fill', (d) => {
            if (values.toAdd == d.data.name) return 'dodgerblue'
            if (values.toDelete == d.data.name) return 'tomato'
            if (values.toSearch == d.data.name) return 'violet'
            return '#999'
          })
          .style('stroke-width', (d) => {
            if (action === 'insertar') {
              doAddSteps(values.toAdd, d, 'Insertando')
            }
            if (action === 'eliminar') {
              doDeleteSteps(values.toDelete, d)
            }
            if (action === 'buscar') {
              doSearchSteps(values.toSearch, d)
            }
            return values.toAdd === d.data.name ? 'black' : 'black'
          })

        // Avanzamos al siguiente nodo para la siguiente iteración
        index++
      }, interval)
    })
  }

  const drawRecorrido = (svg, values) => {
    let recorrido =
      values.postorden || values.preorden || values.inorden || null
    let interval = 2000

    if (recorrido) {
      const nodes = svg.selectAll('g.node')

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
        {
          /*.on('end', function () {
            d3.select(this) // Seleccionamos el círculo actual
              .transition()
              .duration(8000)
              .style('fill', 'lightblue') // Cambiamos el fill a blanco
          })*/
        }

        // Incrementa el índice
        index++
      }, interval)

      // Cambia el color cada 2 segundos

      // Limpiar el intervalo cuando ya no sea necesario (puedes usar un efecto en un componente si es React)
      // clearInterval(intervalId);
    }
  }

  const doAddSteps = (value, d, text) => {
    if (Number(value > d.data.name)) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
          <span style={{ color: 'red', fontWeight: 'bold' }}>Ir Derecha</span>
        </>,
      ])
    } else if (Number(value < d.data.name)) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E  \u274C \n \t`}
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            Ir Izquierda
          </span>
        </>,
      ])
    }
    if (
      d.data.children[0].name == value ||
      (d.data.children[1].name == value && values)
    ) {
      setSteps((prev) => [
        ...prev,
        <>
          <br />
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            {text} {value}...
          </span>
        </>,
      ])
    }
  }

  const doDeleteSteps = (value, d, i) => {
    // Primero, verifica si el nodo actual coincide con el valor a eliminar
    if (d.data.name === value) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} == ${d.data.name} \u279E \u2705 \n \t`}
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            Eliminando {value}...
          </span>
        </>,
      ])
      return // Salir si se encontró el nodo
    } else {
      // Si no coincide, muestra que son diferentes
      setSteps((prev) => [
        ...prev,
        <>{`${value} == ${d.data.name} \u274C \t`}</>,
      ])
    }

    // Luego verifica si el nodo actual es mayor o menor
    if (Number(value) > Number(d.data.name)) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
          <span
            style={{ color: 'red', fontWeight: 'bold' }}
          >{`Ir Derecha \n \n`}</span>
        </>,
      ])
    } else {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E \u274C \n \t`}
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            {`Ir Izquierda \n \n`}
          </span>
        </>,
      ])
    }
  }

  const doSearchSteps = (value, d) => {
    // Primero, verifica si el nodo actual coincide con el valor a eliminar
    if (d.data.name === value) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} == ${d.data.name} \u279E \u2705 \n \t`}
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            Nodo encontrado
          </span>
        </>,
      ])
      return // Salir si se encontró el nodo
    } else {
      // Si no coincide, muestra que son diferentes
      setSteps((prev) => [
        ...prev,
        <>{`${value} == ${d.data.name} \u274C \t`}</>,
      ])
    }

    // Luego verifica si el nodo actual es mayor o menor
    if (Number(value) > Number(d.data.name)) {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
          <span
            style={{ color: 'red', fontWeight: 'bold' }}
          >{`Ir Derecha \n \n`}</span>
        </>,
      ])
    } else {
      setSteps((prev) => [
        ...prev,
        <>
          {`${value} > ${d.data.name} \u279E \u274C \n \t`}
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            {`Ir Izquierda \n \n`}
          </span>
        </>,
      ])
    }
  }

  return (
    <div>
      <svg id="tree-svg" ref={svgRef}></svg>
    </div>
  )
}

