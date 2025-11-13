import { marked } from 'marked'

marked.setOptions({
  breaks: true, // Zeilenumbrüche in <br> umwandeln
})

export const formatRichText = (text: string | null) => {
  if (!text) return ''
  return marked.parse(text)
}

export const dateFormat = (dateString: string | null, format: string = 'dd.MM.yyyy'): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  
  // Prüfen, ob das Datum ungültig ist
  if (isNaN(date.getTime())) {
    console.warn(`Ungültiges Datum: ${dateString}`)
    return ''
  }
  
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  
  // Verschiedene Formatierungsoptionen
  switch (format) {
    case 'dd.MM.yyyy':
      return `${day}.${month}.${year}`
    case 'dd.MM.yy':
      return `${day}.${month}.${year.toString().slice(-2)}`
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`
    default:
      // Fallback auf das Standardformat
      return `${day}.${month}.${year}`
  }
}

// Spezielle Funktion für deinen spezifischen Use Case
export const formatToGermanDate = (dateString: string | null): string => {
  return dateFormat(dateString, 'dd.MM.yyyy')
}