import * as d3 from 'd3'
import { useState, useRef, useEffect } from 'react'
import {
  addFirstNode,
  addNodeDraw,
  showAddTree,
} from '../components/draws/ArbolBST/insertar/AddNodeDraws'
import {
  drawLinks,
  drawLinksAfter,
} from '../components/draws/ArbolBST/insertar/AddLinkDraws'
import { drawRecorrido } from '../components/draws/ArbolBST/recorrido/Recorrido'
import { drawNodes } from '../components/draws/ArbolBST/mostrar/AllNodesDraws'
import { pathNewNode } from '../components/draws/ArbolBST/path/PathNewNode'
import { drawDeleteNode } from '../components/draws/ArbolBST/eliminar/DeleteNodeDraws'

const useTreeRender = ({ tree, values, positions, setPositions, setSteps }) => {
  const [treeData, setTreeData] = useState(null)
  const [prevData, setPrevData] = useState(null)
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

  useEffect(() => {
    if (!treeData) return

    const updateTree = async () => {
      if (Object.keys(tree).length == 0) {
        setPositions({})
      }

      const root = d3.hierarchy(treeData)
      const prevRoot = d3.hierarchy(prevData)

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
        .separation(() => 1)

      treeLayout(root)
      treeLayout(prevRoot)
      svg.selectAll('*').remove() // Limpiar el SVG

      if (
        values.toAdd &&
        root.descendants().length > 3 &&
        root.find((d) => d.data.name == values.toAdd)
      ) {
        const nuevoNodo = root
          .descendants()
          .find((d) => d.data.name === values.toAdd)

        drawLinks(svg, root.links(), values, firstLoad)
        addNodeDraw(svg, root.descendants(), root, positions, values)

        const ruta = root.path(nuevoNodo)
        const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1)
        await pathNewNode(svg, rutaSinNodoNuevo, 'insertar', values, setSteps)

        svg.selectAll('*').remove() // Limpiar el SVG

        drawLinksAfter(svg, root.links(), values, firstLoad)
        showAddTree(svg, root.descendants(), root, positions, values)
        return
      } else if (values.toAdd && root.descendants().length === 3) {
        svg.selectAll('*').remove() // Limpiar el SVG
        addFirstNode(svg, root.descendants(), root, positions, values, setSteps)
        return
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
        drawLinks(svg, prevRoot.links(), values, firstLoad)
        //drawNodes2(svg, prevRoot.descendants(), prevRoot)
        drawDeleteNode(svg, prevRoot.descendants(), prevRoot, positions)

        await pathNewNode(svg, rutaSinNodoNuevo, 'eliminar', values, setSteps)

        svg.selectAll('*').remove() // Limpiar el SVG

        drawLinksAfter(svg, root.links(), values)
        drawNodes(svg, root.descendants(), root, positions, values)
        const dataTree = convertirATreeData(tree)
        setPrevData(dataTree)
        return
      }

      if (values.inorden || values.preorden || values.postorden) {
        drawRecorrido(svg, values)
      }

      if (values.toSearch) {
        const nodoBuscar = root
          .descendants()
          .find((d) => d.data.name == values.toSearch)

        const ruta = root.path(nodoBuscar)
        pathNewNode(svg, ruta, 'buscar', values, setSteps)
      }

      //Dibujamos normalmente el arbol si no hay ninguna operación
      drawLinks(svg, root.links(), values, firstLoad)
      drawNodes(svg, root.descendants(), root, positions, values)
    }

    updateTree()
    firstLoad.current = false
  }, [treeData, values])

  return { svgRef }
}

export default useTreeRender
