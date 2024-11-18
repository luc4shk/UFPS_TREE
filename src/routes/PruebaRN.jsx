import TreeRender from '../components/TreeRender'
import useArbolRojiNegro from '../hooks/useArbolRojiNegro'
import { convertirDataRN } from '../components/draws/utils/ConvertirData'
import {
  addNodeRN,
  addFirstRN,
  deleteNodeRN,
} from '../components/actions/ActionsRN'
import { drawLinksRN } from '../components/draws/ArbolRN/insertar/AddLinkDrawsRN'
import { drawNodesRN } from '../components/draws/ArbolRN/mostrar/AllNodesDrawsRN'
const PruebaRN = () => {
  const { arbolRN, raiz, values, insertarNodo, eliminarNodo } =
    useArbolRojiNegro()
  console.log('RAIZ', raiz)

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.target
          const data = new FormData(form)
          const query = data.get('toadd')
          insertarNodo(query)
        }}
      >
        <label>Insertar Número</label>
        <input
          name="toadd"
          style={{
            border: '2px solid dodgerblue',
          }}
          type="number"
        />
        <button
          style={{
            backgroundColor: 'rgba(0 ,0 ,0 ,.2)',
          }}
        >
          Añadir
        </button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.target
          const data = new FormData(form)
          const query = data.get('todelete')
          eliminarNodo(query)
        }}
      >
        <label>Delete Número</label>
        <input
          name="todelete"
          style={{
            border: '2px solid dodgerblue',
          }}
          type="number"
        />
        <button
          style={{
            backgroundColor: 'rgba(0 ,0 ,0 ,.2)',
          }}
        >
          eliminar
        </button>
      </form>
      <TreeRender
        tree={raiz ? raiz : {}}
        values={values}
        convertirData={convertirDataRN}
        actions={{
          addNode: addNodeRN,
          addFirst: addFirstRN,
          deleteNode: deleteNodeRN,
          drawLinks: drawLinksRN,
          drawNodes: drawNodesRN,
        }}
      />
    </>
  )
}

export default PruebaRN
