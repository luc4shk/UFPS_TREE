export function validarElemento(cadena, elemento) {
  console.log(cadena, elemento)
  if (!cadena) return false
  if (cadena == '') return false

  const cadenaStr = String(cadena)

  // Convertir el elemento a string para comparación uniforme
  const elementoStr = String(elemento)

  // Si la cadena es un número único, verificamos directamente
  if (cadenaStr.trim() === elementoStr) {
    return true
  }

  // Expresión regular para validar si el elemento está en el formato "x | y | z"
  const regex = new RegExp(`(^|\\|\\s*)${elementoStr}(\\s*\\||$)`)

  return regex.test(cadenaStr.trim())
}
