interface APIRecordBase {
  hertz: number
  link: string
  id?: any
}

export interface APILevelRecord extends APIRecordBase {
  player: string
}

export interface APIPlayerRecord extends APIRecordBase {
  level: string
}

export interface APIManyLevel {
  name: string
  creator: string
  position: number
  points: number
  id?: any
  urlHash?: string
}

export interface APIOneLevel extends APIManyLevel {
  records: APILevelRecord[]
}

export interface APIManyPlayer {
  name: string
  points: {
    lrr: number
    hrr: number
    comb: number
  }
}

export interface APIOnePlayer extends APIManyPlayer {
  hertz: {
    [rr: number]: number
  }
  mclass: {
    lrr: string
    hrr: string
    comb: string
  }
  records: APIPlayerRecord[],
  hrr_records: APIPlayerRecord[],
  avatar?: string
}

interface RecordSubmission {
  player: string
  level: string
  hertz: number
  link: string
  raw: string
}

export const getLevels = async (): Promise<APIManyLevel[]> => {
  return fetch(`/levels`).then((data) => data.json())
}

export const getLevel = async (name: string): Promise<APIOneLevel> => {
  return fetch(`/levels/${name}`).then((data) => data.json())
}

export const getHRRLevels = async (): Promise<APIManyLevel[]> => {
  return fetch(`/levels/hrr`).then((data) => data.json())
}

export const getHRRLevel = async (name: string): Promise<APIOneLevel> => {
  return fetch(`/levels/hrr/${name}`).then((data) => data.json())
}

export const getPlayers = async (): Promise<APIManyPlayer[]> => {
  return fetch(`/players`).then((data) => data.json())
}

export const getPlayer = async (name: string): Promise<APIOnePlayer> => {
  return fetch(`/players/${name}`).then((data) => data.json())
}

export const submitRecord = async (record: RecordSubmission): Promise<Response> => {
  return fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  })
}
