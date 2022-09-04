import { Model } from 'objection'
import { User } from './user'

export class Block extends Model {
  static tableName = 'blocks'
  static idColumn = 'id'

  id!: string
  userId!: string
  name!: string
  reasons!: string
  createdAt!: string
  updatedAt!: string

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'blocks.userId',
        to: 'users.id',
      }
    }
  }
}