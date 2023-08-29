import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { teams } from "./team";
import { ratings } from "./player-rating";

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  order: integer('order').notNull(),
  teamId: integer('teamId').notNull(),
  date: timestamp('date', { precision: 6, withTimezone: false }).defaultNow()
});

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  team: one(teams, {
    fields: [sessions.teamId],
    references: [teams.id],
  }),
  ratings: many(ratings)
}));

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;