import { type Session, getSessions } from '$lib/server/repository/session';

export const load = (async () => {
  const sessions: Session[] = getSessions()

  return { sessions };
})