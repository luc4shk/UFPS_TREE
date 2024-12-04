import { TreeSlides } from "../../components/TreeSlides";


export const ConceptosB = () => {

    const slides = [
        {
            title: 'Árbol B y B+',
            content: <div className="text-center"> El árbol B+ es una estructura de datos de árbol balanceado que se utiliza comúnmente en sistemas de bases de datos y sistemas de archivos para manejar grandes volúmenes de datos.<br />
                <br /><b>&quot; sus características principales lo hacen eficiente para operaciones de búsqueda, inserción y eliminación en grandes conjuntos de datos. &quot;</b>
            </div>
        },
        {
            title: 'Conceptos Básicos de un árbol B y B+',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Nodos:</b> No contienen datos asociados a las claves, tienen al menos ⌈m/2⌉ hijos (donde m es el grado del árbol) y como máximo m hijos. </li>
                    <li><b>Hojas:</b> Están interconectadas mediante punteros, lo que permite recorrer las claves de forma secuencial sin necesidad de regresar a los nodos internos.</li>
                    <li><b>Altura del árbol:</b> La altura del árbol es logarítmica respecto al número total de claves (n), y se calcula aproximadamente como: h=⌈log ⌈m/2⌉​n⌉

                    </li>
                    <li><b>Equilibrio:</b> Todos los nodos cumplen con restricciones de capacidad,
                        los nodos internos tienen al menos ⌈m/2⌉ y como máximo m hijos,
                        los nodos hoja tienen entre ⌈m/2⌉ y m claves, excepto cuando el árbol tiene muy pocas claves.

                    </li>
                </ul>
        },
        {
            title: 'Propiedades de un Árbol B y B+',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Balanceo automatico: </b> El árbol B+ está siempre balanceado,
                        todos los caminos desde la raíz hasta las hojas tienen la misma longitud (altura uniforme),
                        esto garantiza tiempos consistentes para búsquedas, inserciones y eliminaciones.

                    </li>
                    <br />
                    <li><b>Inserción y Eliminación Autobalanceadas:</b> Las de inserción, las claves nuevas se insertan en los nodos hoja,
                        si un nodo hoja se llena, se divide y una clave se promueve al nodo padre y las de eliminación, las claves se eliminan de los nodos hojas,
                        si un nodo cae por debajo de la capacidad mínima, se redistribuyen las claves con los nodos hermanos o se fusionan nodos.
                    </li>
                    <br />
                    <li><b>Orden:</b> Cada nodo puede tener como máximo m hijos (orden del árbol),
                        cada nodo interno (excepto la raíz) tiene al menos ⌈m/2⌉ hijos,
                        el número de claves en un nodo siempre es uno menos que el número de hijos.


                    </li>
                </ul>
        },

        {
            title: 'Recorridos del Árbol B y B+',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Inorden:</b> sigue el orden natural de las claves, procesando las claves de menor a mayor,
                        desde la raíz, desciende hacia el nodo hoja más a la izquierda, se
                        procesa las claves en los nodos hoja de izquierda a derecha, utilizando los enlaces entre nodos hoja,
                        no es necesario visitar los nodos internos en este recorrido, ya que las claves relevantes están en las hojas.

                    </li>
                    <br />
                    <li><b>Preorden</b>:  Recorre las claves de arriba hacia abajo, procesando primero los nodos internos y luego las hojas.

                    </li>
                    <br />
                    <li><b>Postorden</b>: Recorre primero las hojas y luego los nodos internos, este orden es inverso al recorrido preorden.

                    </li>
                </ul>
        },
        {
            title: 'Eficiencia del Árbol B y B+',
            content:
                <ul className="list-disc list-inside">
                    <li> Su rendimiento consistente y optimización para almacenamiento en disco son ventajas clave en comparación con otras estructuras de árboles.
                    </li>
                    <br />
                    <li> <b>Almacenamiento: </b> Los nodos del Árbol B+ están diseñados para ajustarse al tamaño de bloques de disco o memoria, la ventaja de esto es que,
                        se minimiza la cantidad de operaciones de entrada y salida de disco, esto mejora el rendimiento.
                    </li>
                    <br />
                    <li><b>Balanceo automático:</b> El árbol B+ se mantiene balanceado automáticamente mediante operaciones de división y fusión,
                        esto asegura que el rendimiento de las operaciones sea consistente, independientemente de cómo se modifiquen los datos. </li>
                </ul>
        },
        {
            title: 'Aplicaciones de los Árboles B+',
            content:
                <ul className="list-disc list-inside">
                    <li><b>Sistemas de bases de datos: </b> Los Árboles B y B+ son la estructura más común para implementar índices en bases de datos relacionales,
                        los nodos internos sirven para guiar las búsquedas de registros en grandes bases de datos, búsqueda rápida de registros mediante índices.
                    </li>
                    <br />

                    <br />
                    <li><b>Gestión de índices en big data: </b> En sistemas de procesamiento de datos masivos, como Apache Spark o Elasticsearch, los Árboles B y B+ ayudan a
                        crear índices eficientes para datos almacenados en sistemas de almacenamiento distribuido,
                        mejorar la velocidad de consulta en conjuntos de datos masivos.
                    </li>
                    <br />
                    <li><b> Redes y telecomunicaciones:</b> Enrutadores y sistemas de telecomunicaciones pueden utilizar Árboles B+ para
                        gestionar tablas de rutas, para almacenar y buscar claves de cifrado o configuraciones de redes grandes.
                    </li>
                </ul>
        }
    ];

    return (
        <TreeSlides slides={slides}></TreeSlides>
    )

}