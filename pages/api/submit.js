export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { nome, email, telefone, empresa, tamanho } = req.body

  if (!nome || !email || !telefone || !empresa || !tamanho) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' })
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Nome:     { title:       [{ text: { content: nome } }] },
          Email:    { email:       email },
          Telefone: { phone_number: telefone },
          Empresa:  { rich_text:   [{ text: { content: empresa } }] },
          Tamanho:  { select:      { name: tamanho } },
        },
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Notion error:', err)
      return res.status(500).json({ error: 'Erro ao salvar no Notion' })
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
