const ALLOWED_TAMANHOS = ['autonomo', '2-10', '10-50', '50+']

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { nome, email, telefone, empresa, tamanho } = req.body ?? {}

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim())
  const telOk   = String(telefone ?? '').replace(/\D/g, '').length >= 10

  if (
    !String(nome    ?? '').trim() ||
    !String(empresa ?? '').trim() ||
    !emailOk ||
    !telOk   ||
    !ALLOWED_TAMANHOS.includes(tamanho)
  ) {
    return res.status(400).json({ error: 'Dados inválidos' })
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
          Nome:     { title:        [{ text: { content: String(nome).trim().slice(0, 200) } }] },
          Email:    { email:        String(email).trim().toLowerCase().slice(0, 200) },
          Telefone: { phone_number: String(telefone).trim().slice(0, 50) },
          Empresa:  { rich_text:    [{ text: { content: String(empresa).trim().slice(0, 200) } }] },
          Tamanho:  { select:       { name: tamanho } },
        },
      }),
    })

    if (!response.ok) return res.status(500).json({ error: 'Erro interno' })

    return res.status(200).json({ ok: true })
  } catch (_) {
    return res.status(500).json({ error: 'Erro interno' })
  }
}
