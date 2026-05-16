import type { users } from '../../db/src'

export type User = typeof users.$inferSelect

export type AppVariables = {
  user: User
}