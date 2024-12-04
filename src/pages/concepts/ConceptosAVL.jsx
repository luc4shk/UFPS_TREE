import { TreeSlides } from "../../components/TreeSlides";


export const ConceptosAVL = () => {

    const slides = [
        {
            title: 'Árbol Binario AVL (Adelson-Velskii y Landis)',
            content: <div className="text-center"> El Árbol Binario AVL (Adelson-Velskii y Landis) es una estructura de datos de tipo árbol binario de búsqueda que incorpora un mecanismo de autobalanceo. Fue introducido en 1962 por los matemáticos soviéticos Georgy Adelson-Velskii y Evgenii Landis, quienes buscaron mejorar la eficiencia de las operaciones realizadas en los árboles binarios de búsqueda estándar, los cuales pueden volverse desequilibrados durante inserciones o eliminaciones. <br />
                <br /><b>&quot;En un árbol de búsqueda, cada nodo tiene un valor que es siempre más grande que todos los valores de los nodos a su izquierda y más pequeño que todos los valores de los nodos a su derecha.&quot;</b>
                <br /><br /> Los árboles AVL son ampliamente utilizados en algoritmos y sistemas donde la eficiencia en las búsquedas es clave, como bases de datos, sistemas de archivos y aplicaciones en tiempo real. </div>
        },
        {
            title: 'Conceptos Básicos de un árbol AVL',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Nodos</b>: Cada nodo almacena información adicional para ayudar al balanceo, como su altura o su factor de balanceo.</li>
                    <li><b>Hojas</b>: Nodos sin hijos.</li>
                    <li><b>Altura del árbol</b>: su altura siempre será proporcional al logaritmo del número de nodos (𝑂(log⁡𝑛) O(logn)).

                    </li>
                    <li><b>Equilibrio:</b> El árbol AVL es balanceado por altura, esto quiere decir que, la
                        diferencia de alturas entre los subárboles izquierdo y derecho de cualquier nodo nunca es mayor que 1.
                    </li>
                </ul>
        },
        {
            title: 'Propiedades de un Árbol AVL',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Altura controlada: </b> La altura máxima de un árbol AVL con 𝑛 nodos está limitada por 𝑂(log⁡ 𝑛) O(logn).
                        Esto evita que las operaciones se degraden como en un árbol binario de búsqueda no balanceado.
                    </li>
                    <br />
                    <li><b>Nodos con Información extra:</b> Cada nodo del árbol almacena un valor adicional, como la altura del subárbol o el factor de balanceo, para facilitar la verificación del equilibrio.
                    </li>
                    <br />
                    <li><b>Inserción y Eliminación Autobalanceadas:</b> Tras agregar un nodo, el árbol verifica y ajusta el balance mediante rotaciones.
                        al eliminar un nodo, se reajusta la estructura si es necesario para mantener el balance.
                    </li>
                </ul>
        },

        {
            title: 'Recorridos del AVL',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Inorden</b>: Se procesan los nodos en el siguiente orden, primero el subábol izquierdo luego el nodo raiz y finaliza con el subárbol derecho. Los elementos del árbol AVL se obtienen en orden ascendente
                    </li>
                    <br />
                    <li><b>Preorden</b>: Se procesan los nodos en el siguiente orden, primero el nodo raíz luego el subárbol izquierdo y finaliza con el subárbol derecho. Útil para almacenar la estructura del árbol o replicarlo

                    </li>
                    <br />
                    <li><b>Postorden</b>: Primero recorre el subárbol izquierdo, luego el derecho y finalmente el
                        nodo raíz. Esto es útil para liberar memoria (eliminar nodos) o evaluar expresiones matemáticas representadas en el árbol.
                    </li>
                </ul>
        },
        {
            title: 'Eficiencia del Árbol AVL',
            content:
                <ul className="list-disc list-inside">
                    <li> El balanceo constante asegura una altura mínima, lo que hace que los árboles AVL sean ideales para aplicaciones donde las operaciones de búsqueda sean frecuentes y críticas.
                    </li>
                    <br />
                    <li> <b>Balanceo por altura: </b> Se asegura que todas las operaciones básicas (búsqueda, inserción, eliminación) se realicen en tiempo 𝑂(log⁡𝑛) O(logn).
                    </li>
                    <br />
                    <li><b>Balanceo</b>: La diferencia de altura entre los subárboles izquierdo y derecho de cualquier nodo (denominado factor de balanceo) no puede ser mayor que 1 ni menor que -1. </li>
                </ul>
        },
        {
            title: 'Aplicaciones de los AVL',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Sistemas de archivos:</b> En sistemas operativos, los árboles AVL son útiles para organizar y acceder a archivos, pueden representar estructuras jerárquicas de directorios de forma eficiente.
                    </li>
                    <br />
                    <li><b>Motores de búsqueda:</b> Se emplean para implementar árboles de palabras o términos, optimizando la recuperación de datos o el autocompletado en motores de búsqueda, su balanceo asegura búsquedas rápidas de términos indexados.

                    </li>
                    <br />
                    <li><b>Analisis léxico y sintáctico: </b> En compiladores, los árboles AVL son útiles para almacenar tablas de símbolos o manejar gramáticas,
                        su estructura garantiza un acceso rápido y ordenado a los identificadores.
                    </li>
                    <br />
                    <li><b> Aplicaciones en tiempo real:</b> Se utilizan para organizar datos en problemas como divisiones de planos, representación de polígonos, manejo de eventos en algoritmos geométricos
                    </li>
                </ul>
        }
    ];

    return (
        <TreeSlides slides={slides}></TreeSlides>
    )

}