import { slugify } from "$lib/utils/formater"
import { eq } from "drizzle-orm"
import { db } from "../db"
import { teams, type NewTeam } from "../models/team"

export async function getTeams() {
  const res = await db.query.teams.findMany()
  return res
}

export async function getTeamBySlug(slug: string) {
  const res = await db.query.teams.findFirst({
    where: eq(teams.slug, slug),
    with: {
      players: {
        columns: {
          teamId: false
        }
      }
    }
  })
  return res
}

export async function addTeam(name: string, description: string = '') {
  const team: NewTeam = {
    name,
    slug: slugify(name),
    description
  }

  const res = await db.insert(teams).values(team).returning()
  return res.length > 0 ? res.at(0) : undefined
}

export async function editTeam(id: number, name: string, description: string | null) {
  const res = await db.update(teams).set({ name: name, slug: slugify(name), description: description }).where(eq(teams.id, id)).returning()
  return res.length > 0 ? res.at(0) : undefined
}

export async function removeTeam(id: number) {
  const res = await db.delete(teams).where(eq(teams.id, id)).returning()
  return res
}