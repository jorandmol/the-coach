import type { Player } from "./player"
import type { Team } from "./team"

export type Session = {
  id: number,
  order: number,
  team: {
    id: number,
    name: string
  }
  date: Date
}

let sessions: Session[] = [
  {
    id: 1,
    order: 1,
    team: {
      id: 1,
      name: 'C.D Alcalá'
    },
    date: new Date()
  }
]

export function getSessions(): Session[] {
  return sessions
}

export function getSessionById(id: number): Session | undefined {
  return sessions.find(session => session.id === id)
}

export function addSession(team: Team): Session {
  const numSessionOfTeam = sessions.filter(session => session.team.id === team.id).length

  const newSession: Session = {
    id: Date.now(),
    order: numSessionOfTeam + 1,
    team: {
      id: team.id,
      name: team.name
    },
    date: new Date()
  }

  sessions.push(newSession)

  return newSession
}