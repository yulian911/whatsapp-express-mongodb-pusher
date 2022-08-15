import Router from 'express'
import MessagesController from'../controllers/messagesController.js'

const router =new Router()

router.post('/news',MessagesController.createMessage)
router.get('/sync',MessagesController.getMessage)


export default router
