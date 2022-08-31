export interface IKnexUser {
  id?: string
  username: string
  email: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User implements IKnexUser {
  id?: string
  username: string
  email: string
  createdAt?: Date
  updatedAt?: Date

  constructor(user: IKnexUser) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

  static fromQuery(knexResponse: IKnexUser): User;
  static fromQuery(knexResponse: IKnexUser[]): User[];
  static fromQuery(knexResponse: any): any {
    if (Array.isArray(knexResponse)) {
      return knexResponse.map(user => new User(user))
    }

    return new User(knexResponse)
  }
}