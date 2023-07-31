import qrcode from 'qrcode-terminal';
import Logger from '@ioc:Adonis/Core/Logger'
import WebhookClient from 'App/Models/WebhookClient';
import axios from 'axios';
import Ws from './Ws';

class Wpp
{
    public booted = false
    public client: any

    async restart()
    {
        this.client
    }

    public boot() {
        if (this.booted) return

        const { Client } = require('whatsapp-web.js')

        const client = new Client()

        client.on('qr', (qr) => {
            Logger.info('Escaneie o código a seguir.')
            qrcode.generate(qr, {small: true})
            Ws.io.emit('code', { code: qr })
        })

        client.on('ready', () => {
            Logger.info('Conectado com sucesso!')
            this.booted = true
            this.client = client
            Ws.io.emit('ready', true)
        })

        client.on('message', async (message) => {
            if (message.isStatus) return
            console.log(message)
            const clients = await WebhookClient.all()

            for (const client of clients) {
                try {
                    await axios.post(client.url, { message })
                } catch (e) {
                    Logger.error('Falha ao enviar webhook para o cliente: ' + client.url + '. Erro: ', e)
                } finally {
                    Logger.info('Webhook enviado para ' + client.url)
                }
            }
        })

        client.initialize()
    }
}

export default new Wpp()