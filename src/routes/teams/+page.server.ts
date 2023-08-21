import { fail } from '@sveltejs/kit'

import { insertSchema } from '$lib/schemas/team';
import { message, superValidate } from 'sveltekit-superforms/server';

import { addTeam, getTeams, type Team } from '$lib/server/repository/team'

export async function load() {
  const teams = getTeams()

  const form = await superValidate(insertSchema)

  return { teams, form }
}

export const actions = {
  addTeam: async ({ request }) => {
    const form = await superValidate(request, insertSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const newTeam: Team | undefined = addTeam(form.data.name)
    if (!newTeam) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  }
}
