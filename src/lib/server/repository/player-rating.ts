import { eq } from "drizzle-orm"
import { db } from "../db"
import { ratings, type Rating, type NewRating } from "../models/player-rating"
import type { Player } from "../models/player"

export async function getSessionRatings(sessionId: number) {
  const result: Rating[] = await db.query.ratings.findMany({
    where: eq(ratings.sessionId, sessionId),
    with: {
      player: {
        columns: {
          name: true,
          number: true
        }
      }
    }
  })
  return result
}

export async function addRatings(sessionId: number, players: Player[]) {
  const newRatings: NewRating[] = players.map(p => {
    return {
      sessionId,
      playerId: p.id,
      rate: null
    }
  })

  const result = await db.insert(ratings).values(newRatings).returning()
  return result
}

export async function editRate(id: number, rate?: number) {
  const result: Rating[] = await db.update(ratings).set({ rate: rate }).where(eq(ratings.id, id)).returning()
  return result.length > 0 ? result.at(0) : undefined
}