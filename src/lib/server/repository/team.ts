import { slugify } from "$lib/utils/formater"

export type Team = {
  id: number,
  name: string,
  slug: string,
  description: string
}

let teams: Team[] = [
  {
    id: 1,
    name: 'C.D Alcalá',
    slug: 'cd-alcala',
    description: 'Football team of Alcalá'
  }
]

export function getTeams(): Team[] {
  return teams
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find(team => team.slug === slug)
}

export function addTeam(name: string, description: string = ''): Team {
  const team: Team = {
    id: Date.now(),
    name,
    slug: slugify(name),
    description
  }

  teams.push(team)

  return team
}

export function editTeam(id: number, name: string, description?: string): Team | undefined {
  let team: Team | undefined = teams.find(team => team.id === id)

  if (team) {
    team = { ...team, name, slug: slugify(name), description: description ?? '' }

    teams = teams.filter(team => team.id !== id)
    teams.push(team)
  }

  return team
}

export function removeTeam(id: number): boolean {
  let prevNumTeams = teams.length

  teams = teams.filter(team => team.id !== id)

  return prevNumTeams === teams.length + 1
}