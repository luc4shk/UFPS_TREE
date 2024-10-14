import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export default function TreeRender({ tree }) {
  const [treeData, setTreeData] = useState(null)

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
    setTreeData(convertirATreeData(tree))
  }, [tree])

  useEffect(() => {
    if (!treeData) return

    const root = d3.hierarchy(treeData)
    const width = 628
    const height = 416
    const margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    }

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

    // Añadir márgenes al tamaño del SVG
    const links = svg
      .selectAll('.link')
      .data(
        root
          .links()
          .filter(
            (link) =>
              link.source.data.name !== 'Empty' &&
              link.target.data.name !== 'Empty'
          )
      )
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', (d) => {
        const sourceX = d.source.x
        const targetX = d.target.x
        const sourceY = d.source.y
        const targetY = d.target.y
        return `M${sourceX},${sourceY}L${sourceX},${sourceY}` // Inicialmente no se ve
      })
      .transition()
      .duration(2000)
      .attr('d', diagonal)
      .ease(d3.easeCircleInOut)

    drawNodes(svg, root.descendants())
  }, [treeData])

  // Función para dibujar los nodos (circles)
  const drawNodes = (svg, nodes) => {
    const gNode = svg.selectAll('g.node').data(nodes, function (d, i) {
      return d.id || (d.id = i)
    })

    const nodeEnter = gNode
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return `translate(${d.x},${d.y})`
      })

    const circle = nodeEnter.append('circle').attr('r', 0)

    // Dibuja el círculo con animación, pero ocultando los nodos "vacíos"
    circle
      .transition()
      .delay((d, i) => i * 80)
      .attr('r', 25)
      .style('fill', function (d) {
        return d.children || d._children ? 'lightblue' : 'lightgray'
      })
      .style('visibility', function (d) {
        return d.data.name === 'Empty' ? 'hidden' : 'visible'
      })
      .duration(200)
      .ease(d3.easeBackOut)

    const charText = nodeEnter
      .append('text')
      .attr('y', 5)
      .attr('text-anchor', 'middle')

    // Muestra el texto solo si el nodo no es "Empty"
    charText
      .transition()
      .delay((d, i) => i * 90)
      .text(function (d) {
        return d.data.name
      })
      .style('visibility', function (d) {
        return d.data.name === 'Empty' ? 'hidden' : 'visible'
      })
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

  return (
    <div>
      <svg id="tree-svg"></svg>
    </div>
  )
}
