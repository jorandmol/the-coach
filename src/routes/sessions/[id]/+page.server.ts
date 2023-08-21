import { getSessionById, type Session } from '$lib/server/repository/session'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const session: Session | undefined = getSessionById(Number(params.id))
  if (!session) {
    throw error(404, 'Team not found')
  }

  return { session }
}