import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wpp from 'App/Services/Wpp'
import Logger from '@ioc:Adonis/Core/Logger'

function convert(number: string) {
    if (!number.includes('@c.us')) return number
    if (number.length === 18) {
      return number.slice(0,4) + number.slice(5)
    } else {
      return number.slice(0,4) + 9 + number.slice(4)
    }
}

export default class MessagesController {

    async store({request}: HttpContextContract) {
        const messages = await request.input('messages')
        for (const {to, content} of messages) {
            try {
                await Wpp.client.sendMessage(to, content.replace(/<[^>]+>/g, ''))
                await Wpp.client.sendMessage(convert(to), content.replace(/<[^>]+>/g, ''))
            } catch (e) {
                Logger.error(e)
            }
        }
    }

}
