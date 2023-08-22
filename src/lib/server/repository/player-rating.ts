import type { Player } from "./player"

export type PlayerRating = {
  sessionId: number,
  player: {
    id: number,
    name: string,
    number: number
  },
  rate: number | null
}

let ratings: PlayerRating[] = [
  {
    sessionId: 1,
    player: {
      id: Date.now(),
      number: 69,
      name: 'Manolito'
    },
    rate: null
  }
]

export function getSessionRatings(sessionId: number): PlayerRating[] {
  return ratings.filter(rating => rating.sessionId === sessionId)
}

export function addRatings(sessionId: number, players: Player[]): PlayerRating[] {
  const playerRatings: PlayerRating[] = players.map(p => {
    return {
      sessionId,
      player: {
        id: p.id,
        name: p.name,
        number: p.number
      },
      rate: null
    }
  })

  ratings.push(...playerRatings)

  return playerRatings
}