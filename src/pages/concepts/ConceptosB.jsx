import { title } from 'framer-motion/client'
import { TreeSlides } from '../../components/TreeSlides'

export const ConceptosB = () => {
  const slides = [
    {
      title: 'Árbol B y B+',
      content: (
        <div className="">
          <b>
            B-árbol es un árbol de búsqueda que puede estar vacío o aquel cuyos
            nodos pueden tener varios hijos, existiendo una relación de orden
            entre ellos.
          </b>
          <br />
          <br />
          <div>
            Los árboles B constituyen una categoría muy importante de
            estructuras de datos, que permiten una implementación eficiente de
            conjuntos y diccionarios, para operaciones de consulta y acceso
            secuencial.{' '}
          </div>
          <br />
          <div>
            Existe una gran variedad de árboles B: los árboles B, B+ y B*; pero
            todas ellas están basadas en la misma idea, la utilización de
            árboles de búsqueda no binarios y con condición de balanceo.
          </div>
        </div>
      ),
    },
    {
      title: 'Características de un árbol B y B+',
      content: (
        <>
          <div className="text-justify">
            Los nodos que conforman el árbol B son denominados páginas, estos
            pueden ser:
          </div>
          <br />
          <ul className="ml-8 list-disc list-inside">
            <li>
              <b>Raíz:</b> El nodo principal del árbol.{' '}
            </li>
            <li>
              <b>Intermedios:</b> Nodos entre la raíz y las hojas.
            </li>
            <li>
              <b>Hojas:</b> Los nodos finales del árbol que no tienen hijos.
            </li>
          </ul>
          <br />
          <div>Cada página contiene:</div>
          <br />
          <ul className="ml-8 list-disc list-inside">
            <li>
              <b>Claves (keys):</b> Son los valores que sirven como puntos de
              búsqueda.
            </li>
            <li>
              <b>Punteros o referencias:</b> Apuntan a otras páginas (hijos) o a
              datos almacenados si es un nodo hoja.
            </li>
          </ul>
          <br />
          <div>
            El término "página" proviene de su uso en almacenamiento secundario
            (como discos duros o SSD), donde los datos se manejan en bloques de
            tamaño fijo llamados páginas. En un árbol B, estas páginas coinciden
            con las estructuras de datos cargadas en memoria para realizar
            búsquedas y modificaciones.
          </div>
        </>
      ),
    },
    {
      title: 'Propiedades de un Árbol B y B+',
      content: (
        <ul className="list-disc list-inside">
          <li>
            Cada página contiene como máximo <b>2n</b> claves.
          </li>
          <br />
          <li>
            Cada página contiene como mínimo <b>n</b> claves, excepto la raíz
            que puede tener sólo una.
          </li>
          <br />
          <li>
            Cada página o es una página hoja o tiene <b>m+1</b> descendientes
            (enlaces a sus hijos), siendo <b>m</b> el número de claves en ésta.
          </li>
          <br />
          <li>Todas las páginas hoja están al mismo nivel.</li>
          <br />
          <li>
            Las claves dentro de una página están ordenadas de menor a mayor.
          </li>
        </ul>
      ),
    },
    {
      title: 'Operaciones del Árbol B y B+',
      content: (
        <>
          <b>Busqueda</b>
          <div className="text-justify">
            Localizar una clave en un B-árbol es una operación simple pues
            consiste en situarse en el nodo raíz del árbol, si la clave se
            encuentra ahí hemos terminado y si no es así seleccionamos de entre
            los hijos el que se encuentra entre dos valores de clave que son
            menor y mayor que la buscada respectivamente y repetimos el proceso
            hasta que la encontremos. En caso de que se llegue a una hoja y no
            podamos proseguir la búsqueda la clave no se encuentra en el árbol.
          </div>
          <br />
          <b>Insertar</b>
          <ol className="text-justify">
            <li>
              <b>1. </b>
              Realizando una búsqueda en el árbol, se halla el nodo hoja en el
              cual debería ubicarse el nuevo elemento.
            </li>
            <li>
              <b>2. </b>
              Si el nodo hoja tiene menos elementos que el máximo número de
              elementos legales, entonces hay lugar para uno más. Inserte el
              nuevo elemento en el nodo, respetando el orden de los elementos.
            </li>
            <br />
            <li>
              De otra forma, el nodo debe ser dividido en dos nodos. La división
              se realiza de la siguiente manera:
            </li>
            <ol className="ml-7 list-inside">
              <br />
              <li>
                <b>a. </b> Se escoge el valor medio entre los elementos del nodo
                y el nuevo elemento.
              </li>
              <b>b. </b>Los valores menores que el valor medio se colocan en el
              nuevo nodo izquierdo, y los valores mayores que el valor medio se
              colocan en el nuevo nodo derecho; el valor medio actúa como valor
              separador.
              <li>
                <b>c. </b> El valor separador se debe colocar en el nodo padre,
                lo que puede provocar que el padre sea dividido en dos, y así
                sucesivamente.
              </li>
            </ol>
          </ol>
          <br />
          <b>Eliminar</b>
          <div className="text-justify">
            La idea para realizar el borrado de una clave es similar a la
            inserción teniendo en cuenta que ahora, en lugar de divisiones,
            realizamos uniones. Existe un problema añadido, las claves a borrar
            pueden aparecer en cualquier lugar del árbol y por consiguiente no
            coincide con el caso de la inserción en la que siempre comenzamos
            desde una hoja y propagamos hacia arriba. La solución a esto es
            inmediata pues cuando borramos una clave que está en un nodo
            interior, lo primero que realizamos es un intercambio de este valor
            con el inmediato sucesor en el árbol, es decir, el hijo más a la
            izquierda del hijo derecho de esa clave.
          </div>
        </>
      ),
    },

    {
      title: 'Recorridos del Árbol B y B+',
      content: (
        <>
          <div className="text-justify">
            Existe una gran variedad de árboles B: los árboles B, B+ y B*; pero
            todas ellas están basadas en la misma idea, la utilización de
            árboles de búsqueda no binarios y con condición de balanceo.
          </div>
          <br />
          <b>Inorden:</b>
          <div>
            Visita los nodos del árbol en orden ascendente de sus claves. Para
            un nodo con claves [K1, K2, ..., Kn] y punteros [P1, P2, ..., Pn+1],
            el orden sería:
          </div>
          <br />
          <ol className="ml-7 list-inside">
            <li>
              <b>1. </b>Visitar recursivamente el subárbol apuntado por P1. Leer
              la clave K1.
            </li>
            <li>
              <b>2. </b>Visitar recursivamente el subárbol apuntado por P2. Leer
              la clave K2.
            </li>
            <li>
              <b>3. </b> Repetir el proceso hasta llegar al subárbol Pn+1.
            </li>
          </ol>
          <br />
          <b>Preorden:</b>
          <div>
            Visita primero las claves del nodo actual y luego recorre
            recursivamente los subárboles en orden. Para un nodo con claves [K1,
            K2, ..., Kn] y punteros [P1, P2, ..., Pn+1], el orden sería:
          </div>
          <br />
          <ol className="ml-7 list-inside">
            <li>
              <b>1. </b>Leer todas las claves del nodo actual (K1, K2, ..., Kn).
            </li>
            <li>
              <b>2. </b>Visitar recursivamente el subárbol apuntado por P1.
            </li>
            <li>
              <b>3. </b> Visitar recursivamente el subárbol apuntado por P2.
            </li>
            <li>
              <b>4. </b>Repetir el proceso para todos los punteros.
            </li>
          </ol>
          <br />
          <b>Postorden:</b>
          <div>
            primero visita recursivamente los subárboles y luego procesa las
            claves del nodo actual. Para un nodo con claves [K1, K2, ..., Kn] y
            punteros [P1, P2, ..., Pn+1], el orden sería:
          </div>
          <br />
          <ol className="ml-7 list-inside">
            <li>
              <b>1. </b>Visitar recursivamente el subárbol apuntado por P1.
            </li>
            <li>
              <b>2. </b>Visitar recursivamente el subárbol apuntado por P2.
            </li>
            <li>
              <b>3. </b>Repetir para todos los punteros.
            </li>
            <li>
              <b>4. </b>Leer todas las claves del nodo actual (K1, K2, ..., Kn).
            </li>
          </ol>
        </>
      ),
    },
    {
      title: 'Aplicaciones del Árbol B y B+',
      content: (
        <>
          <b>Sistemas de Bases de Datos</b>
          <div>
            Los árboles B son fundamentales para la implementación de índices en
            bases de datos relacionales como MySQL, PostgreSQL y Oracle. estos
            se eligen porque su estructura balanceada minimiza la cantidad de
            accesos a disco.
          </div>
          <br />
          <b>Sistemas de Archivos</b>
          <div>
            En sistemas de archivos, los árboles B se usan para organizar
            directorios y acceder a archivos. Los sistemas de archivos modernos
            como NTFS (Windows) y ext4 (Linux) utilizan variaciones del árbol B
            (como B+ Trees) para almacenar metadatos de archivos (nombres,
            ubicaciones, permisos).
          </div>
          <br />
          <b>Gestión de Memoria Virtual</b>
          <div>
            Sistemas operativos que manejan memoria virtual pueden usar árboles
            B para organizar las tablas de páginas.
          </div>
          <div>
            Su uso principal es optimizar la búsqueda de marcos de memoria
            asignados a procesos. Reducir el tiempo de búsqueda para encontrar
            direcciones físicas correspondientes a direcciones virtuales.
          </div>
          <br />
          <b>Redes y Sistemas Distribuidos</b>
          <div>
            Enrutadores y sistemas distribuidos utilizan árboles B para
            almacenar y organizar tablas de rutas o configuraciones. EJ: Un
            sistema de red puede usar un árbol B para buscar rutas óptimas entre
            nodos.
          </div>
        </>
      ),
    },
  ]

  return <TreeSlides slides={slides}></TreeSlides>
}

