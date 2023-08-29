import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { teams } from "./team";

export const players = pgTable('players', {
  id: serial('id').primaryKey(),
  number: integer('number').notNull(),
  teamId: integer('teamId').notNull(),
  name: varchar('name', { length: 50 }).notNull(),
});

export const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;