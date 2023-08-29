import { message, superValidate } from 'sveltekit-superforms/server';
import { editRate, getSessionRatings, type PlayerRating } from '$lib/server/repository/player-rating'
import { getSessionById, type Session } from '$lib/server/repository/session'
import { error, fail } from '@sveltejs/kit'
import { editSchema } from '$lib/schemas/player-rating';

export async function load({ params }) {
  const session: Session | undefined = getSessionById(Number(params.id))
  if (!session) {
    throw error(404, 'Session not found')
  }
  const ratings: PlayerRating[] = getSessionRatings(session.id)

  const form = superValidate(editSchema)

  return { session, ratings, form }
}

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, editSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const newRating: PlayerRating | undefined = editRate(form.data.ratingId, form.data.rate)
    if (!newRating) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  }
};