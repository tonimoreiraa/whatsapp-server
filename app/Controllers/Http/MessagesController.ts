import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wpp from 'App/Services/Wpp'

export default class MessagesController {

    async store({request}: HttpContextContract) {
        const messages = await request.input('messages')
        for (const {to, content} of messages) {
            await Wpp.client.sendMessage(to, content)
        }
    }

}
