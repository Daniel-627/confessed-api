import type { users } from '../../db/src/index.js'

export type User = typeof users.$inferSelect

export type AppVariables = {
  user: User
}