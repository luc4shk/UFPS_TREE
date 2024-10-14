import { LayoutTree } from '../../components/LayoutTree'
import TreeRender from '../../components/TreeRender'
import useArbolBST from '../../hooks/useArbolBST'

export const PracticaArbolBST = () => {
  const { numbers, raiz, insertarNodo, removerNodo, vaciarArbol } =
    useArbolBST()

  return (
    <LayoutTree
      title={'Árbol BST'}
      containerColor={'#7e22ce'}
      linkColor={'#7e22ce'}
    >
      <div className="absolute">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            const query = data.get('query')
            insertarNodo(query)
          }}
        >
          <input type="text" name="query" />
          <button>Añadir</button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            const query = data.get('query')
            removerNodo(query)
          }}
        >
          <input type="number" name="query" />
          <button>Eliminar</button>
        </form>
        <button onClick={vaciarArbol}>Eliminar Arbol</button>
      </div>
      {raiz && <TreeRender tree={raiz} number={numbers} />}
    </LayoutTree>
  )
}
