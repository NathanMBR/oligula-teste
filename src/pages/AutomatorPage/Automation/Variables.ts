export type Variables = {
  [variable: string]: {
    ownerId: number
    value: unknown
  }
}

type A = Variables[string]
