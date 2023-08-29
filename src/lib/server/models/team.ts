import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { players } from "./player";

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).unique().notNull(),
  description: varchar('description', { length: 255 })
});

export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players)
}));

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;