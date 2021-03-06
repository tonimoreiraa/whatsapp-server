import qrcode from 'qrcode-terminal';
import Logger from '@ioc:Adonis/Core/Logger'
import WebhookClient from 'App/Models/WebhookClient';
import axios from 'axios';

class Wpp
{
    public booted = false
    public client: any

    public boot() {
        if (this.booted) return

        const { Client } = require('whatsapp-web.js')

        const client = new Client()

        client.on('qr', (qr) => {
            Logger.info('Escaneie o código a seguir.')
            qrcode.generate(qr, {small: true})
        })

        client.on('ready', () => {
            Logger.info('Conectado com sucesso!')
            this.booted = true
            this.client = client
        })

        client.on('message', async (message) => {
            if (message.isStatus) return
            const clients = await WebhookClient.all()
            return Promise.all(clients.map(client => axios.post(client.url, message)))
        })

        client.initialize()
    }
}

export default new Wpp()