import * as  ratings from './models/player-rating';
import * as sessions from './models/session';
import * as players from './models/player';
import * as teams from './models/team';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { DATABASE_URL } from '$env/static/private';

const client = postgres(DATABASE_URL);
export const db = drizzle(client, {
  schema: {
    ...teams, ...players, ...sessions, ...ratings
  }
});
