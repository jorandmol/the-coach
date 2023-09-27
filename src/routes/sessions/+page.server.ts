import { getSessions } from '$lib/server/repository/session';
import { error } from '@sveltejs/kit';

export const load = (async () => {
  let sessions
  try {
    sessions = await getSessions()
  } catch (e) {
    console.error(e)
    throw error(500, 'Something wrong occurred...')
  }

  return { sessions };
})