import { inspect } from 'util'

export const pp = (v: unknown) => console.log(inspect(v, false, null, true))