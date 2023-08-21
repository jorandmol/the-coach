import type { Player } from "./player"
import type { Team } from "./team"

export type PlayerRating = {
  player: {
    id: number,
    name: string,
    number: number
  },
  rate: number | null
}

export type Session = {
  id: number,
  order: number,
  team: {
    id: number,
    name: string
  }
  date: Date,
  ratings: PlayerRating[]
}

let sessions: Session[] = [
  {
    id: 1,
    order: 1,
    team: {
      id: 1,
      name: 'C.D Alcalá'
    },
    date: new Date(),
    ratings: [
      {
        player: {
          id: Date.now(),
          number: 69,
          name: 'Manolito'
        },
        rate: null
      }
    ]
  }
]

export function getSessions(): Session[] {
  return sessions
}

export function getSessionById(id: number): Session | undefined {
  return sessions.find(session => session.id === id)
}

export function addSession(team: Team, players: Player[]): Session {
  const numSessionOfTeam = sessions.filter(session => session.team.id === team.id).length
  const ratings: PlayerRating[] = players.map(p => {
    return {
      player: {
        id: p.id,
        name: p.name,
        number: p.number
      },
      rate: null
    }
  })

  const newSession: Session = {
    id: Date.now(),
    order: numSessionOfTeam + 1,
    team: {
      id: team.id,
      name: team.name
    },
    date: new Date(),
    ratings
  }

  sessions.push(newSession)

  return newSession
}