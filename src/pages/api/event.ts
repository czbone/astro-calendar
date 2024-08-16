import type { APIRoute } from 'astro'
import { INITIAL_EVENTS } from '../../data/event.ts'

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify(INITIAL_EVENTS), {
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
