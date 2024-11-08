import { useContext } from 'react'
import { StepsContext } from '../context/StepsContext'
import useTreeRender from '../hooks/useTreeRender'

export default function TreeRender({ tree, values }) {
  const { positions, setSteps, setPositions } = useContext(StepsContext)
  const { svgRef } = useTreeRender({
    tree,
    values,
    positions,
    setPositions,
    setSteps,
  })

  return (
    <div>
      <svg id="tree-svg" ref={svgRef}></svg>
    </div>
  )
}
