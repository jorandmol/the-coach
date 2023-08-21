export type Player = {
  id: number,
  teamId: number,
  number: number,
  name: string
}

let players: Player[] = [
  {
    id: Date.now(),
    teamId: 1,
    number: 69,
    name: 'Manolito'
  }
]

export function getTeamPlayers(teamId: number): Player[] {
  return players.filter(player => player.teamId === teamId)
}

export function addPlayer(teamId: number, name: string, number: number): Player {
  const newPlayer: Player = {
    id: Date.now(),
    teamId,
    name,
    number
  }

  players.push(newPlayer)

  return newPlayer
}

export function deletePlayer(id: number): boolean {
  let prevNumPlayers = players.length

  players = players.filter(player => player.id !== id)

  return prevNumPlayers === players.length + 1
}