import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://holidays-jp.github.io/api/v1/date.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
