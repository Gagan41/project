export async function postData(url: string, data: any) {
  const res = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'API Error')
  return json
}