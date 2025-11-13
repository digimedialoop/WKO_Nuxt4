export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.brToken
  const tableId = config.brTable

  const res: any = await $fetch(`https://api.baserow.io/api/database/rows/table/${tableId}/`, {
    headers: {
      Authorization: `Token ${token}`
    },
    params: {
      'user_field_names': 'true',      // Feldnamen statt field_12345
      'page_size': 100                  // ggf. mehr als default
    }
  })

  // Nur die Daten extrahieren, die wir wirklich brauchen
  const kurse = res.results.map((row: any) => ({
    id: row.id,
    title: row['Kurstitel'],           // field_6212932
    description: row['Beschreibung'], // field_6212933
    start: row['Kursbeginn'],          // field_6212935
    termCount: row['Terminanzahl'],    // field_6212936
    cost: row['Kosten'],               // field_6212938
    area: row['Bereich']?.value,        // field_6212939
    active: row['Aktiv']
  }))
  .filter((kurs: any) => kurs.active)
  
  return kurse
})
