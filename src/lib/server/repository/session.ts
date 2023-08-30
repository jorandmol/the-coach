import { eq, sql } from "drizzle-orm"
import { db } from "../db"
import { sessions, type NewSession } from "../models/session"

export async function getSessions() {
  const res = await db.query.sessions.findMany({
    with: {
      team: {
        columns: {
          name: true
        }
      }
    }
  })
  return res
}

export async function getSessionById(id: number) {
  const res = await db.query.sessions.findFirst({
    where: eq(sessions.id, id),
    with: {
      team: {
        columns: {
          name: true
        }
      }
    }
  })
  return res
}

export async function addSession(teamId: number) {
  const numTeamSessions = await db.select({ count: sql<number>`count(*)` }).from(sessions).where(eq(sessions.teamId, teamId));
  const session: NewSession = {
    teamId: teamId,
    order: numTeamSessions[0].count + 1
  }

  const res = await db.insert(sessions).values(session).returning()
  return res
}