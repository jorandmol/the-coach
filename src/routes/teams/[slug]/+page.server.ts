import { error, fail, redirect } from '@sveltejs/kit'

import { editSchema as teamEditSchema, deleteSchema as teamDeleteSchema } from '$lib/schemas/team';
import { insertSchema as sessionInsertSchema } from '$lib/schemas/session';
import { playerSchema } from '$lib/schemas/player';
import { message, superValidate } from 'sveltekit-superforms/server';

import { editTeam, getTeamBySlug, removeTeam } from '$lib/server/repository/team'
import { addPlayer, deletePlayer } from '$lib/server/repository/player';
import { addSession } from '$lib/server/repository/session';
import { addRatings } from '$lib/server/repository/player-rating';
import type { Session } from '$lib/server/models/session.js';
import type { Rating } from '$lib/server/models/player-rating.js';
import type { Team } from '$lib/server/models/team.js';

export async function load({ params }) {
  let team;
  try {
    team = await getTeamBySlug(params.slug)
    if (!team) {
      throw error(404, 'Team not found')
    }
  } catch (e) {
    console.error(e)
    throw error(500, 'Something wrong occurred...')
  }

  const teamForm = await superValidate({
    id: team?.id,
    name: team?.name,
    description: team?.description
  }, teamEditSchema)
  const playerForm = await superValidate(playerSchema)
  const sessionForm = await superValidate({
    teamId: team?.id,
    teamName: team?.name,
    players: team?.players
  }, sessionInsertSchema)

  return { team, players: team?.players, teamForm, playerForm, sessionForm }
}

export const actions = {
  editTeam: async ({ request }) => {
    const form = await superValidate(request, teamEditSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    let editedTeam;
    try {
      editedTeam = await editTeam(form.data.id, form.data.name, form.data.description)
      if (!editedTeam) {
        message(form, 'The team does not exist', { status: 500 })
      }
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  },
  deleteTeam: async ({ request }) => {
    const form = await superValidate(request, teamDeleteSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    let deletedTeam;
    let success = false;
    try {
      deletedTeam = await removeTeam(form.data.id)
      if (deletedTeam && deletedTeam.length > 0) {
        success = true
      } else {
        message(form, 'Could not delete the team', { status: 400 })
      }
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    if (success) {
      throw redirect(303, '/teams')
    }

    return { form }
  },
  addPlayer: async ({ request }) => {
    const form = await superValidate(request, playerSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const newPlayer = addPlayer(form.data.teamId, form.data.name, form.data.number)
      if (!newPlayer) {
        message(form, 'Could not add new player', { status: 500 })
      }
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  },
  deletePlayer: async ({ request }) => {
    const form = await superValidate(request, playerSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const isDeleted = deletePlayer(form.data.id ? form.data.id : 0)
      if (!isDeleted) {
        message(form, 'Could not delete new player', { status: 500 })
      }
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  },
  createSession: async ({ request }) => {
    const form = await superValidate(request, sessionInsertSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    let players = form.data.players.map(player => {
      return { ...player, teamId: form.data.teamId }
    })

    let newSession: Session | undefined;
    try {
      newSession = await addSession(form.data.teamId)

      let newPlayerRatings: Rating[] = []
      if (newSession) {
        newPlayerRatings = await addRatings(newSession.id, players)
      }

      if (!newSession || !newPlayerRatings) {
        message(form, 'Could not create new session', { status: 500 })
      }
    } catch (e) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    if (newSession) {
      throw redirect(301, `/sessions/${newSession.id}`)
    }

    return { form }
  }
}