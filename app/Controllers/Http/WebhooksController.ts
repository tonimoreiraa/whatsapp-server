// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WebhookClient from "App/Models/WebhookClient";

export default class WebhooksController {

    async index() {
        const clients = await WebhookClient.all()
        return clients.map(client => client.serialize())
    }
    
    async store({request}) {
        const data = request.only(['url'])
        const client = await WebhookClient.create(data)
        
        return client.serialize()
    }

    async delete({request}) {
        const id = request.param('id')
        const client = await WebhookClient.findOrFail(id)
        await client.delete()
    }

}
