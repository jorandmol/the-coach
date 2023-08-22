import { error, fail, redirect } from '@sveltejs/kit'

import { editSchema as teamEditSchema, deleteSchema as teamDeleteSchema } from '$lib/schemas/team';
import { insertSchema as sessionInsertSchema } from '$lib/schemas/session';
import { playerSchema } from '$lib/schemas/player';
import { message, superValidate } from 'sveltekit-superforms/server';

import { editTeam, getTeamBySlug, removeTeam, type Team } from '$lib/server/repository/team'
import { addPlayer, deletePlayer, getTeamPlayers, type Player } from '$lib/server/repository/player';
import { addSession, type Session } from '$lib/server/repository/session';
import { addRatings, type PlayerRating } from '$lib/server/repository/player-rating';

export async function load({ params }) {
  const team: Team | undefined = getTeamBySlug(params.slug)
  if (!team) {
    throw error(404, 'Team not found')
  }

  const players: Player[] = getTeamPlayers(team.id)

  const teamForm = await superValidate(team, teamEditSchema)
  const playerForm = await superValidate(playerSchema)
  const sessionForm = await superValidate({
    teamId: team.id,
    teamName: team.name,
    players: players
  }, sessionInsertSchema)

  return { team, players, teamForm, playerForm, sessionForm }
}

export const actions = {
  editTeam: async ({ request }) => {
    const form = await superValidate(request, teamEditSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const newTeam: Team | undefined = editTeam(form.data.id, form.data.name, form.data.description)
    if (!newTeam) {
      message(form, 'Something wrong happened...', { status: 500 })
    }

    return { form }
  },
  deleteTeam: async ({ request }) => {
    const form = await superValidate(request, teamDeleteSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const isDeleted = removeTeam(form.data.id)
    if (isDeleted) {
      throw redirect(303, '/teams')
    } else {
      message(form, 'Could not delete the team', { status: 500 })
    }

    return { form }
  },
  addPlayer: async ({ request }) => {
    const form = await superValidate(request, playerSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const newPlayer = addPlayer(form.data.teamId, form.data.name, form.data.number)
    if (!newPlayer) {
      message(form, 'Could not add new player', { status: 500 })
    }

    return { form }
  },
  deletePlayer: async ({ request }) => {
    const form = await superValidate(request, playerSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const isDeleted = deletePlayer(form.data.id ? form.data.id : 0)
    if (!isDeleted) {
      message(form, 'Could not delete new player', { status: 500 })
    }

    return { form }
  },
  createSession: async ({ request }) => {
    const form = await superValidate(request, sessionInsertSchema)
    if (!form.valid) {
      return fail(400, { form })
    }

    const team: Team = { id: form.data.teamId, name: form.data.teamName, slug: '', description: '' }
    const newSession: Session = addSession(team)
    const newPlayerRatings: PlayerRating[] = addRatings(newSession.id, form.data.players)
    if (!newSession || !newPlayerRatings) {
      message(form, 'Could not create new session', { status: 500 })
    } else {
      throw redirect(301, `/sessions/${newSession.id}`)
    }

    return { form }
  }
}