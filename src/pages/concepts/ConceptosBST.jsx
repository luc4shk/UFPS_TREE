import { TreeSlides } from "../../components/TreeSlides";


export const ConceptosBST = () => {

    const slides = [
        {
            title: 'Árbol Binario de Búsqueda',
            content: <div className="text-center">Un árbol binario de búsqueda es una estructura ordenada de datos donde cada nodo tiene un valor que es siempre más grande que todos los valores de los nodos a su izquierda y más pequeño que todos los valores de los nodos a su derecha.<br/><br/><b>&quot;En un árbol de búsqueda, cada nodo tiene un valor que es siempre más grande que todos los valores de los nodos a su izquierda y más pequeño que todos los valores de los nodos a su derecha.&quot;</b><br/><br/>Esto hace que sea eficiente para operaciones de búsqueda, ya que en cada paso se descarta la mitad de los nodos en promedio.</div>
        },
        {
            title: 'Conceptos Básicos',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Nodos</b>: Cada nodo contiene un valor, un puntero al hijo izquierdo y uno al hijo derecho.</li>
                    <li><b>Hojas</b>: Nodos sin hijos.</li>
                    <li><b>Altura del árbol</b>: La distancia máxima de la raíz a una hoja, que afecta la eficiencia de las operaciones</li>
                    <li><b>Equilibrio:</b> El balance es importante para mantener la eficiencia. los BST no
                    balanceados pueden acercarse a la complejidad de una lista.</li>
                </ul>
        },
        {
            title: 'Propiedades de un Árbol Binario de Búsqueda',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Propiedad de orden</b>: El subárbol izquierdo de un nodo contiene valores menores, y el subárbol derecho contiene valores mayores.
                    </li>
                    <br />
                    <li><b>Sin duplicados</b>: Un BST no permite valores duplicados para simplificar las operaciones de búsqueda.
                    </li>
                    <br />
                    <li><b>Eficiencia de búsqueda, inserción y eliminación</b>: En un BST equilibrado, todas estas operaciones pueden realizarse en un tiempo promedio de O(log⁡n).</li>
                </ul>
        },
        {
            title: 'Operaciones Básicas en un BST',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Inserción</b>: Comienza desde la raíz y, de acuerdo con el valor, se mueve hacia la
                        izquierda o derecha hasta encontrar la posición adecuada para el nuevo nodo.
                    </li>
                    <br />
                    <li><b>Búsqueda</b>:  Para buscar un valor, se compara desde la raíz, moviéndose a la
                        izquierda si el valor es menor, o a la derecha si es mayor, hasta encontrar el valor o
                        llegar a una hoja.
                    </li>
                    <br />
                    <li>
                        <b>Eliminación</b>: Existen tres casos posibles para eliminar un nodo:
                        <ol className="list-decimal list-inside">
                            <li><b>Nodo sin hijos</b>: Se elimina directamente.</li>
                            <li><b>Nodo con un hijo</b>: Se elimina el nodo y se reemplaza por su hijo.</li>
                            <li><b>Nodo con dos hijos</b>: Se encuentra el sucesor (o el predecesor), se intercambian los valores y se elimina el sucesor.</li>
                        </ol>
                    </li>
                    <br />
                    <li>
                        <b>Mínimo y máximo</b>: En un BST, el valor mínimo se encuentra al seguir el subárbol izquierdo hasta el final, mientras que el valor máximo se encuentra al seguir el subárbol derecho.
                    </li>
                </ul>
        },
        {
            title: 'Recorridos',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Inorden</b>: : Recorrido que visita primero el subárbol izquierdo, luego el nodo actual y
                        finalmente el subárbol derecho. En un BST, este recorrido da como resultado los
                        elementos en orden ascendente.
                    </li>
                    <br />
                    <li><b>Preorden</b>: Primero visita el nodo actual, luego el subárbol izquierdo y finalmente el
                        derecho.

                    </li>
                    <br />
                    <li><b>Postorden</b>: Primero recorre el subárbol izquierdo, luego el derecho y finalmente el
                        nodo actual.
                    </li>
                </ul>  
        },
        {
            title: 'Eficiencia de los BST',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Complejidad de tiempo</b>: Para inserción, búsqueda y eliminación, O(log n) en un árbol balanceado, pero O(n) en el peor de los casos (por ejemplo, cuando el árbol se convierte en una lista enlazada).
                    </li>
                    <br />
                    <li><b>Balanceo</b>: Los BST no garantizan un balanceo automático, y pueden desbalancearse. Para árboles siempre balanceados, se utilizan variantes como AVL o árboles Red-Black.
                    </li>
                </ul>  
        },
        {
            title: 'Aplicaciones de los BST',
            content: 
                <ul className="list-disc list-inside">
                    <li><b>Sistemas de archivos</b>: : Para buscar y organizar archivos de manera eficiente.
                    </li>
                    <br />
                    <li><b>Bases de datos</b>: Indexación de datos.

                    </li>
                    <br />
                    <li><b>Procesos de compilación</b>: Utilizados en algoritmos de parsing y compilación.
                    </li>
                    <br />
                    <li><b>Inteligencia Artificial y juegos</b>:  En la toma de decisiones y minimización de búsquedas en grandes espacios de estado.
                    </li>
                </ul>  
        }
    ];

    return (
        <TreeSlides slides={slides}></TreeSlides>
    )

}
