import type { Player } from "./player"

export type PlayerRating = {
  id: number,
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
    id: 1,
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
      id: Date.now(),
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

export function editRate(ratingId: number, rate?: number): PlayerRating | undefined {
  let rating: PlayerRating | undefined = ratings.find(r => r.id === ratingId)

  const newRate = rate ?? null
  if (rating) {
    rating = { ...rating, rate: newRate }

    ratings = ratings.filter(r => r.id !== ratingId)
    ratings.push(rating)
  }

  return rating
}