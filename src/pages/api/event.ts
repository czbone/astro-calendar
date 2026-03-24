import type { APIRoute } from 'astro'
import { INITIAL_EVENTS } from '../../data/event'

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify(INITIAL_EVENTS), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
