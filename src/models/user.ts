import bcrypt from 'bcrypt'
import { Model } from 'objection'

export class User extends Model {
  static tableName = 'users'
  static idColumn = 'id'

  id!: string
  username!: string
  email!: string
  createdAt!: string
  updatedAt!: string
  password!: string

  authenticate(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }
}