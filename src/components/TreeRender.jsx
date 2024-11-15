import { useContext } from 'react'
import { StepsContext } from '../context/StepsContext'
import useTreeRender from '../hooks/useTreeRender'
import { convertirDataBST } from './draws/utils/ConvertirData'

export default function TreeRender({ tree, values, convertirData, actions }) {
  const { positions, setSteps, setPositions } = useContext(StepsContext)
  const { svgRef } = useTreeRender({
    tree,
    values,
    positions,
    setPositions,
    setSteps,
    convertirData,
    actions,
  })

  return (
    <div>
      <svg id="tree-svg" ref={svgRef}></svg>
    </div>
  )
}
