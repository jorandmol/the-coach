import { relations } from "drizzle-orm";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { players } from "./player";
import { sessions } from "./session";

export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  playerId: integer('playerId').notNull(),
  sessionId: integer('sessionId').notNull(),
  rate: integer('rate'),
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
  player: one(players, {
    fields: [ratings.playerId],
    references: [players.id],
  }),
  session: one(sessions, {
    fields: [ratings.sessionId],
    references: [sessions.id],
  })
}));

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;