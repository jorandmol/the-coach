CREATE TABLE IF NOT EXISTS "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"playerId" integer NOT NULL,
	"sessionId" integer NOT NULL,
	"rate" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"teamId" integer NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"teamId" integer NOT NULL,
	"date" timestamp (6) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"description" varchar(255),
	CONSTRAINT "teams_slug_unique" UNIQUE("slug")
);
