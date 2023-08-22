import { getSessionRatings, type PlayerRating } from '$lib/server/repository/player-rating'
import { getSessionById, type Session } from '$lib/server/repository/session'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const session: Session | undefined = getSessionById(Number(params.id))
  if (!session) {
    throw error(404, 'Session not found')
  }

  const ratings: PlayerRating[] = getSessionRatings(session.id)

  return { session, ratings }
}