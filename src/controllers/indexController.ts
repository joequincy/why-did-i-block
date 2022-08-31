import type { Request, Response } from 'express'

export const indexView = (req: Request, res: Response) => {
  res.render('index', {})
}