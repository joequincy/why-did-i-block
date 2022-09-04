import bcrypt from 'bcrypt'
import { Model } from 'objection'
import { Block } from './block'

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

  static relationMappings = {
    owner: {
      relation: Model.HasManyRelation,
      modelClass: Block,
      join: {
        from: 'users.id',
        to: 'blocks.userId',
      }
    }
  }
}