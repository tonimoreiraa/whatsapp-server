import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Code from 'App/Models/Code'
import Wpp from 'App/Services/Wpp'

export default class WhatsAppsController {

    async getQrCode()
    {
        const code = await Code.firstOrFail()
        return code
    }

}
