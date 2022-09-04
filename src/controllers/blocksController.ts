import type { RequestHandler } from 'express'
import { Block } from '../models/block'
import { User } from '../models/user'
import { loggable } from './logging'

@loggable
export class BlocksController {
  static [method: string]: RequestHandler<Block>

  public static index: RequestHandler<Block> = async (req, res) => {
    if (!req.session) {
      return res.status(401).redirect('/login')
    }
    const blocks = await Block.query().where({ userId: req.session.userId })

    res.render('blocks/index', { blocks })
  }

  public static view: RequestHandler<Block> = async (req, res) => {
    const block = await Block.query().findById(req.params.id)

    if (block?.userId !== req.session.userId) {
      return res.status(401).render('blocks/view', { error: 'Not authorized' })
    }

    res.render('blocks/view', { block })
  }

  public static create: RequestHandler<Block> = async (req, res) => {
    res.render('blocks/create')
  }

  public static doCreate: RequestHandler<Block> = async (req, res) => {
    const { name, reasons } = req.body
    try {
      const block = await Block.query().insert({ name, reasons, userId: req.session.userId }).returning('*')

      return res.status(201).redirect(`/blocks/${block.id}`)
    } catch (e) {
      console.dir(e)
      const error = e instanceof Error ? e.message : 'Unknown error'
      return res.status(500).render('blocks/create', { block: req.params, error })
    }
  }

  public static update: RequestHandler<Block> = async (req, res) => {
    if (!req.session.userId) return res.status(401).render('blocks/view', { error: 'Not Authorized' })
    const { name, reasons } = req.params
    try {
      const block = await User.relatedQuery('blocks').for(req.session.userId).patchAndFetchById(req.params.id, { name, reasons }) as Block

      return res.status(201).redirect(`/blocks/${block.id}`)
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error'
      return res.status(500).render('blocks/create', { block: req.params, error })
    }
  }
}

export default BlocksController
