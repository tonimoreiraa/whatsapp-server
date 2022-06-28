// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wpp from 'App/Services/Wpp'

export default class MessagesController {

    async store({request}) {
        const {to, content} = request.only(['to', 'content'])
        return await Wpp.client.sendMessage(to, content)
    }

}
