import { error, fail } from '@sveltejs/kit'

import { insertSchema } from '$lib/schemas/team';
import { message, superValidate } from 'sveltekit-superforms/server';

import { addTeam, getTeams } from '$lib/server/repository/team'

export async function load() {
  const form = await superValidate(insertSchema)
  let teams = []

  try {
    teams = await getTeams()
  } catch (e) {
    console.error(e)
    throw error(500, 'Something wrong occurred...')
  }

  return { teams, form }
}

export const actions = {
  addTeam: async ({ request }) => {
    const form = await superValidate(request, insertSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      await addTeam(form.data.name)
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  }
}
