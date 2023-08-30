import { eq } from "drizzle-orm"
import { db } from "../db"
import { players, type NewPlayer } from "../models/player"

export async function addPlayer(teamId: number, name: string, number: number) {
  const newPlayer: NewPlayer = {
    teamId: teamId,
    name: name,
    number: number
  }

  const res = db.insert(players).values(newPlayer).returning()
  return res
}

export async function deletePlayer(id: number) {
  const res = await db.delete(players).where(eq(players.id, id))
  return res
}