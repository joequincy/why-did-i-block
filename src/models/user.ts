import { Model } from 'objection'
import { Block } from './block'
import op from 'objection-password'

const Password = op({
  allowEmptyPassword: false,
  rounds: 15,
})

export class User extends Password(Model) {
  static tableName = 'users'
  static idColumn = 'id'

  id!: string
  username!: string
  email!: string
  createdAt!: string
  updatedAt!: string
  password!: string

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