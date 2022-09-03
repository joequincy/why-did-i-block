import { } from "knex"
import { Client } from "../db/client"

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

  public static get client() {
    return Client.client<IKnexUser>('users')
  }

  static fromQuery(knexResponse: IKnexUser): User
  static fromQuery(knexResponse: IKnexUser[]): User[];
  static fromQuery(knexResponse: any): any {
    if (Array.isArray(knexResponse)) {
      return knexResponse.map(user => new User(user))
    }

    return new User(knexResponse)
  }

  static async register(params: Pick<Required<IKnexUser>, 'username' | 'password' | 'email'>): Promise<User> {
    const [registrationResult] = await this.client.insert(params).returning('*')

    return new User(registrationResult)
  }

  static async getById(id: string): Promise<User | void> {
    const rawResult = await User.getOneRaw({ id })

    if (rawResult) return new User(rawResult)
  }

  static async getByUsername(username: string): Promise<User | void> {
    const rawResult = await User.getOneRaw({ username })

    if (rawResult) return new User(rawResult)
  }

  static async getOneRaw(params: Partial<IKnexUser>): Promise<IKnexUser | void> {
    return this.client.where(params).first()
  }

  static async getAll(): Promise<User[]>
  static async getAll(limit: number, cursor: number): Promise<User[]>
  static async getAll(limit?: number, cursor?: number): Promise<User[]> {
    const rawUsers = (limit && cursor) ?
      await User.getAllRaw(limit, cursor) : await User.getAllRaw()
    return rawUsers.map(user => new User(user))
  }

  static async getAllRaw(): Promise<IKnexUser[]>
  static async getAllRaw(limit: number, cursor: number): Promise<IKnexUser[]>
  static async getAllRaw(limit?: number, cursor?: number): Promise<IKnexUser[]> {
    if (limit && cursor) {
      return this.client.limit(limit).offset(cursor)
    }
    return this.client
  }
}