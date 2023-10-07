import { message, superValidate } from 'sveltekit-superforms/server';
import { editRate, getSessionRatings } from '$lib/server/repository/player-rating'
import { getSessionById } from '$lib/server/repository/session'
import { error, fail } from '@sveltejs/kit'
import { editSchema } from '$lib/schemas/player-rating';
import type { Session } from '$lib/server/models/session.js';
import type { Rating } from '$lib/server/models/player-rating.js';

export async function load({ params }) {
  let session: Session | undefined;
  let ratings: Rating[] | undefined;
  try {
    session = await getSessionById(Number(params.id))
    if (session) {
      ratings = await getSessionRatings(session.id)
    }
  } catch (e) {
    console.error(e)
    throw error(500, 'Something wrong occurred...')
  }

  if (!session) {
    throw error(404, 'Session not found')
  }

  const form = superValidate(editSchema)

  return { session, ratings, form }
}

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, editSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const newRating: Rating | undefined = await editRate(form.data.ratingId, form.data.rate)
    if (!newRating) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  }
};