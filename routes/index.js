import Router from 'express'
// const Router = require('express')
const router =new Router()
import messagesRouter from './messagesRouter.js'

router.use('/messages',messagesRouter)

// module.exports =router
export default router
