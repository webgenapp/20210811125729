export type A = {
  id?: number

  a: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type AError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
